'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { CallButton } from './primitives';

/*
 * "How we work": three steps on the left, an animated illustrative dashboard
 * for the active step on the right. Steps advance on their own while the
 * section is in view (paused on hover; off for reduced motion) and can be
 * picked by click. Each panel plays a short sequence from the moment its step
 * opens. All data in the panels is sample data for a fictional distributor.
 */

const STEP_MS = 11000;

type Step = { id: string; name: string; body: string };

const STEPS: Step[] = [
  {
    id: 'discover',
    name: 'Discover',
    body: 'We sit with your team, connect to your systems, and map how the work really runs. Then we pick the first workflow to automate and set the baseline.',
  },
  {
    id: 'build',
    name: 'Build',
    body: 'We build custom agents around your processes, run them on real work in shadow mode, and take them live once they clear the bar we set together.',
  },
  {
    id: 'compound',
    name: 'Compound',
    body: 'Your agents learn from every correction. We stay on as your AI team, train your people, and take the next workflow live.',
  },
];

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  return reduce;
}

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = inView && !paused && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % STEPS.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [running, active]);

  return (
    <section id="how-it-works" ref={ref} className="lp-section lp-anchor lp-dark" aria-labelledby="process-title">
      <div className="lp-wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="lp-tag">How we work</p>
            <h2 id="process-title" className="lp-statement mt-3">
              The Cartra process
            </h2>
          </div>
          <CallButton location="landing_process">Find your first win</CallButton>
        </div>

        <div
          className="lp-proc mt-10 lg:mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ol className="lp-proc__steps">
            {STEPS.map((s, i) => (
              <li key={s.id} data-active={i === active}>
                <button
                  type="button"
                  className="lp-proc__step"
                  aria-current={i === active ? 'step' : undefined}
                  aria-controls="lp-proc-panel"
                  onClick={() => setActive(i)}
                >
                  <span
                    className="lp-proc__rail"
                    aria-hidden
                    data-running={i === active && running}
                    style={{ '--step-ms': `${STEP_MS}ms` } as CSSProperties}
                  />
                  <span className="lp-proc__name">{s.name}</span>
                  <span className="lp-proc__body">{s.body}</span>
                </button>
              </li>
            ))}
          </ol>

          <div id="lp-proc-panel" className="lp-proc__panel">
            {/* Keyed by step: switching steps remounts the panel and replays it. */}
            <div key={STEPS[active]!.id} className="lp-proc__frame">
              {active === 0 && <DiscoverPanel />}
              {active === 1 && <BuildPanel />}
              {active === 2 && <CompoundPanel />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Timeline helpers ---------- */

/** Milliseconds since the panel mounted; jumps to the end for reduced motion. */
function useClock(until = STEP_MS) {
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (reduce) {
      setT(Number.MAX_SAFE_INTEGER);
      return;
    }
    const start = performance.now();
    const id = window.setInterval(() => {
      const v = performance.now() - start;
      setT(v);
      if (v > until) window.clearInterval(id);
    }, 50);
    return () => window.clearInterval(id);
  }, [reduce, until]);
  return t;
}

const ease = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);

/** Eased 0..1 progress of a span [from, from + dur] at time t. */
const prog = (t: number, from: number, dur: number) => ease((t - from) / dur);

/** Fades and lifts its children in once the clock passes `at`. */
function Appear({ t, at, children, className = '', as: Tag = 'div' }: { t: number; at: number; children: ReactNode; className?: string; as?: 'div' | 'li' | 'span' }) {
  return (
    <Tag className={`lp-anim ${className}`.trim()} data-on={t >= at}>
      {children}
    </Tag>
  );
}

/* ---------- Shared panel pieces ---------- */

function PanelHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="lp-proc__head">
      <div>
        <p className="lp-proc__title">{title}</p>
        <p className="lp-proc__sub">{sub}</p>
      </div>
      <p className="lp-proc__note">Illustrative, sample data</p>
    </div>
  );
}

function Card({ n, title, aside, children, className = '' }: { n?: number; title: string; aside?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`lp-proc__card ${className}`.trim()}>
      <div className="lp-proc__card-head">
        <p>
          {n !== undefined && <span className="lp-proc__n">{n}</span>}
          {title}
        </p>
        {aside && <span>{aside}</span>}
      </div>
      <div className="lp-proc__card-body">{children}</div>
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="lp-proc__check">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return <span className="lp-proc__spin" aria-hidden />;
}

/* ---------- 1. Discover ---------- */

const SYSTEMS = [
  ['netsuite.svg', 'NetSuite', 'Orders, invoices'],
  ['salesforce.svg', 'Salesforce', 'Accounts, quotes'],
  ['zendesk.svg', 'Zendesk', 'Support tickets'],
  ['microsoftoutlook.svg', 'Outlook', 'Shared inboxes'],
  ['microsoftteams.svg', 'Microsoft Teams', 'Team chats'],
  ['whatsapp.svg', 'WhatsApp', 'Customer messages'],
  ['wechat.svg', 'WeChat', 'Supplier chats'],
];

const SESSIONS = [
  ['Mon 9:00', 'Order desk'],
  ['Mon 1:30', 'Support lead'],
  ['Tue 10:00', 'Controller'],
  ['Tue 2:00', 'Sales ops'],
  ['Wed 9:30', 'Warehouse'],
  ['Wed 3:00', 'IT admin'],
];

const TIME = [
  ['Order entry from email', 46, true],
  ['Order status questions', 31, false],
  ['Quote follow-ups', 18, false],
  ['Returns and credits', 9, false],
] as const;

function DiscoverPanel() {
  const t = useClock();
  const sysAt = (i: number) => 500 + i * 420;
  const sessionAt = (i: number) => 2200 + i * 260;
  const connected = SYSTEMS.filter((_, i) => t >= sysAt(i) + 380).length;
  const interviewed = SESSIONS.filter((_, i) => t >= sessionAt(i)).length;
  const barsAt = 5000;

  return (
    <>
      <PanelHead title="Discover" sub="Customer operations, Alder Supply" />
      <div className="lp-proc__grid lp-proc__grid--discover">
        <Card n={1} title="Connect your systems" aside={`${connected} of ${SYSTEMS.length}`} className="lp-proc__a">
          <ul className="lp-proc__list">
            {SYSTEMS.map(([logo, name, what], i) => {
              const state = t < sysAt(i) ? 'idle' : t < sysAt(i) + 380 ? 'busy' : 'done';
              return (
                <li key={name} data-state={state}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- static SVG logos */}
                  <img src={`/integrations/${logo}`} alt="" className="lp-proc__logo" />
                  <span className="lp-proc__grow">
                    <b>{name}</b>
                    <small>{what}</small>
                  </span>
                  {state === 'idle' && <span className="lp-proc__wait">Waiting</span>}
                  {state === 'busy' && (
                    <span className="lp-proc__wait">
                      <Spinner />
                      Connecting
                    </span>
                  )}
                  {state === 'done' && (
                    <span className="lp-proc__ok lp-proc__pop">
                      <Check />
                      Connected
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </Card>
        <Card n={2} title="Interview the team" aside={`${interviewed} of ${SESSIONS.length} sessions`} className="lp-proc__b">
          <div className="lp-proc__sessions">
            {SESSIONS.map(([when, who], i) => (
              <span key={when} data-on={t >= sessionAt(i)}>
                <small>{when}</small>
                <b>{who}</b>
              </span>
            ))}
          </div>
          <Appear t={t} at={3900} className="lp-proc__quote">
            <small>Order desk lead, session 1</small>
            &ldquo;Half my morning is <mark data-on={t >= 4500}>copying orders from email into NetSuite</mark>, line by
            line.&rdquo;
          </Appear>
        </Card>
        <Card n={3} title="Find where the time goes" aside="Hours per week" className="lp-proc__c">
          <ul className="lp-proc__bars">
            {TIME.map(([label, hours, first], i) => {
              const p = prog(t, barsAt + i * 220, 1100);
              return (
                <li key={label} data-first={first}>
                  <span className="lp-proc__grow">
                    {label}
                    {first && (
                      <em className="lp-anim" data-on={t >= barsAt + 1700}>
                        First win
                      </em>
                    )}
                  </span>
                  <span className="lp-proc__bar">
                    <i style={{ width: `${p * (hours / 46) * 100}%` }} />
                  </span>
                  <b>{Math.round(p * hours)}h</b>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </>
  );
}

/* ---------- 2. Build ---------- */

const SHADOW = [
  ['PO 44821', 'Keller Hardware', 'Entered, matched to quote', 'ok'],
  ['PO 44822', 'Pine Ridge Co.', 'Entered, matched to quote', 'ok'],
  ['PO 44823', 'Marlow Tools', 'Price 6% over quote, sent to review', 'flag'],
  ['PO 44824', 'Eastside Supply', 'Entered, matched to quote', 'ok'],
  ['PO 44825', 'Keller Hardware', 'New ship-to address, sent to review', 'flag'],
] as const;

const GO_LIVE = ['Accuracy above the 98% bar', 'Order desk signed off', 'Runs inside NetSuite, every step logged'];

function BuildPanel() {
  const t = useClock();
  const replay = prog(t, 300, 2200);
  const rowAt = (i: number) => 1500 + i * 850;
  const checkAt = (i: number) => 6200 + i * 450;
  const liveAt = checkAt(GO_LIVE.length) + 150;

  return (
    <>
      <PanelHead title="Build" sub="Order entry agent, Alder Supply" />
      <div className="lp-proc__grid lp-proc__grid--build">
        <Card n={1} title="Replay past orders" aside={replay < 1 ? 'Running' : 'Complete'} className="lp-proc__a">
          <div className="lp-proc__stats">
            <div>
              <small>Order emails replayed</small>
              <b>{Math.round(replay * 1240).toLocaleString('en-US')}</b>
            </div>
            <div>
              <small>Entered exactly right</small>
              <b>{(replay * 98.6).toFixed(1)}%</b>
            </div>
            <div>
              <small>Sent to a person</small>
              <b>{Math.round(replay * 17)}</b>
            </div>
          </div>
          <span className="lp-proc__meter" aria-hidden>
            <i style={{ width: `${replay * 100}%` }} />
          </span>
        </Card>
        <Card n={2} title="Run in shadow mode" aside="Live orders, no posting" className="lp-proc__b">
          <ul className="lp-proc__list lp-proc__list--rows">
            {SHADOW.map(([po, who, what, state], i) => {
              const shown = t >= rowAt(i);
              const done = t >= rowAt(i) + 600;
              return (
                <li key={po} className="lp-anim" data-on={shown} data-state={done ? state : 'busy'}>
                  <b className="lp-proc__po">{po}</b>
                  <span className="lp-proc__grow">
                    {who}
                    <small>{done ? what : 'Reading the email…'}</small>
                  </span>
                  {!done ? (
                    <Spinner />
                  ) : state === 'ok' ? (
                    <span className="lp-proc__ok lp-proc__pop">
                      <Check />
                    </span>
                  ) : (
                    <span className="lp-proc__flag lp-proc__pop">Review</span>
                  )}
                </li>
              );
            })}
          </ul>
        </Card>
        <Card n={3} title="Go live" className="lp-proc__c">
          <ul className="lp-proc__checklist">
            {GO_LIVE.map((c, i) => (
              <li key={c} data-on={t >= checkAt(i)}>
                <span className="lp-proc__box">{t >= checkAt(i) && <Check />}</span>
                {c}
              </li>
            ))}
          </ul>
          <span className="lp-proc__live lp-anim" data-on={t >= liveAt}>
            Live
          </span>
        </Card>
      </div>
    </>
  );
}

/* ---------- 3. Compound ---------- */

const HOURS = [0, 12, 38, 61, 74, 96, 118, 131, 152, 170, 188, 205];

const ROADMAP = [
  ['Order desk', 'Live', 2],
  ['Customer service', 'Live', 3],
  ['Accounts payable', 'Building', 1],
  ['Sales follow-ups', 'Discovery', 0],
] as const;

function CompoundPanel() {
  const t = useClock();
  const barAt = (i: number) => 400 + i * 260;
  const agents = Math.max(1, Math.round(prog(t, 300, 3000) * 5));
  const rowAt = (i: number) => 3900 + i * 550;
  const hours = HOURS.filter((_, i) => t >= barAt(i)).at(-1) ?? 0;

  return (
    <>
      <PanelHead title="Compound" sub="The same team, workflow after workflow" />
      <div className="lp-proc__grid lp-proc__grid--compound">
        <Card title="Agents in production" className="lp-proc__a">
          <p className="lp-proc__big">{agents}</p>
          <small className="lp-proc__muted">across 2 teams, 1 more in build</small>
        </Card>
        <Card title="Hours returned to your team" aside={`${hours} h this month`} className="lp-proc__b">
          <div className="lp-proc__chart" aria-hidden>
            {HOURS.map((h, i) => (
              <span key={i}>
                <i style={{ height: t >= barAt(i) ? `max(3px, ${(h / 205) * 100}%)` : '0%', opacity: 0.35 + (h / 205) * 0.65 }} />
                <small>{i + 1}</small>
              </span>
            ))}
          </div>
        </Card>
        <Card title="Workflow after workflow" aside="Roadmap" className="lp-proc__c">
          <ul className="lp-proc__list lp-proc__list--rows">
            {ROADMAP.map(([team, status, n], i) => (
              <Appear key={team} as="li" t={t} at={rowAt(i)}>
                <span className="lp-proc__grow">
                  {team}
                  <small>{n ? `${n} agent${n > 1 ? 's' : ''}` : 'Mapping the work'}</small>
                </span>
                <span className="lp-proc__status" data-status={status.toLowerCase()}>
                  {status}
                </span>
              </Appear>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
