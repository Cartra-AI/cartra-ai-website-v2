'use client';

import type { CSSProperties, ReactNode } from 'react';
import { progress, useLoopClock } from './useLoopClock';

/*
 * Animated Cartra Agents mockup: an agent teammate in an insurance agency's
 * team chat. It checks in on its own, takes a request from a colleague,
 * works in real systems, recalls a client's preference from memory, and
 * saves what it learned as a new skill it will reuse. Plays on a
 * loop. Sample content only.
 */

const LOOP = 17000;
const FADE = 700;
const STILL = 15000;

const T = {
  checkin: [300, 2600] as const,
  request: 3300,
  tools: [
    { label: 'Pulled Hartwell’s auto policy from the agency system', start: 4200, done: 5100 },
    { label: 'Logged into the carrier portal and requested a quote', start: 5200, done: 6900 },
  ],
  memory: 7100,
  reply: [7800, 10600] as const,
  approve: 11500,
  skill: 12300,
};

const WORKING: [number, number] = [4200, 7100];

const CHECKIN =
  'Morning. 3 policies renew this week. Hartwell Logistics still owes their updated driver list, so I sent Dana a reminder.';
const REPLY =
  'Quote’s in: +$1,840 a year, effective on approval. I drafted the email to Dana with the PDF and cc’d their CFO, like last time. Want me to send it?';

function Check() {
  return (
    <svg className="lp-check" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
    </svg>
  );
}

/** Fades and lifts children in once `t` passes `at`. */
function Appear({ t, at, children, className = '', style }: { t: number; at: number; children: ReactNode; className?: string; style?: CSSProperties }) {
  const on = t >= at;
  return (
    <div
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'none' : 'translateY(5px)',
        transition: 'opacity 260ms ease, transform 260ms ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Streamed({ text, t, range }: { text: string; t: number; range: readonly [number, number] }) {
  const words = text.split(' ');
  const shown = Math.ceil(words.length * progress(t, ...range));
  return (
    <>
      {words.map((w, i) => (
        <span key={i} style={{ opacity: i < shown ? 1 : 0, transition: 'opacity 160ms ease' }}>
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

function Message({ who, time, tag, children }: { who: 'agent' | 'maria'; time: string; tag?: string; children: ReactNode }) {
  const agent = who === 'agent';
  return (
    <div className="grid grid-cols-[1.5rem_1fr] gap-2.5">
      <span
        aria-hidden
        className="flex items-center justify-center w-6 h-6 text-[0.6875rem]"
        style={{
          borderRadius: agent ? 6 : 999,
          background: agent ? 'var(--lp-glow)' : 'var(--lp-ink-3)',
          color: agent ? 'var(--lp-on-glow, #fff)' : '#fff',
          fontFamily: 'var(--lp-font-display)',
        }}
      >
        {agent ? 'C' : 'M'}
      </span>
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 leading-6">
          <span>{agent ? 'Cartra Agent' : 'Maria Lopez'}</span>
          <span className="lp-mock__muted tabular-nums" style={{ fontSize: '0.6875rem' }}>{time}</span>
          {tag && <span className="lp-pill">{tag}</span>}
        </p>
        <div className="mt-0.5" style={{ color: 'var(--lp-on-ink)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function AgentRun() {
  const { ref, t } = useLoopClock<HTMLDivElement>(LOOP, STILL);
  const fading = t > LOOP - FADE;
  const working = t >= WORKING[0] && t < WORKING[1];

  return (
    <div
      ref={ref}
      className="lp-mock"
      role="img"
      aria-label="Example: a Cartra agent in an insurance agency's team chat checks in on renewals, gets a carrier quote, remembers a client's preferences, and learns a new skill"
    >
      <div className="lp-mock__bar">
        <span># service-team</span>
        {working ? (
          <span className="lp-mock__live">Working</span>
        ) : (
          <span>
            <span className="hidden sm:inline">Cartra Agent · </span>Online
          </span>
        )}
      </div>

      <div className="p-4 grid gap-4" style={{ opacity: fading ? 0 : 1, transition: `opacity ${FADE}ms ease` }}>
        {/* Proactive, unprompted check-in */}
        <Appear t={t} at={T.checkin[0]}>
          <Message who="agent" time="7:30 AM" tag="Scheduled">
            <Streamed text={CHECKIN} t={t} range={T.checkin} />
          </Message>
        </Appear>

        {/* A colleague asks like they would a coworker */}
        <Appear t={t} at={T.request}>
          <Message who="maria" time="9:12 AM">
            <span style={{ color: 'var(--lp-glow)' }}>@Cartra</span> can you get a quote for adding a 2024 box truck to Hartwell&apos;s auto
            policy?
          </Message>
        </Appear>

        {/* The agent works in real systems, then recalls memory */}
        <div className="grid gap-1.5 pl-[2.125rem]">
          {T.tools.map((tool) => (
            <Appear key={tool.label} t={t} at={tool.start} className="lp-action">
              {t >= tool.done ? <Check /> : <span className="lp-spinner" aria-hidden />}
              <span style={{ color: t >= tool.done ? undefined : 'var(--lp-on-ink-muted)' }}>{tool.label}</span>
            </Appear>
          ))}
          <Appear t={t} at={T.memory} className="lp-action" style={{ borderColor: 'color-mix(in srgb, var(--lp-glow) 45%, transparent)' }}>
            <span className="lp-glyph lp-glyph--circle" style={{ color: 'var(--lp-glow)', margin: '0 0.1875rem' }} aria-hidden />
            <span>
              <span style={{ color: 'var(--lp-glow)' }}>Memory</span> · Dana wants quotes as PDF, cc their CFO
            </span>
          </Appear>
        </div>

        <Appear t={t} at={T.reply[0]}>
          <Message who="agent" time="9:14 AM">
            <Streamed text={REPLY} t={t} range={T.reply} />
          </Message>
        </Appear>

        <Appear t={t} at={T.approve}>
          <Message who="maria" time="9:15 AM">
            Looks good, send it.
          </Message>
        </Appear>
      </div>

      {/* Learning loop: what worked becomes a reusable skill */}
      <Appear
        t={t}
        at={T.skill}
        className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
        style={{ borderTop: '1px solid var(--mock-line)', opacity: t >= T.skill && !fading ? 1 : 0 }}
      >
        <span className="flex items-center gap-2">
          <span className="lp-glyph lp-glyph--square" style={{ color: 'var(--lp-glow)' }} aria-hidden />
          <span>
            New skill learned · Commercial auto endorsement quote
          </span>
        </span>
        <span className="lp-pill lp-pill--hot">Active</span>
      </Appear>
    </div>
  );
}
