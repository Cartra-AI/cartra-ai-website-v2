'use client';

import { useEffect, useRef } from 'react';

/*
 * The hero's phone animation: a flat grid of dots that ripples outward from
 * a slowly drifting point, like a signal spreading through a team. Dots grow
 * and darken as a ring passes; a few on the ring's peak light up orange (the
 * site's "an agent is working" color, --lp-orange). It sits in its own block,
 * so nothing is drawn behind text. Pauses offscreen; one still frame for
 * reduced motion.
 */
export default function DotRipple() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ink = '38, 37, 30';
    const accent = '245, 78, 0';
    const GAP = 14;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      const cols = Math.floor(w / GAP);
      const rows = Math.floor(h / GAP);
      const ox = (w - (cols - 1) * GAP) / 2;
      const oy = (h - (rows - 1) * GAP) / 2;
      // The source drifts slowly across the grid.
      const sx = w * (0.5 + 0.32 * Math.sin(t * 0.13));
      const sy = h * (0.5 + 0.3 * Math.cos(t * 0.17));
      const reach = Math.hypot(w, h);

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = ox + i * GAP;
          const y = oy + j * GAP;
          const d = Math.hypot(x - sx, y - sy);
          // Rings travel outward; amplitude fades with distance.
          const wave = Math.sin(d * 0.07 - t * 2.2);
          const fall = 1 - Math.min(d / reach, 1) * 0.7;
          const peak = Math.max(wave, 0) ** 3 * fall;
          const r = 0.7 + peak * 1.5;
          const lit = peak > 0.55 && (i * 3 + j * 5) % 7 === 0;
          ctx.fillStyle = lit ? `rgba(${accent}, ${0.6 + peak * 0.4})` : `rgba(${ink}, ${0.14 + peak * 0.5})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    };

    resize();
    draw(start + 3000);

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="block h-full w-full" />;
}
