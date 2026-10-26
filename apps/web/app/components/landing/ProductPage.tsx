import type { CSSProperties } from 'react';
import JsonLd from '../JsonLd';
import LandingNav from './LandingNav';
import { VoiceMockup, AgentsMockup, BrainMockup } from './Mockups';
import { Arrow, CallButton, Reveal } from './primitives';
import { ClosingSection, FaqSection, LogoGrid, StoryCard } from './sections';
import { PILLARS } from './content';
import { PRODUCTS, PRODUCT_ORDER, type Product, type ProductId } from '../../content/products';
import { createBreadcrumbJsonLd, createServiceJsonLd } from '../../lib/seo';

/*
 * One template for /voice, /agents and /brain. The showcase card is the
 * homepage pillar card (same copy, gradient and live mockup), so the product
 * page reads as the expanded version of what the homepage introduced.
 */

const MOCKUPS: Record<ProductId, () => React.JSX.Element> = {
  voice: VoiceMockup,
  agents: AgentsMockup,
  brain: BrainMockup,
};

const CARD_CTA = { light: 'ink', ink: 'signal', signal: 'light' } as const;

export default function ProductPage({ product }: { product: Product }) {
  const pillar = PILLARS.find((p) => p.id === product.id)!;
  const Mock = MOCKUPS[product.id];
  const [lead, accent] = product.headline;
  const others = PRODUCT_ORDER.filter((id) => id !== product.id).map((id) => PRODUCTS[id]);
  const short = product.name.replace('Cartra ', '');

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: product.name, path: product.path },
        ])}
      />
      <JsonLd
        data={createServiceJsonLd({
          name: product.name,
          description: product.seoDescription,
          serviceType: product.kicker,
          path: product.path,
          category: product.kicker,
        })}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: product.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      <LandingNav />

      <main>
        {/* ───────── Hero ───────── */}
        <section className="lp-product-hero" aria-labelledby="product-title">
          <div className="lp-wrap">
            <div className="flex flex-wrap items-center gap-3 lp-hero-in" style={{ '--d': '40ms' } as CSSProperties}>
              <span className="lp-tag lp-tag--muted">{product.name}</span>
              <span className="lp-mono" style={{ color: 'var(--lp-muted)' }}>
                {product.kicker}
              </span>
            </div>
            <h1 id="product-title" className="lp-display lp-h1 mt-8 lp-hero-in" style={{ '--d': '80ms' } as CSSProperties}>
              <span className="block">{lead}</span>
              <span className="lp-accent block">{accent}</span>
            </h1>
            <div
              className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,40rem)_auto] lg:justify-between lg:items-end lp-hero-in"
              style={{ '--d': '200ms' } as CSSProperties}
            >
              <p className="lp-lede">{product.lede}</p>
              <div className="flex flex-wrap gap-2">
                <CallButton location={`product_${product.id}_hero`}>{`Talk to us about ${short}`}</CallButton>
                <a href="#how-it-works" className="lp-btn lp-btn--line">
                  How it works
                  <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Showcase: the homepage pillar card ───────── */}
        <section className="lp-wrap" aria-label={`${product.name} in action`}>
          <Reveal>
            <article id={product.id} className={`lp-card lp-card--${pillar.tone} lp-card--static`}>
              <div className="flex flex-col">
                <span className="lp-tag self-start">What it handles</span>
                <h2 className="lp-display lp-h3 mt-6 max-w-[17ch]">{pillar.title}</h2>
                <ul className="lp-caps mt-6">
                  {pillar.capabilities.map((c, ci) => (
                    <li key={c}>
                      <span
                        className={`lp-glyph ${ci % 2 ? 'lp-glyph--square' : 'lp-glyph--circle'}`}
                        style={{ color: pillar.tone === 'signal' ? '#fff' : 'var(--lp-glow)' }}
                        aria-hidden
                      />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 lg:mt-auto lg:pt-7">
                  <CallButton variant={CARD_CTA[pillar.tone]} location={`product_${product.id}_card`}>
                    Book a call
                  </CallButton>
                </div>
              </div>
              <Mock />
            </article>
          </Reveal>
        </section>

        {/* ───────── Approach: platform + built for you ───────── */}
        {product.approach && (
          <section className="lp-section" aria-labelledby="approach-title">
            <div className="lp-wrap">
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
                <Reveal>
                  <span className="lp-tag lp-tag--muted">How we work</span>
                  <h2 id="approach-title" className="lp-display lp-h2 mt-6 max-w-[15ch]">
                    {product.approach.title}
                  </h2>
                </Reveal>
                <Reveal delay={100}>
                  <p className="lp-lede max-w-[34rem] lg:ml-auto">{product.approach.body}</p>
                </Reveal>
              </div>
              <div className="lp-approach mt-12 lg:mt-16">
                {[product.approach.platform, product.approach.bespoke].map((col, i) => (
                  <Reveal key={col.label} delay={i * 100} className="grid">
                    <div className={`lp-approach__col lp-approach__col--${i === 0 ? 'platform' : 'bespoke'} lp-approach__col--${product.id}`}>
                      <span className="lp-mono lp-approach__label">{col.label}</span>
                      <ul className="lp-caps mt-6">
                        {col.points.map((pt, pi) => (
                          <li key={pt}>
                            <span
                              className={`lp-glyph ${pi % 2 ? 'lp-glyph--square' : 'lp-glyph--circle'}`}
                              style={{ color: 'var(--lp-accent-text)' }}
                              aria-hidden
                            />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
                <span className="lp-approach__plus" aria-hidden>+</span>
              </div>
            </div>
          </section>
        )}

        {/* ───────── Features ───────── */}
        <section className="lp-section" style={product.approach ? { paddingTop: 0 } : undefined} aria-labelledby="features-title">
          <div className="lp-wrap">
            <Reveal>
              <span className="lp-tag lp-tag--muted">What it does</span>
              <h2 id="features-title" className="lp-display lp-h2 mt-6 max-w-[16ch]">
                What it does, day to day.
              </h2>
            </Reveal>
            <div className="lp-features mt-12 lg:mt-16">
              {product.features.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 80} className="grid">
                  <div className="lp-feature">
                    <h3 className="lp-h4">{f.title}</h3>
                    <p className="lp-small mt-3">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── How it works ───────── */}
        <section id="how-it-works" className="lp-section lp-anchor" style={{ paddingTop: 0 }} aria-labelledby="steps-title">
          <div className="lp-wrap">
            <Reveal>
              <span className="lp-tag lp-tag--muted">How it works</span>
              <h2 id="steps-title" className="lp-display lp-h2 mt-6 max-w-[16ch]">
                {product.stepsTitle ?? 'Live on real work, quickly.'}
              </h2>
            </Reveal>
            <ol className="lp-product-steps mt-12 lg:mt-16">
              {product.steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 100} className="grid">
                  <li className="lp-product-step">
                    <span className="lp-mono" style={{ color: 'var(--lp-accent-text)' }}>{`Step ${i + 1}`}</span>
                    <h3 className="lp-h4 mt-5">{s.title}</h3>
                    <p className="lp-small mt-3">{s.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── Stories ───────── */}
        <section id="results" className="lp-section lp-anchor" style={{ paddingTop: 0 }} aria-labelledby="stories-title">
          <div className="lp-wrap">
            <Reveal>
              <span className="lp-tag lp-tag--muted">In the field</span>
              <h2 id="stories-title" className="lp-display lp-h2 mt-6 max-w-[18ch]">
                Built for companies like yours.
              </h2>
              {/* Disclosure: only needed when example companies are shown. */}
              {product.stories.some((s) => s.kind === 'example') && (
                <p className="lp-small mt-5 max-w-[36rem]">
                  {product.stories.some((s) => s.kind === 'case-study')
                    ? 'Cards with results are Cartra clients. The others show typical builds for companies like these.'
                    : 'Each card shows a typical build for a company like this.'}
                </p>
              )}
            </Reveal>
            <div
              className={`lp-stories mt-12 lg:mt-16 ${
                product.stories.length === 1 ? 'lp-stories--one' : product.stories.length === 2 ? 'lp-stories--two' : ''
              }`}
            >
              {product.stories.map((s, i) => (
                <Reveal key={s.title} delay={i * 80} className="grid">
                  <StoryCard story={s} roomy={product.stories.length <= 2} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Integrations ───────── */}
        <section className="lp-section" style={{ paddingTop: 0 }} aria-labelledby="works-with-title">
          <div className="lp-wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <span className="lp-tag lp-tag--muted">Works with</span>
              <h2 id="works-with-title" className="lp-display lp-h2 mt-6 max-w-[12ch]">
                The tools you already run.
              </h2>
              <p className="lp-lede mt-6 max-w-[30rem]">
                Connected to your systems with your existing permissions. Where there&apos;s no integration, it can use the
                software the way a person would.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <LogoGrid logos={product.integrations} more="and your custom tools" label="Common integrations" />
            </Reveal>
          </div>
        </section>

        {/* ───────── The other products ───────── */}
        <section className="lp-section" style={{ paddingTop: 0 }} aria-labelledby="together-title">
          <div className="lp-wrap">
            <Reveal>
              <h2 id="together-title" className="lp-display lp-h3 max-w-[22ch]">
                Even better together.
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-2 md:grid-cols-2">
              {others.map((o, i) => (
                <Reveal key={o.id} delay={i * 80} className="grid">
                  <a href={o.path} className={`lp-tile lp-tile--${o.id} lp-round-xl`}>
                    <span className="lp-tile__label">
                      {o.name}
                      <Arrow />
                    </span>
                    <span className="lp-tile__meta">{o.kicker}</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FaqSection faqs={product.faqs} />

        <ClosingSection
          title={`See what ${product.name} could do for your business.`}
          body="A short conversation with our team to find where it would make the biggest difference first."
          location={`product_${product.id}_closing`}
        />
      </main>
    </>
  );
}
