'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Drives a looping mockup animation. Returns the elapsed time in the loop
 * (ms), ticking only while the element is on screen. With reduced motion
 * the clock is frozen at `still`, a frame that shows the finished state.
 */
export function useLoopClock<T extends HTMLElement>(loop: number, still: number, tickMs = 80) {
  const ref = useRef<T>(null);
  const timeRef = useRef(0);
  const [t, setT] = useState(0);
  const [frozen, setFrozen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timeRef.current = still;
      setFrozen(true);
      setT(still);
      return;
    }

    let start = 0;
    let elapsedBeforePause = 0;
    let timer: ReturnType<typeof setInterval> | undefined;

    const run = () => {
      if (timer) return;
      start = performance.now() - elapsedBeforePause;
      timer = setInterval(() => {
        const now = (performance.now() - start) % loop;
        timeRef.current = now;
        setT(now);
      }, tickMs);
    };
    const pause = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = undefined;
      elapsedBeforePause = timeRef.current;
    };

    const io = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? run() : pause()), { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      pause();
    };
  }, [loop, still, tickMs]);

  return { ref, t, timeRef, frozen };
}

/** 0..1 progress of `t` through [start, end]. */
export const progress = (t: number, start: number, end: number) =>
  Math.min(1, Math.max(0, (t - start) / (end - start)));
