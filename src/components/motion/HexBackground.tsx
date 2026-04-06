import { useEffect, useRef, useCallback } from "react";

const HEX_SIZE = 12;
const HEX_GAP = 1;
const HOVER_RADIUS = 180;
const HEX_COLOR_BASE = "rgba(255,255,255,0.025)";
const HEX_COLOR_HOVER = "rgba(194,42,41,0.45)";
const HEX_STROKE_BASE = "rgba(255,255,255,0.06)";
const HEX_STROKE_HOVER = "rgba(194,42,41,0.7)";

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
  const hasRealMouse = useRef(false);
  const phantomRef = useRef({ x: 0, y: 0, angle: 0 });
  const phantom2Ref = useRef({ x: 0, y: 0 });
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

    let mouseTimeout: ReturnType<typeof setTimeout>;
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      hasRealMouse.current = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => { hasRealMouse.current = false; }, 3000);
    };
    const onLeave = () => {
      hasRealMouse.current = false;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    // Initialize phantom at center
    phantomRef.current = {
      x: sizeRef.current.w / 2,
      y: sizeRef.current.h / 2,
      angle: Math.random() * Math.PI * 2,
    };

    const animate = (time: number) => {
      const { w, h } = sizeRef.current;

      // Phantom 1 — Lissajous path
      const p = phantomRef.current;
      const speed = 0.001;
      p.x = w * 0.5 + Math.sin(time * speed) * w * 0.4;
      p.y = h * 0.5 + Math.cos(time * speed * 0.7) * h * 0.4;

      // Phantom 2 — offset Lissajous path
      const p2 = phantom2Ref.current;
      p2.x = w * 0.5 + Math.cos(time * speed * 0.8 + 2.2) * w * 0.38;
      p2.y = h * 0.5 + Math.sin(time * speed * 1.1 + 1.1) * h * 0.35;

      // Build list of active cursors
      const cursors: { x: number; y: number }[] = [p, p2];
      if (hasRealMouse.current) {
        cursors.push(mouseRef.current);
      }

      ctx.fillStyle = "#333333";
      ctx.fillRect(0, 0, w, h);

      const cells = cellsRef.current;
      const dampSpeed = 0.12;

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];

        // Find closest cursor
        let bestProximity = 0;
        for (let j = 0; j < cursors.length; j++) {
          const dx = c.cx - cursors[j].x;
          const dy = c.cy - cursors[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < HOVER_RADIUS) {
            const prox = 1 - dist / HOVER_RADIUS;
            if (prox > bestProximity) bestProximity = prox;
          }
        }

        if (bestProximity > 0) {
          c.targetScale = 1 + bestProximity * 0.45;
          c.targetAlpha = bestProximity;
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
          ctx.fillStyle = `rgba(194,42,41,${(0.03 + a * 0.32).toFixed(3)})`;
          ctx.fill();
        }

        // Stroke
        hexPath(ctx, c.cx, c.cy, r);
        if (a > 0.01) {
          const sr = Math.round(194);
          const sg = Math.round(42);
          const sb = Math.round(41);
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
      clearTimeout(mouseTimeout);
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

      {/* Orb 1 — Hero right */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 420,
          height: 420,
          right: "8%",
          top: "15%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(194,42,41,0.16) 0%, rgba(194,42,41,0.04) 45%, transparent 70%)",
          animation: "floatOrb1 7s ease-in-out infinite",
        }}
      />

      {/* Orb 2 — Services left */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 350,
          height: 350,
          left: "-5%",
          top: "55%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(194,42,41,0.10) 0%, transparent 70%)",
          animation: "floatOrb2 9s ease-in-out infinite",
        }}
      />

      {/* Orb 3 — Footer center */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 280,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(194,42,41,0.08) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
