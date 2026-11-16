import type { CSSProperties } from 'react';

/*
 * How work moves through Cartra OS, as four stages on one track. A signal
 * travels the track on a loop (CSS only) and each stage lights as it passes;
 * the last stage feeds back into the first. Static for reduced motion.
 */

const STAGES = [
  {
    name: 'Work arrives',
    body: 'Emails, calls, documents, and events from your systems land in Cartra OS.',
    tags: ['Email', 'Phone', 'Your systems', 'Schedules'],
  },
  {
    name: 'Agents do the work',
    body: 'Agents work in your software the way your team does, using your SOPs and context.',
    tags: ['Quotes', 'Orders', 'Updates', 'Replies'],
  },
  {
    name: 'People take the exceptions',
    body: 'Anything unclear or outside the rules goes to the right person, with the evidence and the options.',
    tags: ['Approvals', 'Judgment calls', 'Edge cases'],
  },
  {
    name: 'Decisions become context',
    body: 'Every decision and correction is saved, so the next case like it is handled without asking.',
    tags: ['Memory', 'Skills', 'Knowledge'],
  },
];

export default function OsFlow() {
  return (
    <section className="lp-section" aria-labelledby="flow-title">
      <div className="lp-wrap">
        <p className="lp-tag">How it works</p>
        <h2 id="flow-title" className="lp-statement mt-3 max-w-[24ch]">
          Agents do the routine. People make the calls. Everyone gets smarter.
        </h2>

        <ol className="lp-os-flow mt-10 lg:mt-14">
          <span className="lp-os-flow__track" aria-hidden>
            <span className="lp-os-flow__signal" />
          </span>
          {STAGES.map((s, i) => (
            <li key={s.name} style={{ '--i': i } as CSSProperties}>
              <span className="lp-os-flow__node" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="lp-os-flow__name">{s.name}</h3>
              <p className="lp-os-flow__body">{s.body}</p>
              <ul className="lp-os-flow__tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="lp-os-flow__loop">
          <span aria-hidden>↺</span> Then the loop starts again, a little smarter each time.
        </p>
      </div>
    </section>
  );
}
