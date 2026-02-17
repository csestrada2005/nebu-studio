import { useRef, useEffect, useCallback } from "react";

interface GeometryCanvasProps {
  className?: string;
  mouseX?: number;
  mouseY?: number;
}

interface Shape {
  x: number;
  y: number;
  z: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: "hex" | "square" | "circle" | "triangle";
  opacity: number;
}

export const GeometryCanvas = ({ className = "", mouseX = 0, mouseY = 0 }: GeometryCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<Shape[]>([]);
  const animRef = useRef<number>(0);
  const scrollRef = useRef(0);

  const initShapes = useCallback((w: number, h: number) => {
    const shapes: Shape[] = [];
    const types: Shape["type"][] = ["hex", "square", "circle", "triangle"];
    for (let i = 0; i < 12; i++) {
      shapes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.3 + Math.random() * 0.7,
        size: 20 + Math.random() * 60,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
        type: types[i % types.length],
        opacity: 0.05 + Math.random() * 0.12,
      });
    }
    shapesRef.current = shapes;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      if (shapesRef.current.length === 0) initShapes(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const drawShape = (shape: Shape, mx: number, my: number, scroll: number) => {
      const parallaxX = mx * shape.z * 0.02;
      const parallaxY = (my * shape.z * 0.02) + (scroll * shape.z * 0.05);
      const x = shape.x + parallaxX;
      const y = shape.y - parallaxY;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(shape.rotation);
      ctx.strokeStyle = `rgba(79, 124, 255, ${shape.opacity})`;
      ctx.lineWidth = 1;

      const s = shape.size;

      switch (shape.type) {
        case "hex":
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const hx = Math.cos(angle) * s;
            const hy = Math.sin(angle) * s;
            i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
          break;
        case "square":
          ctx.strokeRect(-s / 2, -s / 2, s, s);
          break;
        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
          ctx.stroke();
          // Dotted inner circle
          ctx.setLineDash([3, 5]);
          ctx.beginPath();
          ctx.arc(0, 0, s / 3, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
          break;
        case "triangle":
          ctx.beginPath();
          ctx.moveTo(0, -s / 2);
          ctx.lineTo(s / 2, s / 2);
          ctx.lineTo(-s / 2, s / 2);
          ctx.closePath();
          ctx.stroke();
          break;
      }

      ctx.restore();
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw grid lines
      ctx.strokeStyle = "rgba(139, 147, 161, 0.04)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < rect.width; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
        ctx.stroke();
      }
      for (let y = 0; y < rect.height; y += 80) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }

      shapesRef.current.forEach((shape) => {
        shape.rotation += shape.rotationSpeed;
        drawShape(shape, mouseX, mouseY, scrollRef.current);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [mouseX, mouseY, initShapes]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};
