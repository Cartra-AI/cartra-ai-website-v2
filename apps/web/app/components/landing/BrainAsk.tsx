'use client';

import { useEffect, useRef, useState } from 'react';
import { progress, useLoopClock } from './useLoopClock';

/*
 * Animated Cartra Brain mockup: the same knowledge base answering for
 * different teams, to hint at what can be built on top of it. Each scene
 * types a request, searches, streams a sourced answer, then moves to the
 * next team. Tabs are clickable. Sample content only.
 */

type Scene = {
  tab: string;
  asker: string;
  ask: string;
  answer: string;
  sources: string[];
  searched: number;
};

const SCENES: Scene[] = [
  {
    tab: 'Customer service',
    asker: 'Support team',
    ask: 'Can we accept returns on custom orders after 30 days?',
    answer:
      'Only for manufacturing defects. Custom orders are final sale after 30 days, but defects are covered for 12 months. Offer a repair first, then a replacement. Refunds need a manager’s approval.',
    sources: ['Returns policy v4 · §3.2', 'Warranty terms 2026', 'Support thread · approved'],
    searched: 214,
  },
  {
    tab: 'Marketing',
    asker: 'Marketing team',
    ask: 'Draft a short post announcing our new 12-month warranty.',
    answer:
      'Built to last, and now backed for longer. Every custom order we ship is covered for 12 months against manufacturing defects, with repairs handled by the same team that built it.',
    sources: ['Warranty terms 2026', 'Brand voice guide', 'Launch brief · Q4'],
    searched: 186,
  },
  {
    tab: 'Onboarding',
    asker: 'New hire · week 1',
    ask: 'How do I handle a same-day rush order?',
    answer:
      'Confirm stock in the ERP before promising a time. Tag the order RUSH and tell the warehouse lead in #dispatch. Orders in by 1 pm ship today; after that, offer next-morning delivery.',
    sources: ['Dispatch SOP · §2', 'Rush order checklist', 'Training · week 1'],
    searched: 97,
  },
  {
    tab: 'Sales',
    asker: 'Sales team',
    ask: 'Which models fit a customer running 480V equipment?',
    answer:
      'The X400 and X600 series both support 480V three-phase. The X400 covers most shops; recommend the X600 above 40 hours of runtime a week. Both need the HV install kit.',
    sources: ['Product catalog 2026', 'X-series spec sheets', 'Engineering notes · approved'],
    searched: 152,
  },
];

const SCENE = 8000;
const LOOP = SCENE * SCENES.length;
const TYPE = [300, 1600] as const;
const SEARCH = [1800, 2600] as const;
const ANSWER = [2600, 5600] as const;
const SOURCES_AT = 5700;
const FADE_AT = SCENE - 450;
/** Reduced motion: the first scene, fully answered. */
const STILL = SCENE - 900;

export default function BrainAsk() {
  const { ref, t, frozen } = useLoopClock<HTMLDivElement>(LOOP, STILL);
  const [offset, setOffset] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  const now = (t + offset) % LOOP;
  const index = Math.floor(now / SCENE);
  const local = now % SCENE;
  const scene = SCENES[index]!;

  const typed = scene.ask.slice(0, Math.ceil(scene.ask.length * progress(local, ...TYPE)));
  const typing = local < TYPE[1];
  const searching = local >= SEARCH[0] && local < SEARCH[1];
  const words = scene.answer.split(' ');
  const shownWords = Math.ceil(words.length * progress(local, ...ANSWER));
  const fading = local > FADE_AT;

  // Keep the active team's tab in view when the row scrolls (phones).
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row?.children[index] as HTMLElement | undefined;
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: Math.max(0, tab.offsetLeft - 16), behavior: 'smooth' });
  }, [index]);

  const jumpTo = (i: number) => {
    const target = i * SCENE + (frozen ? STILL : 0);
    setOffset((((target - t) % LOOP) + LOOP) % LOOP);
  };

  return (
    <div ref={ref} className="lp-mock" role="group" aria-label="Example: Cartra Brain answering requests from different teams">
      <div className="lp-mock__bar">
        <span>Cartra Brain</span>
        <span className="tabular-nums">{local >= SEARCH[1] ? `Searched ${scene.searched} sources` : 'Ask anything'}</span>
      </div>

      {/* Teams building on the same Brain */}
      <div ref={tabsRef} className="relative flex overflow-x-auto" style={{ borderBottom: '1px solid var(--lp-line)', scrollbarWidth: 'none' }}>
        {SCENES.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.tab}
              type="button"
              aria-pressed={active}
              onClick={() => jumpTo(i)}
              className="relative shrink-0 px-4 py-2.5 lp-mono"
              style={{ fontSize: '0.625rem', color: active ? 'var(--lp-text)' : 'var(--lp-muted)', transition: 'color 200ms' }}
            >
              {s.tab}
              <span
                aria-hidden
                className="absolute left-0 bottom-0 h-[2px]"
                style={{
                  width: active ? `${(frozen ? 1 : local / SCENE) * 100}%` : 0,
                  background: 'var(--lp-glow)',
                  transition: active ? 'width 120ms linear' : 'none',
                }}
              />
            </button>
          );
        })}
      </div>

      <div className="p-4 grid gap-3" style={{ opacity: fading ? 0 : 1, transition: 'opacity 400ms ease' }}>
        <div>
          <p className="lp-mono lp-mock__muted mb-1.5" style={{ fontSize: '0.625rem' }}>
            Asked by · {scene.asker}
          </p>
          <div className="flex items-center gap-2.5 px-3 py-2.5 lp-round-sm" style={{ border: '1px solid var(--lp-line-strong)', minHeight: '2.75rem' }}>
            <span className="lp-glyph lp-glyph--circle" style={{ color: 'var(--lp-glow)' }} aria-hidden />
            <span>
              {typed}
              {typing && <span className="inline-block w-px h-[1em] align-[-2px] ml-px" style={{ background: 'var(--lp-text)' }} aria-hidden />}
            </span>
          </div>
        </div>

        <div style={{ minHeight: '6.25rem' }}>
          {searching ? (
            <p className="flex items-center gap-2 lp-mono lp-mock__muted" style={{ fontSize: '0.6875rem' }}>
              <span className="lp-spinner" style={{ borderColor: 'var(--lp-line)', borderTopColor: 'var(--lp-glow)' }} aria-hidden />
              Searching docs, tickets and chat
            </p>
          ) : (
            <p>
              {words.map((w, i) => (
                <span key={`${index}-${i}`} style={{ opacity: i < shownWords ? 1 : 0, transition: 'opacity 160ms ease' }}>
                  {w}
                  {i < words.length - 1 ? ' ' : ''}
                </span>
              ))}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5" style={{ minHeight: '3.5rem', alignContent: 'flex-start' }}>
          {scene.sources.map((src, i) => {
            const visible = local >= SOURCES_AT + i * 250;
            return (
              <span
                key={`${index}-${src}`}
                className="lp-source"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(4px)',
                  transition: 'opacity 250ms ease, transform 250ms ease',
                }}
              >
                <b>{i + 1}</b> {src}
              </span>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-y-2" style={{ borderTop: '1px solid var(--lp-line)' }}>
        {['Drives & docs', 'Help desk', 'Team chat', 'ERP & CRM'].map((s) => (
          <span key={s} className="lp-mono lp-mock__muted flex items-center gap-1.5" style={{ fontSize: '0.625rem' }}>
            <span className="lp-glyph lp-glyph--square" style={{ width: 6, height: 6, color: 'var(--lp-text)' }} aria-hidden />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
