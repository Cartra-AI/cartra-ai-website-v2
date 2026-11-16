'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Types `text` out one character at a time, with a caret that
 * blinks while typing and fades once done. The full text is laid out
 * invisibly underneath, so the line keeps its size and wrapping from the first
 * frame and nothing below it shifts. Screen readers and crawlers get the whole
 * text at once; visitors who prefer reduced motion see it immediately.
 *
 * Typing starts once the nearest `.lp-hero-in` ancestor has finished its
 * fade-in (plus `delay`), so it follows the hero animation however long the
 * page takes to load.
 */
export default function TypedText({
  text,
  delay = 0,
  speed = 42,
  className = '',
}: {
  text: string;
  /** Pause after the surrounding fade-in ends, before the first character, in ms. */
  delay?: number;
  /** Time per character, in ms. */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(text.length);
      return;
    }
    let cancelled = false;
    let interval = 0;
    let timeout = 0;
    const host = ref.current?.closest('.lp-hero-in');
    const fades = host?.getAnimations?.() ?? [];
    Promise.all(fades.map((a) => a.finished))
      .catch(() => undefined)
      .then(() => {
        if (cancelled) return;
        timeout = window.setTimeout(() => {
          setStarted(true);
          interval = window.setInterval(() => {
            setCount((c) => {
              if (c + 1 >= text.length) window.clearInterval(interval);
              return Math.min(c + 1, text.length);
            });
          }, speed);
        }, delay);
      });
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, delay, speed]);

  const done = count >= text.length;

  return (
    <span ref={ref} className={`lp-typed ${className}`.trim()}>
      <span className="sr-only">{text}</span>
      <span className="lp-typed__ghost" aria-hidden>
        {text}
      </span>
      <span className="lp-typed__live" aria-hidden>
        {text.slice(0, count)}
        <span className="lp-typed__caret" data-state={done ? 'done' : started ? 'typing' : 'waiting'} />
      </span>
    </span>
  );
}
