'use client';

import { useEffect, useRef } from 'react';

/**
 * Perspective field of dots rolling like terrain, after the hero on
 * varickagents.com. Mostly ink circles; the logo's squares are scattered
 * through it, and wave crests catch the brand orange.
 */
export default function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Crest highlights use the palette accent (--lp-glow) as "r, g, b".
    const accent = (() => {
      const hex = getComputedStyle(canvas).getPropertyValue('--lp-glow').trim();
      const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
      return m ? m.slice(1).map((h) => parseInt(h, 16)).join(', ') : '245, 78, 0';
    })();
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

    const COLS = 110;
    const ROWS = 48;

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      const focal = h;
      const camY = 0.95;
      const horizon = h * 0.1;
      const cx = w / 2;
      const spread = Math.max(w / h, 1.4) * 1.9;

      for (let j = ROWS - 1; j >= 0; j--) {
        const z = 1.25 + j * 0.17;
        for (let i = 0; i < COLS; i++) {
          const x = (i / (COLS - 1) - 0.5) * spread * z * 0.55;
          const y =
            0.22 * Math.sin(x * 1.7 + t * 0.55) +
            0.16 * Math.sin(z * 0.9 - t * 0.4 + x * 0.3) +
            0.09 * Math.sin((x - z) * 2.3 + t * 0.8);

          const sx = cx + (x * focal) / z;
          const sy = horizon + ((camY - y) * focal) / z;
          if (sx < -4 || sx > w + 4 || sy > h + 4) continue;

          const depth = 1 - j / ROWS;
          const size = Math.max(0.7, 3 / z);
          const crest = y > 0.3;
          const square = (i * 7 + j * 13) % 41 === 0;

          if (crest && (i + j) % 3 === 0) {
            ctx.fillStyle = `rgba(${accent}, ${0.35 + depth * 0.55})`;
          } else {
            ctx.fillStyle = `rgba(18, 18, 17, ${0.1 + depth * 0.5})`;
          }

          if (square) {
            const s = size * 2.2;
            ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
          } else if (size < 1.3) {
            ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
          } else {
            ctx.beginPath();
            ctx.arc(sx, sy, size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    };

    resize();
    draw(start + 4000);

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

  return <canvas ref={ref} aria-hidden />;
}
