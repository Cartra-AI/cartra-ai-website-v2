'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/*
 * What's inside Cartra OS: four parts on the left, an animated panel for the
 * active part on the right. Same behavior as the homepage process section:
 * advances on its own while in view, pauses on hover, can be picked by click,
 * and shows each panel's finished state for reduced motion. Sample data for a
 * fictional distributor.
 */

const STEP_MS = 10000;

const PARTS = [
  {
    id: 'together',
    name: 'Work side by side',
    body: 'Message an agent the way you would a coworker. Hand it work, review what it did, and pick up where it left off.',
  },
  {
    id: 'context',
    name: 'Context in one place',
    body: 'Your SOPs, price lists, customer notes, and past decisions live in one knowledge base that people and agents share.',
  },
  {
    id: 'exceptions',
    name: 'Exceptions come to you',
    body: 'Agents handle the routine and send the rest to the right person, with the evidence attached and the options laid out.',
  },
  {
    id: 'apps',
    name: 'Apps on request',
    body: 'Ask for a dashboard, tracker, or report. An agent builds it on your live data and shares it with your team.',
  },
];

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  return reduce;
}

/** Milliseconds since the panel mounted; jumps to the end for reduced motion. */
function useClock() {
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
      if (v > STEP_MS) window.clearInterval(id);
    }, 50);
    return () => window.clearInterval(id);
  }, [reduce]);
  return t;
}

const ease = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);

function On({ t, at, children, className = '', as: Tag = 'div' }: { t: number; at: number; children: ReactNode; className?: string; as?: 'div' | 'li' | 'p' | 'span' }) {
  return (
    <Tag className={`lp-anim ${className}`.trim()} data-on={t >= at}>
      {children}
    </Tag>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="lp-os-f__check">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Working({ label = 'Working' }: { label?: string }) {
  return (
    <span className="lp-os-f__working">
      <i />
      <i />
      <i />
      {label}
    </span>
  );
}

function Head({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="lp-os-f__head">
      <div>
        <p className="lp-os-f__title">{title}</p>
        <p className="lp-os-f__sub">{sub}</p>
      </div>
      <p className="lp-os-f__note">Illustrative, sample data</p>
    </div>
  );
}

/* ---------- 1. Work side by side ---------- */

function TogetherPanel() {
  const t = useClock();
  return (
    <>
      <Head title="# sales-desk" sub="Dana Reyes and Quoting Agent" />
      <div className="lp-os-f__thread">
        <On t={t} at={300} className="lp-os-f__msg">
          <b>Dana Reyes</b>
          <p>
            <span className="lp-os-f__at">@Quoting Agent</span> can you price the Keller Hardware request from this morning?
          </p>
        </On>
        {t >= 1300 && t < 3000 && <Working label="Quoting Agent is working" />}
        <On t={t} at={3000} className="lp-os-f__msg lp-os-f__msg--agent">
          <b>Quoting Agent</b>
          <p>Done. Three lines priced on Keller&apos;s contract rates, $18,420 in total.</p>
          <div className="lp-os-f__attach">
            <span>Quote Q-1190 · Keller Hardware</span>
            <small>3 lines · $18,420 · draft</small>
          </div>
          <p>Send it to their buyer?</p>
        </On>
        <On t={t} at={5200} className="lp-os-f__msg">
          <b>Dana Reyes</b>
          <p>Yes, send it. Copy me.</p>
        </On>
        {t >= 6000 && t < 7200 && <Working label="Quoting Agent is working" />}
        <On t={t} at={7200} className="lp-os-f__msg lp-os-f__msg--agent">
          <b>Quoting Agent</b>
          <p className="lp-os-f__done">
            <Check />
            Sent to Keller Hardware at 9:14, you&apos;re copied.
          </p>
        </On>
      </div>
    </>
  );
}

/* ---------- 2. Context in one place ---------- */

const SOURCES = [
  ['Order desk SOPs', '14 docs'],
  ['Price lists', '3 files'],
  ['Customer terms', '212 accounts'],
  ['Past decisions', '1,480 entries'],
];

function ContextPanel() {
  const t = useClock();
  const synced = SOURCES.filter((_, i) => t >= 400 + i * 450 + 500).length;
  return (
    <>
      <Head title="Knowledge" sub="Shared by people and agents" />
      <div className="lp-os-f__ctx">
        <ul className="lp-os-f__sources">
          {SOURCES.map(([name, size], i) => {
            const at = 400 + i * 450;
            const done = t >= at + 500;
            return (
              <li key={name} className="lp-anim" data-on={t >= at}>
                <span>
                  <b>{name}</b>
                  <small>{size}</small>
                </span>
                {done ? (
                  <span className="lp-os-f__ok">
                    <Check />
                    Synced
                  </span>
                ) : (
                  <Working label="Syncing" />
                )}
              </li>
            );
          })}
          <li className="lp-os-f__count">
            {synced} of {SOURCES.length} sources up to date
          </li>
        </ul>
        <div className="lp-os-f__qa">
          <On t={t} at={2900} className="lp-os-f__msg">
            <b>Marcus, customer service</b>
            <p>What&apos;s the return window for Keller Hardware?</p>
          </On>
          {t >= 3700 && t < 4900 && <Working label="Agent is checking" />}
          <On t={t} at={4900} className="lp-os-f__msg lp-os-f__msg--agent">
            <b>Service Agent</b>
            <p>60 days on stocked items, 15 on special orders, with a 10% restocking fee.</p>
            <span className="lp-os-f__cite">Customer terms · Keller Hardware.pdf, p. 2</span>
          </On>
          <On t={t} at={7000} className="lp-os-f__learned">
            <span>Memory</span>
            Keller asked about returns twice this month. Noted on the account.
          </On>
        </div>
      </div>
    </>
  );
}

/* ---------- 3. Exceptions come to you ---------- */

const QUEUE = [
  ['PO 44823', 'Price 6% over quote', 'Dana, order desk'],
  ['Invoice 9921', 'Freight charge not on the PO', 'Leo, AP'],
  ['Return R-208', 'Outside the return window', 'Marcus, service'],
];

function ExceptionsPanel() {
  const t = useClock();
  const handled = Math.round(ease((t - 200) / 2600) * 41);
  const pickAt = 4600;
  const resolvedAt = 6300;
  return (
    <>
      <Head title="Inbox" sub="Exceptions, routed to the right person" />
      <div className="lp-os-f__stats">
        <div>
          <small>Handled by agents today</small>
          <b>{handled}</b>
        </div>
        <div>
          <small>Need a person</small>
          <b>{t >= resolvedAt ? 2 : Math.min(3, QUEUE.filter((_, i) => t >= 1200 + i * 700).length)}</b>
        </div>
      </div>
      <ul className="lp-os-f__queue">
        {QUEUE.map(([id, why, who], i) => {
          const first = i === 0;
          const open = first && t >= 3200;
          const resolved = first && t >= resolvedAt;
          return (
            <li key={id} className="lp-anim" data-on={t >= 1200 + i * 700} data-open={open} data-resolved={resolved}>
              <div className="lp-os-f__qrow">
                <b>{id}</b>
                <span>{why}</span>
                <small>{resolved ? 'Resolved' : who}</small>
              </div>
              {open && !resolved && (
                <div className="lp-os-f__detail">
                  <p>
                    Quote Q-1182 says $12,400. The PO says $13,144. Nothing has been entered. Everything else on the order matches.
                  </p>
                  <div className="lp-os-f__btns">
                    <span>Accept price</span>
                    <span data-press={t >= pickAt}>Ask the customer</span>
                  </div>
                </div>
              )}
              {resolved && (
                <p className="lp-os-f__done lp-os-f__done--row">
                  <Check />
                  Dana chose &ldquo;Ask the customer&rdquo;. The agent emailed Marlow Tools.
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

/* ---------- 4. Apps on request ---------- */

const REPS = [
  ['Ana Kim', 34],
  ['Leo Park', 27],
  ['Sam Ortiz', 19],
  ['Jo Wells', 12],
] as const;

function AppsPanel() {
  const t = useClock();
  const steps = [
    ['Reading open quotes in Salesforce', 1400],
    ['Building the dashboard', 2600],
    ['Sharing with the sales team', 3600],
  ] as const;
  const appAt = 4000;
  return (
    <>
      <Head title="Apps" sub="Built by an agent on live data" />
      <On t={t} at={200} className="lp-os-f__msg">
        <b>Ana Kim, sales lead</b>
        <p>Build me a dashboard of open quotes by rep, refreshed every hour.</p>
      </On>
      <ul className="lp-os-f__steps">
        {steps.map(([label, doneAt], i) => (
          <li key={label} className="lp-anim" data-on={t >= 700 + i * 900}>
            {t >= doneAt ? <Check /> : <span className="lp-os-f__spin" />}
            {label}
          </li>
        ))}
      </ul>
      <On t={t} at={appAt} className="lp-os-f__app">
        <div className="lp-os-f__app-bar">
          <b>Open quotes by rep</b>
          <small>Updated hourly · Sales team</small>
        </div>
        <ul className="lp-os-f__chart">
          {REPS.map(([rep, n], i) => {
            const p = ease((t - appAt - 300 - i * 150) / 900);
            return (
              <li key={rep}>
                <span>{rep}</span>
                <span className="lp-os-f__track">
                  <i style={{ width: `${p * (n / 34) * 100}%` }} />
                </span>
                <b>{Math.round(p * n)}</b>
              </li>
            );
          })}
        </ul>
      </On>
    </>
  );
}

export default function OsFeatures() {
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
    const id = window.setTimeout(() => setActive((a) => (a + 1) % PARTS.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [running, active]);

  return (
    <section id="inside" ref={ref} className="lp-section lp-anchor lp-dark" aria-labelledby="inside-title">
      <div className="lp-wrap">
        <p className="lp-tag">Inside Cartra OS</p>
        <h2 id="inside-title" className="lp-statement mt-3 max-w-[22ch]">
          Where your team and your agents get work done
        </h2>

        <div className="lp-proc mt-10 lg:mt-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <ol className="lp-proc__steps">
            {PARTS.map((s, i) => (
              <li key={s.id} data-active={i === active}>
                <button
                  type="button"
                  className="lp-proc__step"
                  aria-current={i === active ? 'step' : undefined}
                  aria-controls="lp-os-panel"
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

          <div id="lp-os-panel" className="lp-proc__panel">
            <div key={PARTS[active]!.id} className="lp-proc__frame lp-os-f">
              {active === 0 && <TogetherPanel />}
              {active === 1 && <ContextPanel />}
              {active === 2 && <ExceptionsPanel />}
              {active === 3 && <AppsPanel />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
