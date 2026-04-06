import { useEffect, useRef, useCallback } from "react";

const HEX_SIZE = 28;
const HEX_GAP = 2;
const HOVER_RADIUS = 140;
const HEX_COLOR_BASE = "rgba(255,255,255,0.03)";
const HEX_COLOR_HOVER = "rgba(230,57,70,0.35)";
const HEX_STROKE_BASE = "rgba(255,255,255,0.045)";
const HEX_STROKE_HOVER = "rgba(230,57,70,0.55)";

interface HexCell {
  cx: number;
  cy: number;
  scale: number;
  targetScale: number;
  alpha: number;
  targetAlpha: number;
}

function hexPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function HexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<HexCell[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const buildGrid = useCallback(() => {
    const w = sizeRef.current.w;
    const h = sizeRef.current.h;
    const cells: HexCell[] = [];
    const colW = (HEX_SIZE + HEX_GAP) * Math.sqrt(3);
    const rowH = (HEX_SIZE + HEX_GAP) * 1.5;
    const cols = Math.ceil(w / colW) + 2;
    const rows = Math.ceil(h / rowH) + 2;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const offset = row % 2 === 0 ? 0 : colW / 2;
        cells.push({
          cx: col * colW + offset,
          cy: row * rowH,
          scale: 1,
          targetScale: 1,
          alpha: 0,
          targetAlpha: 0,
        });
      }
    }
    cellsRef.current = cells;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      buildGrid();
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    const animate = () => {
      const { w, h } = sizeRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, w, h);

      const cells = cellsRef.current;
      const dampSpeed = 0.12;

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const dx = c.cx - mx;
        const dy = c.cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < HOVER_RADIUS) {
          const proximity = 1 - dist / HOVER_RADIUS;
          c.targetScale = 1 + proximity * 0.45;
          c.targetAlpha = proximity;
        } else {
          c.targetScale = 1;
          c.targetAlpha = 0;
        }

        c.scale = lerp(c.scale, c.targetScale, dampSpeed);
        c.alpha = lerp(c.alpha, c.targetAlpha, dampSpeed);

        const r = HEX_SIZE * c.scale;
        const a = c.alpha;

        // Fill
        if (a > 0.01) {
          hexPath(ctx, c.cx, c.cy, r);
          ctx.fillStyle = `rgba(230,57,70,${(0.03 + a * 0.32).toFixed(3)})`;
          ctx.fill();
        }

        // Stroke
        hexPath(ctx, c.cx, c.cy, r);
        if (a > 0.01) {
          const sr = Math.round(230 - a * 0);
          const sg = Math.round(57 + a * 0);
          const sb = Math.round(70 + a * 0);
          const sa = (0.045 + a * 0.5).toFixed(3);
          ctx.strokeStyle = `rgba(${sr},${sg},${sb},${sa})`;
          ctx.lineWidth = 0.8 + a * 0.6;
        } else {
          ctx.strokeStyle = HEX_STROKE_BASE;
          ctx.lineWidth = 0.8;
        }
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [buildGrid]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ display: "block" }}
      />

      {/* Orb 1 — top-left red */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          left: "-10%",
          top: "5%",
          borderRadius: "50%",
          background: "rgba(230,57,70,0.08)",
          filter: "blur(120px)",
        }}
      />

      {/* Orb 2 — center-right white */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          right: "-5%",
          top: "40%",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          filter: "blur(100px)",
        }}
      />

      {/* Orb 3 — bottom-left red */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          left: "5%",
          bottom: "5%",
          borderRadius: "50%",
          background: "rgba(230,57,70,0.05)",
          filter: "blur(150px)",
        }}
      />
    </div>
  );
}
