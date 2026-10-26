import LineArt from './LineArt';
import { Arrow, CallTile, Reveal } from './primitives';
import type { ProductLogo, ProductStory } from '../../content/products';

/* Sections shared by the homepage and the product pages. */

/** Integration chips: icon and name, or a wordmark alone, ending in a dashed "more" chip. */
export function LogoGrid({
  logos,
  more,
  label,
  className = '',
}: {
  logos: ProductLogo[];
  more: string;
  /** Accessible name for the list. */
  label: string;
  className?: string;
}) {
  return (
    <ul className={`lp-logo-grid ${className}`.trim()} aria-label={label}>
      {logos.map((l) => (
        <li key={l.slug} className="lp-logo">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG logos, no optimization needed */}
          <img
            src={`/integrations/${l.slug}.${l.ext ?? 'svg'}`}
            alt={l.wordmark ? l.name : ''}
            className={`lp-logo__mark ${l.wordmark ? 'lp-logo__mark--word' : ''}`}
          />
          {!l.wordmark && <span>{l.name}</span>}
        </li>
      ))}
      <li className="lp-logo lp-logo--more">{more}</li>
    </ul>
  );
}

/** One client story or typical build. `roomy` sets the body at full size (one or two cards). */
export function StoryCard({ story, roomy = false }: { story: ProductStory; roomy?: boolean }) {
  return (
    <article className={`lp-story lp-story--${story.kind}`}>
      <span className="lp-mono lp-story__kind">{story.industry}</span>
      <h3 className="lp-h4 mt-5">{story.title}</h3>
      {story.agents && (
        <ul className="lp-story__agents" aria-label="Agents built">
          {story.agents.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      )}
      <p className={roomy ? 'lp-body mt-4' : 'lp-small mt-3'}>{story.body}</p>
      {story.link && (
        <a href={story.link.href} className="lp-link lp-story__link">
          {story.link.label}
          <Arrow />
        </a>
      )}
      {story.results && (
        <ul className="lp-story__results">
          {story.results.map((r) => (
            <li key={r}>
              {r.split(/(\d[\d,./]*\d\+?%?|\d\+?%?)/).map((part, pi) =>
                pi % 2 ? (
                  <span key={pi} className="lp-story__num">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function FaqSection({ faqs, title = 'Frequently asked questions.' }: { faqs: Array<{ q: string; a: string }>; title?: string }) {
  return (
    <section id="faq" className="lp-section lp-anchor" aria-labelledby="faq-title">
      <div className="lp-wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 self-start">
          <h2 id="faq-title" className="lp-display lp-h2 max-w-[11ch]">
            {title}
          </h2>
          <p className="lp-lede mt-6 max-w-[26rem]">
            Anything else? Email{' '}
            <a href="mailto:team@cartra.ai" className="underline underline-offset-4" style={{ color: 'var(--lp-text)' }}>
              team@cartra.ai
            </a>{' '}
            or book a call.
          </p>
        </Reveal>
        <Reveal delay={100} className="lp-faq">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>
                {f.q}
                <span className="lp-faq__icon" aria-hidden />
              </summary>
              <p className="lp-body lp-faq__a">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function ClosingSection({
  title,
  body,
  location,
  cta = { label: 'Book a discovery call', meta: 'Schedule discovery' },
}: {
  title: string;
  body: string;
  /** Analytics location for the call tile. */
  location: string;
  /** Label for the call tile, to match the page. */
  cta?: { label: string; meta: string };
}) {
  return (
    <section className="lp-section" style={{ paddingTop: 0 }} aria-labelledby="closing-title">
      <div className="lp-wrap">
        <div className="grid gap-2 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div
              className="relative h-full overflow-hidden p-[clamp(1.5rem,4vw,3.5rem)] lp-on-ink lp-round-xl"
              style={{ minHeight: '26rem', isolation: 'isolate' }}
            >
              <div className="lp-step__art" style={{ color: 'var(--lp-on-ink)' }}>
                <LineArt variant="sweep" opacity={0.12} accent={13} />
              </div>
              <span className="lp-tag lp-tag--muted">Get started</span>
              <h2 id="closing-title" className="lp-display lp-h2 mt-8 max-w-[15ch]">
                {title}
              </h2>
              <p className="lp-lede mt-6 max-w-[32rem]">{body}</p>
            </div>
          </Reveal>
          <div className="grid gap-2">
            <Reveal delay={80} className="grid">
              <CallTile label={cta.label} meta={cta.meta} location={location} className="lp-round-xl" />
            </Reveal>
            <Reveal delay={160} className="grid">
              <a href="mailto:team@cartra.ai" className="lp-tile lp-tile--ink lp-round-xl">
                <span className="lp-tile__label">
                  Email the team
                  <Arrow />
                </span>
                <span className="lp-tile__meta">team@cartra.ai</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
