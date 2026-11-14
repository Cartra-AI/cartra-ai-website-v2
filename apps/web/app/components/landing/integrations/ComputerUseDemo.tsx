'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useLoopClock } from '../useLoopClock';

/*
 * A deliberately dated desktop app (no API) being operated by an agent the
 * way a person would: the cursor clicks into a field, types a policy number,
 * presses Search and reads the result. Plays on a loop. Sample data only.
 */

const POLICY = 'HL-204118';
const LOOP = 8600;
const FADE = 500;
const STILL = 7200;

const T = {
  toField: 500,
  focus: 1100,
  type: [1250, 2500] as const,
  toButton: 2700,
  press: 3300,
  searching: [3400, 4100] as const,
  result: 4100,
  toResult: 4500,
  read: 5200,
};

type Point = { x: number; y: number };

export default function ComputerUseDemo() {
  const { ref, t } = useLoopClock<HTMLDivElement>(LOOP, STILL);
  const fieldRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [spots, setSpots] = useState<{ rest: Point; field: Point; button: Point; result: Point } | null>(null);

  // Cursor targets come from the real layout so they hold at every width.
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const measure = () => {
      const box = root.getBoundingClientRect();
      const at = (el: HTMLElement | null, fx: number, fy: number): Point => {
        const r = el?.getBoundingClientRect();
        return r ? { x: r.left - box.left + r.width * fx, y: r.top - box.top + r.height * fy } : { x: 0, y: 0 };
      };
      setSpots({
        rest: { x: box.width * 0.82, y: box.height * 0.9 },
        field: at(fieldRef.current, 0.25, 0.55),
        button: at(buttonRef.current, 0.5, 0.55),
        result: at(resultRef.current, 0.3, 0.5),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, [ref]);

  const fading = t > LOOP - FADE;
  const typed = POLICY.slice(0, Math.ceil(POLICY.length * Math.min(1, Math.max(0, (t - T.type[0]) / (T.type[1] - T.type[0])))));
  const focused = t >= T.focus && t < T.press;
  const pressed = t >= T.press && t < T.press + 180;
  const searching = t >= T.searching[0] && t < T.searching[1];
  const showResult = t >= T.result;
  const reading = t >= T.read;

  const cursor = !spots
    ? null
    : t < T.toField
      ? spots.rest
      : t < T.toButton
        ? spots.field
        : t < T.toResult
          ? spots.button
          : spots.result;

  return (
    <div ref={ref} className="lp-legacy" role="img" aria-label="Example: an agent operating a legacy desktop app with no API by clicking, typing and reading the screen">
      <div style={{ opacity: fading ? 0 : 1, transition: `opacity ${FADE}ms ease` }}>
        <div className="lp-legacy__title">
          <span>AMS 7.2 · Policy Lookup</span>
          <span className="lp-legacy__btns" aria-hidden>
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="lp-legacy__body">
          <div className="lp-legacy__row">
            <span>Policy #</span>
            <div ref={fieldRef} className={`lp-legacy__field ${focused ? 'is-focus' : ''}`}>
              {typed || ' '}
              {focused && <span className="lp-legacy__caret" aria-hidden />}
            </div>
          </div>
          <div className="lp-legacy__row">
            <span>Line</span>
            <div className="lp-legacy__field lp-legacy__field--select">Commercial Auto ▾</div>
          </div>
          <div className="flex justify-end">
            <div ref={buttonRef} className={`lp-legacy__button ${pressed ? 'is-pressed' : ''}`}>
              {searching ? 'Searching…' : 'Search'}
            </div>
          </div>
          <div ref={resultRef} className="lp-legacy__result" style={{ opacity: showResult ? 1 : 0 }}>
            <span>Hartwell Logistics</span>
            <span>Renews 03/01/27</span>
          </div>
        </div>
      </div>

      {cursor && (
        <svg
          className="lp-legacy__cursor"
          viewBox="0 0 16 22"
          aria-hidden
          style={{
            transform: `translate(${cursor.x}px, ${cursor.y}px) scale(${pressed ? 0.85 : 1})`,
            opacity: fading ? 0 : 1,
          }}
        >
          <path d="M1 1v16.5l4.3-4 2.9 6.8 2.8-1.2-2.9-6.6H14z" fill="#fff" stroke="#121211" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      )}

      <div className="lp-legacy__status" style={{ opacity: reading && !fading ? 1 : 0 }}>
        <svg className="lp-check" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
        </svg>
        Read policy from screen
      </div>
    </div>
  );
}
