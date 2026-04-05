import { useEffect } from "react";

export function useScrollRevealV2() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = document.querySelectorAll("[data-reveal]");
    els.forEach((el) => {
      if (prefersReduced) {
        el.classList.add("revealed");
      } else {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);
}

export function useCountUp() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const target = el.dataset.countTarget || "0";
            const suffix = el.dataset.countSuffix || "";
            const isPercent = target.includes("%");
            const num = parseInt(target.replace(/[^0-9]/g, ""));
            const duration = 1500;
            const start = performance.now();

            if (prefersReduced) {
              el.textContent = target;
              io.unobserve(el);
              return;
            }

            const step = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(num * eased);
              el.textContent = `${current}${isPercent ? "%" : suffix}`;
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.8 }
    );

    const els = document.querySelectorAll("[data-count-target]");
    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);
}
