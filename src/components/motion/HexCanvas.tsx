import { useEffect, useRef, useCallback } from "react";

interface Hex {
  x: number;
  y: number;
  baseColor: string;
  currentColor: string;
  currentOpacity: number;
  currentScale: number;
  targetColor: string;
  targetOpacity: number;
  targetScale: number;
}

const HEX_SIZE_DESKTOP = 24;
const HEX_SIZE_MOBILE = 32;
const GAP = 2;
const LERP_SPEED = 0.06;

function hexPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, scale: number) {
  const s = size * scale;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const px = cx + s * Math.cos(angle);
    const py = cy + s * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const r = Math.round(lerp((pa >> 16) & 255, (pb >> 16) & 255, t));
  const g = Math.round(lerp((pa >> 8) & 255, (pb >> 8) & 255, t));
  const bl = Math.round(lerp(pa & 255, pb & 255, t));
  return `#${((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1)}`;
}

export default function HexCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hexesRef = useRef<Hex[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const touchRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number>(0);
  const isMobileRef = useRef(false);
  const timeRef = useRef(0);

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const isMobile = window.innerWidth < 768;
    isMobileRef.current = isMobile;
    const size = isMobile ? HEX_SIZE_MOBILE : HEX_SIZE_DESKTOP;
    const w = size * Math.sqrt(3) + GAP;
    const h = size * 1.5 + GAP;
    const hexes: Hex[] = [];

    const cols = Math.ceil((window.innerWidth * dpr) / w) + 2;
    const rows = Math.ceil((window.innerHeight * dpr) / h) + 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * w + (row % 2 === 1 ? w / 2 : 0);
        const y = row * h;
        hexes.push({
          x, y,
          baseColor: "#111111",
          currentColor: "#111111",
          currentOpacity: 1,
          currentScale: 1,
          targetColor: "#111111",
          targetOpacity: 1,
          targetScale: 1,
        });
      }
    }
    hexesRef.current = hexes;
  }, []);

  useEffect(() => {
    buildGrid();

    const onResize = () => buildGrid();
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      const dpr = window.devicePixelRatio || 1;
      mouseRef.current = { x: e.clientX * dpr, y: e.clientY * dpr };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onTouchStart = (e: TouchEvent) => {
      const dpr = window.devicePixelRatio || 1;
      const t = e.touches[0];
      touchRef.current = { x: t.clientX * dpr, y: t.clientY * dpr, active: true };
    };
    const onTouchMove = (e: TouchEvent) => {
      const dpr = window.devicePixelRatio || 1;
      const t = e.touches[0];
      touchRef.current = { x: t.clientX * dpr, y: t.clientY * dpr, active: true };
    };
    const onTouchEnd = () => {
      touchRef.current = { ...touchRef.current, active: false };
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = window.devicePixelRatio || 1;

    const animate = () => {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      timeRef.current += 0.016;
      const hexes = hexesRef.current;
      const isMobile = isMobileRef.current;
      const size = isMobile ? HEX_SIZE_MOBILE : HEX_SIZE_DESKTOP;

      // Update targets
      if (!prefersReduced) {
        if (isMobile && !touchRef.current.active) {
          // Wave animation
          const t = timeRef.current;
          const waveX = (Math.sin(t * 0.7) * 0.5 + 0.5) * canvas.width;
          const waveY = ((t * 0.33) % 1) * canvas.height;
          const radius = 80 * dpr;

          for (const hex of hexes) {
            const dx = hex.x - waveX;
            const dy = hex.y - waveY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radius) {
              const intensity = 1 - dist / radius;
              hex.targetColor = intensity > 0.6 ? "#E63946" : intensity > 0.3 ? "#C62828" : "#1A1A1A";
              hex.targetOpacity = intensity > 0.6 ? 0.9 : intensity > 0.3 ? 0.5 : 0.3;
              hex.targetScale = 1 + intensity * 0.1;
            } else {
              hex.targetColor = "#111111";
              hex.targetOpacity = 1;
              hex.targetScale = 1;
            }
          }
        } else {
          // Cursor / touch interaction
          const pointer = touchRef.current.active ? touchRef.current : mouseRef.current;
          const radius = 120 * dpr;

          for (const hex of hexes) {
            const dx = hex.x - pointer.x;
            const dy = hex.y - pointer.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radius) {
              const innerRadius = 60 * dpr;
              if (dist < innerRadius * 0.4) {
                hex.targetColor = "#E63946";
                hex.targetOpacity = 0.9;
                hex.targetScale = 1.1;
              } else if (dist < innerRadius) {
                hex.targetColor = "#C62828";
                hex.targetOpacity = 0.5;
                hex.targetScale = 1.05;
              } else {
                hex.targetColor = "#1A1A1A";
                hex.targetOpacity = 0.3;
                hex.targetScale = 1;
              }
            } else {
              hex.targetColor = "#111111";
              hex.targetOpacity = 1;
              hex.targetScale = 1;
            }
          }
        }
      }

      // Render
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const hex of hexes) {
        hex.currentColor = lerpColor(hex.currentColor, hex.targetColor, LERP_SPEED);
        hex.currentOpacity = lerp(hex.currentOpacity, hex.targetOpacity, LERP_SPEED);
        hex.currentScale = lerp(hex.currentScale, hex.targetScale, LERP_SPEED);

        ctx.globalAlpha = hex.currentOpacity;
        hexPath(ctx, hex.x, hex.y, size * dpr * 0.5, hex.currentScale);
        ctx.fillStyle = hex.currentColor;
        ctx.fill();
        ctx.strokeStyle = "#1A1A1A";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [buildGrid]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
