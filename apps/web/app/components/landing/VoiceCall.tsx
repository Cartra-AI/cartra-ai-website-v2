'use client';

import { useEffect, useRef } from 'react';
import { useLoopClock } from './useLoopClock';

/*
 * Animated Cartra Voice mockup: a live call that plays out on a loop.
 * The waveform scrolls like a real call recorder (ink while the caller
 * speaks, orange while the agent speaks), the transcript fills in word by
 * word, and the agent's actions resolve as the call goes. Sample content
 * only, not customer data.
 */

type Who = 'caller' | 'agent';

// An independent insurance agency's service line: a certificate request.
const TURNS: Array<{ who: Who; start: number; end: number; text: string }> = [
  { who: 'caller', start: 500, end: 3700, text: 'Hi, I need a certificate of insurance for a new job. The general contractor needs it before Monday.' },
  { who: 'agent', start: 4300, end: 8900, text: 'Happy to help. I found your general liability policy, active through March. Who should I list as the certificate holder?' },
  { who: 'caller', start: 9500, end: 11300, text: 'Brightline Builders. Email it to me and I’ll forward it.' },
];

const ACTIONS = [
  { label: 'Verified policyholder and active GL policy', start: 4500, done: 5400 },
  { label: 'Issued certificate for Brightline Builders', start: 11500, done: 12300 },
  { label: 'Emailed certificate and noted the account', start: 12400, done: 13200 },
];

const CALL_END = 11500;
const LOOP = 16500;
const FADE = 700;
const START_SECONDS = 2 * 60 + 2;
/** Frozen frame for reduced motion: call finished, everything resolved. */
const STILL = 14000;

const speakerAt = (t: number): Who | null => TURNS.find((s) => t >= s.start && t < s.end)?.who ?? null;

const clock = (t: number) => {
  const s = START_SECONDS + Math.floor(Math.min(t, CALL_END) / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

function Check() {
  return (
    <svg className="lp-check" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
    </svg>
  );
}

function Waveform({ timeRef, still }: { timeRef: React.RefObject<number>; still: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const BAR = 2;
    const GAP = 2;
    const STEP_MS = 42;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let samples: Array<{ a: number; who: Who | null }> = [];

    const sample = (t: number): { a: number; who: Who | null } => {
      const who = speakerAt(t);
      if (!who) return { a: 0.035 + Math.random() * 0.03, who };
      // Syllable-like envelope with jitter so it reads as speech, not noise.
      const syllable = 0.3 + 0.7 * Math.abs(Math.sin(t / 95) * Math.sin(t / 410 + 1.3));
      const jitter = 0.35 + 0.65 * Math.pow(Math.random(), 0.8);
      return { a: Math.min(1, syllable * jitter + 0.04), who };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.ceil(w / (BAR + GAP));
      if (samples.length !== n) {
        // Pre-fill with the conversation so far so it never starts empty.
        const now = still ? STILL - 1500 : timeRef.current;
        samples = Array.from({ length: n }, (_, i) => sample(now - (n - i) * STEP_MS));
      }
    };

    const css = getComputedStyle(canvas);
    const colors = {
      caller: css.getPropertyValue('--lp-text').trim() || '#121211',
      agent: css.getPropertyValue('--lp-glow').trim() || '#f54e00',
      idle: css.getPropertyValue('--lp-line-strong').trim() || '#cfcdc5',
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mid = h / 2;
      ctx.lineCap = 'round';
      ctx.lineWidth = BAR;
      samples.forEach((s, i) => {
        const x = i * (BAR + GAP) + BAR / 2;
        const half = Math.max(0.75, (s.a * (h - BAR)) / 2);
        // Older audio fades out toward the left edge.
        ctx.globalAlpha = Math.min(1, 0.25 + (i / samples.length) * 1.1);
        ctx.strokeStyle = s.who ? colors[s.who] : colors.idle;
        ctx.beginPath();
        ctx.moveTo(x, mid - half);
        ctx.lineTo(x, mid + half);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      if (now - last >= STEP_MS) {
        last = now;
        samples.shift();
        samples.push(sample(timeRef.current));
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    draw();
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    if (!still) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [still, timeRef]);

  return <canvas ref={ref} className="block w-full h-10" aria-hidden />;
}

export default function VoiceCall() {
  const { ref: rootRef, t, timeRef, frozen: still } = useLoopClock<HTMLDivElement>(LOOP, STILL);

  const fading = t > LOOP - FADE;
  const ended = t >= CALL_END;
  const speaking = speakerAt(t);

  return (
    <div
      ref={rootRef}
      className="lp-mock"
      role="img"
      aria-label="Example: a Cartra Voice agent at an insurance agency handles a certificate of insurance request"
    >
      <div className="lp-mock__bar">
        <span>Inbound · Service line</span>
        {ended ? (
          <span className="tabular-nums">Call ended {clock(t)}</span>
        ) : (
          <span className="lp-mock__live tabular-nums">Live {clock(t)}</span>
        )}
      </div>

      <div className="px-4 pt-4">
        <Waveform timeRef={timeRef} still={still} />
        <div className="mt-2 flex items-center justify-between lp-mono lp-mock__muted" style={{ fontSize: '0.625rem' }}>
          <span style={{ color: speaking === 'caller' ? 'var(--lp-text)' : undefined, transition: 'color 200ms' }}>● Caller</span>
          <span style={{ color: speaking === 'agent' ? 'var(--lp-glow)' : undefined, transition: 'color 200ms' }}>Cartra Voice ●</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2.5" style={{ opacity: fading ? 0 : 1, transition: `opacity ${FADE}ms ease` }}>
        {TURNS.map((turn) => {
          const words = turn.text.split(' ');
          const progress = Math.min(1, Math.max(0, (t - turn.start) / (turn.end - turn.start)));
          const shown = Math.ceil(words.length * progress);
          return (
            <p
              key={turn.text}
              className={`lp-bubble ${turn.who === 'agent' ? 'lp-bubble--agent' : ''}`}
              style={{
                opacity: t >= turn.start ? 1 : 0,
                transform: t >= turn.start ? 'none' : 'translateY(6px)',
                transition: 'opacity 250ms ease, transform 250ms ease',
              }}
            >
              {words.map((word, i) => (
                <span key={i} style={{ opacity: i < shown ? 1 : 0, transition: 'opacity 160ms ease' }}>
                  {word}
                  {i < words.length - 1 ? ' ' : ''}
                </span>
              ))}
            </p>
          );
        })}
      </div>

      <div className="px-4 pb-4 grid gap-1.5" style={{ opacity: fading ? 0 : 1, transition: `opacity ${FADE}ms ease` }}>
        {ACTIONS.map((a) => {
          const visible = t >= a.start;
          const done = t >= a.done;
          return (
            <div
              key={a.label}
              className="lp-action"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(4px)',
                transition: 'opacity 250ms ease, transform 250ms ease',
              }}
            >
              {done ? (
                <Check />
              ) : (
                <span className="lp-spinner" style={{ borderColor: 'var(--lp-line)', borderTopColor: 'var(--lp-glow)' }} aria-hidden />
              )}
              <span style={{ color: done ? undefined : 'var(--lp-muted)' }}>{a.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
