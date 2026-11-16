'use client';

import { useLoopClock } from '../landing/useLoopClock';

/*
 * Hero animation for /os: one loop of a morning in Cartra OS. Agents post
 * finished work to the feed; one order is off, so the agent stops and sends
 * it to a person's inbox with the evidence; she decides; the agent carries on
 * and saves the decision as context for next time. Sample data for a
 * fictional distributor.
 */

const LOOP = 17000;

type Row = { at: number; agent: string; text: string; doneAt?: number; flagAt?: number };

const ROWS: Row[] = [
  { at: 500, agent: 'Quoting Agent', text: 'Priced 12 quote requests from the sales inbox', doneAt: 1300 },
  { at: 1500, agent: 'Order Entry Agent', text: 'Entered PO 44821 into NetSuite', doneAt: 2300 },
  { at: 2600, agent: 'Order Entry Agent', text: 'PO 44823 from Marlow Tools is 6% over the quote', flagAt: 3400 },
  { at: 9000, agent: 'Order Entry Agent', text: 'Emailed Marlow Tools to confirm the new price', doneAt: 10600 },
];

const NAV = ['Home', 'Inbox', 'Agents', 'Knowledge', 'Apps'];

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="lp-os-ws__icon">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function OsWorkspace() {
  // Still frame (reduced motion): the decision made and saved.
  const { ref, t } = useLoopClock<HTMLDivElement>(LOOP, 12500, 60);

  const askAt = 3900;
  const pressAt = 7000;
  const decidedAt = 7600;
  const memoryAt = 11400;
  const inboxCount = t >= askAt && t < decidedAt ? 1 : 0;
  const working = ROWS.filter((r) => t >= r.at && !(r.doneAt && t >= r.doneAt) && !(r.flagAt && t >= r.flagAt)).length;

  return (
    <div ref={ref} className="lp-os-ws" aria-hidden>
      <div className="lp-os-ws__bar">
        <span className="lp-os-ws__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="lp-os-ws__title">Cartra OS · Alder Supply</span>
        <span className="lp-os-ws__note">Illustrative, sample data</span>
      </div>

      <div className="lp-os-ws__body">
        <nav className="lp-os-ws__nav">
          {NAV.map((n) => (
            <span key={n} data-active={n === 'Home'}>
              {n}
              {n === 'Inbox' && inboxCount > 0 && <b className="lp-os-ws__badge">{inboxCount}</b>}
            </span>
          ))}
        </nav>

        <div className="lp-os-ws__feed">
          <div className="lp-os-ws__head">
            <p>Today</p>
            <span className="lp-os-ws__live" data-on={working > 0}>
              {working > 0 ? `${working} agent${working > 1 ? 's' : ''} working` : 'All caught up'}
            </span>
          </div>
          <ul>
            {ROWS.map((r) => {
              const state = r.flagAt && t >= r.flagAt ? (t >= decidedAt ? 'resolved' : 'flag') : r.doneAt && t >= r.doneAt ? 'done' : 'busy';
              return (
                <li key={r.text} className="lp-anim" data-on={t >= r.at} data-state={state}>
                  <span className="lp-os-ws__agent">{r.agent}</span>
                  <span className="lp-os-ws__text">{r.text}</span>
                  <span className="lp-os-ws__state">
                    {state === 'busy' && (
                      <>
                        <span className="lp-os-ws__pulse" />
                        Working
                      </>
                    )}
                    {state === 'done' && (
                      <>
                        <Check />
                        Done
                      </>
                    )}
                    {state === 'flag' && 'Sent to Dana'}
                    {state === 'resolved' && (
                      <>
                        <Check />
                        Dana decided
                      </>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="lp-os-ws__memory lp-anim" data-on={t >= memoryAt}>
            <span>Saved to Knowledge</span>
            Price changes from Marlow Tools go back to the customer before entry.
          </p>
        </div>

        <aside className="lp-os-ws__inbox">
          <p className="lp-os-ws__label">Inbox · Dana Reyes</p>
          {t < askAt && <p className="lp-os-ws__empty">Nothing needs you right now.</p>}
          <div className="lp-os-ws__ask lp-anim" data-on={t >= askAt} data-done={t >= decidedAt}>
            <p className="lp-os-ws__from">Order Entry Agent needs a decision</p>
            <p className="lp-os-ws__q">PO 44823 is 6% over quote Q-1182. I have not entered it.</p>
            <dl>
              <div>
                <dt>Quoted</dt>
                <dd>$12,400</dd>
              </div>
              <div>
                <dt>On the PO</dt>
                <dd>$13,144</dd>
              </div>
            </dl>
            <p className="lp-os-ws__files">Quote Q-1182.pdf · PO 44823.pdf</p>
            {t < decidedAt ? (
              <div className="lp-os-ws__actions">
                <span>Accept price</span>
                <span data-press={t >= pressAt}>Ask the customer</span>
              </div>
            ) : (
              <p className="lp-os-ws__decided">
                <Check />
                Ask the customer · Dana, 9:14
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
