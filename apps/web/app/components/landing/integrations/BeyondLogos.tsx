import { CallButton } from '../primitives';
import ComputerUseDemo from './ComputerUseDemo';

/*
 * Three cards under the logo rows answering "what if my system isn't
 * listed?": custom integrations, computer use for legacy systems, and the
 * long tail of apps. Computer use leads on phones.
 */

const API_CALLS: Array<[string, string, string]> = [
  ['GET', '/policies/{id}', '200'],
  ['POST', '/endorsements', '201'],
  ['SYNC', 'inventory.db → Brain', '15m'],
];

export default function BeyondLogos() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Custom integrations */}
      <article className="lp-beyond lp-beyond--light">
        <span className="lp-tag lp-tag--muted self-start">Custom</span>
        <div className="lp-beyond__visual">
          <div className="lp-api" role="img" aria-label="Example: calls to a company's own API and database">
            <div className="lp-api__head">
              <span>api.yourcompany.internal</span>
              <span className="lp-mock__live">Connected</span>
            </div>
            {API_CALLS.map(([verb, path, status]) => (
              <div key={path} className="lp-api__row">
                <span className="lp-api__verb">{verb}</span>
                <span className="truncate">{path}</span>
                <span className="lp-pill">{status}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="lp-h4">Custom integrations</h3>
          <p className="lp-small mt-2">
            No connector? We build one. Your APIs, databases, and internal tools, connected like everything else.
          </p>
        </div>
      </article>

      {/* Computer use */}
      <article className="lp-beyond lp-beyond--ink order-first md:order-none">
        <span className="lp-tag self-start" style={{ color: 'var(--lp-on-ink)' }}>
          Computer use
        </span>
        <div className="lp-beyond__visual">
          <ComputerUseDemo />
        </div>
        <div>
          <h3 className="lp-h4">Built for legacy systems</h3>
          <p className="lp-small mt-2">
            No API? No problem. Agents use older desktop apps and portals the way a person would: log in, click, type, and read
            the screen.
          </p>
        </div>
      </article>

      {/* The long tail */}
      <article className="lp-beyond lp-beyond--signal">
        <span className="lp-tag self-start">And more</span>
        <div className="lp-beyond__visual lp-beyond__visual--count">
          <p className="lp-display" style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)', lineHeight: 0.9 }}>
            1,500+
          </p>
          <p className="lp-mono mt-3" style={{ color: 'var(--lp-on-signal-muted)' }}>
            Apps ready to connect
          </p>
        </div>
        <div>
          <h3 className="lp-h4">And many more</h3>
          <p className="lp-small mt-2">If your team uses it, we can likely connect to it.</p>
          <div className="mt-5">
            <CallButton location="landing_integrations" variant="light" size="sm">
              Ask about your stack
            </CallButton>
          </div>
        </div>
      </article>
    </div>
  );
}
