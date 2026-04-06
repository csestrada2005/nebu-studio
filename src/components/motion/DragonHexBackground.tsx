import { useEffect, useRef, useCallback } from "react";

/* ── helpers ── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function pseudoRand(col: number, row: number) {
  return (Math.sin(col * 12.9898 + row * 78.233) * 43758.5453) % 1;
}

export default function DragonHexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const isMobileRef = useRef(false);
  const sizeRef = useRef({ w: 0, h: 0 });

  /* ── resize ── */
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    sizeRef.current = { w: w * dpr, h: h * dpr };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    isMobileRef.current =
      window.matchMedia("(hover: none)").matches ||
      navigator.maxTouchPoints > 0;

    handleResize();
    window.addEventListener("resize", handleResize);

    const onMove = (e: MouseEvent) => {
      if (isMobileRef.current) return;
      mouseTarget.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    /* ── animation loop ── */
    const animate = () => {
      const { w, h } = sizeRef.current;
      if (w === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      const dpr = window.devicePixelRatio || 1;
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Smooth mouse
      mouseCurrent.current.x = lerp(mouseCurrent.current.x, mouseTarget.current.x, 0.045);
      mouseCurrent.current.y = lerp(mouseCurrent.current.y, mouseTarget.current.y, 0.045);
      const mx = mouseCurrent.current.x;
      const my = mouseCurrent.current.y;

      // Clear
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#060809";
      ctx.fillRect(0, 0, w, h);

      /* ═══ LAYER 1 — DRAGON SCALES ═══ */
      const scaleW = 26 * dpr;
      const scaleH = scaleW * 1.15;
      const sCols = Math.ceil(w / scaleW) + 4;
      const sRows = Math.ceil(h / (scaleH * 0.55)) + 4;
      const l1dx = mx * 9 * dpr;
      const l1dy = my * 6 * dpr;

      ctx.save();
      ctx.translate(l1dx, l1dy);

      for (let row = -2; row < sRows; row++) {
        const offsetX = row % 2 === 0 ? 0 : scaleW * 0.5;
        // Mouse position in canvas coords (accounting for layer translate)
        const mxCanvas = mx * w * 0.5 - l1dx;
        const myCanvas = my * h * 0.5 - l1dy;
        const LIGHT_RADIUS = 180 * dpr;

        for (let col = -2; col < sCols; col++) {
          const cx = col * scaleW + offsetX;
          const cy = row * scaleH * 0.55;

          // distance from cursor to this scale
          const sdx = cx - mxCanvas;
          const sdy = cy - myCanvas;
          const sDist = Math.sqrt(sdx * sdx + sdy * sdy);
          const lightProx = sDist < LIGHT_RADIUS ? 1 - sDist / LIGHT_RADIUS : 0;
          const lightIntensity = lightProx * lightProx; // quadratic falloff

          // brightness variation
          const noise = Math.sin(col * 3.7 + row * 2.3) * 0.5 + 0.5;
          const baseBr = 11 + noise * 4;
          const baseBg = 13 + noise * 3;
          const baseBb = 11 + noise * 3;

          // Add cursor light — warm reddish highlight on scales
          const br = baseBr + lightIntensity * 85; // toward red
          const bg = baseBg + lightIntensity * 25;
          const bb = baseBb + lightIntensity * 20;

          // draw scale shape
          ctx.beginPath();
          ctx.moveTo(cx - scaleW * 0.5, cy);
          ctx.bezierCurveTo(
            cx - scaleW * 0.3, cy - scaleH * 0.35,
            cx + scaleW * 0.3, cy - scaleH * 0.35,
            cx + scaleW * 0.5, cy
          );
          ctx.bezierCurveTo(
            cx + scaleW * 0.35, cy + scaleH * 0.45,
            cx - scaleW * 0.35, cy + scaleH * 0.45,
            cx - scaleW * 0.5, cy
          );
          ctx.closePath();

          ctx.fillStyle = `rgb(${Math.min(br, 255)|0},${Math.min(bg, 255)|0},${Math.min(bb, 255)|0})`;
          ctx.fill();
          ctx.strokeStyle = lightIntensity > 0.1
            ? `rgba(230,57,70,${(lightIntensity * 0.4).toFixed(3)})`
            : "rgba(0,0,0,0.85)";
          ctx.lineWidth = 0.7 * dpr;
          ctx.stroke();

          // sheen highlight ellipse — intensified near cursor
          const sheenAlpha = 0.015 + noise * 0.015 + lightIntensity * 0.12;
          ctx.beginPath();
          ctx.ellipse(
            cx - scaleW * 0.15,
            cy - scaleH * 0.1,
            scaleW * 0.15,
            scaleH * 0.12,
            -0.4, 0, Math.PI * 2
          );
          ctx.fillStyle = `rgba(255,255,255,${sheenAlpha.toFixed(4)})`;
          ctx.fill();
        }
      }
      ctx.restore();

      /* ═══ LAYER 2 — NANO HEX GRID ═══ */
      const hexR = 6.5 * dpr;
      const hexW = hexR * Math.sqrt(3);
      const hexH = hexR * 2;
      const hCols = Math.ceil(w / hexW) + 4;
      const hRows = Math.ceil(h / (hexH * 0.75)) + 4;
      const l2dx = mx * 22 * dpr;
      const l2dy = my * 14 * dpr;
      const centerX = w * 0.5;
      const centerY = h * 0.5;

      // Breath
      const breathValue = Math.sin(t * 0.38) * 0.5 + 0.5;

      ctx.save();
      ctx.translate(l2dx, l2dy);

      for (let row = -2; row < hRows; row++) {
        const offsetX = row % 2 === 0 ? 0 : hexW * 0.5;
        // Mouse in layer 2 coords
        const m2xCanvas = mx * w * 0.5 - l2dx;
        const m2yCanvas = my * h * 0.5 - l2dy;
        const HEX_LIGHT_RADIUS = 150 * dpr;

        for (let col = -2; col < hCols; col++) {
          const hx = col * hexW + offsetX;
          const hy = row * hexH * 0.75;

          // radial wave
          const dx = hx - centerX + l2dx;
          const dy = hy - centerY + l2dy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const wave = Math.sin(dist * 0.035 - t * 1.4) * 0.5 + 0.5;

          // cursor proximity
          const cdx = hx - m2xCanvas;
          const cdy = hy - m2yCanvas;
          const cDist = Math.sqrt(cdx * cdx + cdy * cdy);
          const cursorProx = cDist < HEX_LIGHT_RADIUS ? 1 - cDist / HEX_LIGHT_RADIUS : 0;
          const cursorLight = cursorProx * cursorProx;

          // deterministic noise
          const hash = Math.abs(pseudoRand(col, row));
          const breathMult = 1 + breathValue * 0.5;

          let fillColor: string;
          let strokeColor: string;
          let lw: number;

          if (hash < 0.035) {
            // RED active — boosted by cursor
            const pulse = Math.sin(t * 2.1 + col + row) * 0.5 + 0.5;
            const fa = (0.05 + wave * 0.08 + pulse * 0.02) * breathMult + cursorLight * 0.25;
            const sa = (0.16 + wave * 0.26 + pulse * 0.05) * breathMult + cursorLight * 0.5;
            fillColor = `rgba(230,57,70,${Math.min(fa, 0.4).toFixed(4)})`;
            strokeColor = `rgba(230,57,70,${Math.min(sa, 0.7).toFixed(4)})`;
            lw = (0.35 + cursorLight * 0.4) * dpr;
          } else if (hash < 0.07) {
            // BLUE-WHITE pulse — boosted by cursor
            const pulse = Math.sin(t * 1.6 + col * 0.5 + row * 0.7) * 0.5 + 0.5;
            const fa = (0.008 + pulse * 0.012) * breathMult + cursorLight * 0.08;
            const sa = (0.02 + pulse * 0.025) * breathMult + cursorLight * 0.15;
            fillColor = `rgba(200,218,255,${Math.min(fa, 0.12).toFixed(4)})`;
            strokeColor = `rgba(180,208,255,${Math.min(sa, 0.2).toFixed(4)})`;
            lw = (0.22 + cursorLight * 0.3) * dpr;
          } else {
            // Default — cursor adds white glow
            const fa = (0.003 + wave * 0.01) * breathMult + cursorLight * 0.04;
            const sa = (0.016 + wave * 0.028) * breathMult + cursorLight * 0.12;
            fillColor = `rgba(255,255,255,${Math.min(fa, 0.06).toFixed(4)})`;
            strokeColor = `rgba(255,255,255,${Math.min(sa, 0.15).toFixed(4)})`;
            lw = (0.22 + cursorLight * 0.2) * dpr;
          }

          // draw flat-top hex
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const px = hx + hexR * Math.cos(angle);
            const py = hy + hexR * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          ctx.fillStyle = fillColor;
          ctx.fill();
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = lw;
          ctx.stroke();
        }
      }
      ctx.restore();

      /* ═══ LAYER 3 — BREATH LIGHT ═══ */
      const maxDim = Math.max(w, h);

      if (breathValue > 0.35) {
        const intensity = Math.pow((breathValue - 0.35) / 0.65, 2) * 0.09;
        const r = maxDim * 0.7;
        const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, r);
        grad.addColorStop(0, `rgba(255,255,255,${intensity.toFixed(5)})`);
        grad.addColorStop(0.5, `rgba(255,255,255,${(intensity * 0.4).toFixed(5)})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      if (breathValue > 0.55) {
        const intensity = Math.pow((breathValue - 0.55) / 0.45, 2) * 0.055;
        const r = maxDim * 0.55;
        const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, r);
        grad.addColorStop(0, `rgba(230,57,70,${intensity.toFixed(5)})`);
        grad.addColorStop(0.5, `rgba(230,57,70,${(intensity * 0.35).toFixed(5)})`);
        grad.addColorStop(1, "rgba(230,57,70,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
