import { useEffect, useRef, useState } from "react";

export default function NebuCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        setIsTouch(true);
      }
    };
    checkTouch();
    window.addEventListener("touchstart", () => setIsTouch(true), { once: true });

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Hover detection
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, label")) {
        setHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, label")) {
        setHovering(false);
      }
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    let raf: number;
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: hovering ? 0 : 8,
          height: hovering ? 0 : 8,
          borderRadius: "50%",
          backgroundColor: "#E63946",
          transition: "width 0.2s, height 0.2s",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: hovering ? 50 : 28,
          height: hovering ? 50 : 28,
          borderRadius: "50%",
          border: hovering ? "none" : "1px solid rgba(230,57,70,0.5)",
          backgroundColor: hovering ? "rgba(230,57,70,0.1)" : "transparent",
          transition: "width 0.25s, height 0.25s, background-color 0.25s, border 0.25s",
          willChange: "transform",
        }}
      />
    </>
  );
}
