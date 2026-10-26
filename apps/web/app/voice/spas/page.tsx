import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import LandingNav from '../../components/landing/LandingNav';
import VoiceCall from '../../components/landing/VoiceCall';
import { Arrow, CallButton, Reveal } from '../../components/landing/primitives';
import { ClosingSection, FaqSection, LogoGrid, StoryCard } from '../../components/landing/sections';
import { SPAS, SPA_CALL } from '../../content/voice-spas';
import { createBreadcrumbJsonLd, createPageMetadata, createServiceJsonLd } from '../../lib/seo';

/*
 * Cartra Voice for spas and wellness. Same grammar as the product pages
 * (ProductPage.tsx), with the sections a spa owner needs: the problem, the
 * real client stories, how it books, and languages. One conversion path: every
 * button opens the consultation form, which records /voice/spas as the source.
 */

export const metadata: Metadata = createPageMetadata({
  title: SPAS.seoTitle,
  description: SPAS.seoDescription,
  path: SPAS.path,
});

const CTA = 'Book a call about your spa';

export default function Page() {
  const [lead, accent] = SPAS.headline;
  const [problemLead, problemAccent] = SPAS.problem.title;

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Cartra Voice', path: '/voice' },
          { name: 'Spas and wellness', path: SPAS.path },
        ])}
      />
      <JsonLd
        data={createServiceJsonLd({
          name: 'Cartra Voice for spas and wellness',
          description: SPAS.seoDescription,
          serviceType: 'AI voice agents',
          path: SPAS.path,
          category: 'AI voice agents',
        })}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: SPAS.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      <LandingNav />

      <main>
        {/* ───────── Hero ───────── */}
        <section className="lp-product-hero" aria-labelledby="spas-title">
          <div className="lp-wrap">
            <div className="flex flex-wrap items-center gap-3 lp-hero-in" style={{ '--d': '40ms' } as CSSProperties}>
              <a href="/voice" className="lp-tag lp-tag--muted lp-tag--link">
                Cartra Voice
              </a>
              <span className="lp-mono" style={{ color: 'var(--lp-muted)' }}>
                For spas and wellness
              </span>
            </div>
            <h1 id="spas-title" className="lp-display lp-h1 mt-8 lp-hero-in" style={{ '--d': '80ms' } as CSSProperties}>
              <span className="block">{lead}</span>
              <span className="lp-accent block">{accent}</span>
            </h1>
            <div
              className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,40rem)_auto] lg:justify-between lg:items-end lp-hero-in"
              style={{ '--d': '200ms' } as CSSProperties}
            >
              <p className="lp-lede">{SPAS.lede}</p>
              <div className="flex flex-wrap gap-2">
                <CallButton location="voice_spas_hero">{CTA}</CallButton>
                <a href="#how-it-books" className="lp-btn lp-btn--line">
                  See how it books
                  <Arrow />
                </a>
              </div>
            </div>
            <div className="mt-10 lp-hero-in" style={{ '--d': '260ms' } as CSSProperties}>
              <p className="lp-mono" style={{ color: 'var(--lp-muted)' }}>
                Books into
              </p>
              <LogoGrid
                logos={SPAS.bookingLogos}
                more="and more"
                label="Booking systems and calendars it books into"
                className="lp-logo-grid--sm mt-3"
              />
            </div>
            <a href="#results" className="lp-proof lp-hero-in" style={{ '--d': '320ms' } as CSSProperties}>
              <span>{SPAS.proof}</span>
              <Arrow />
            </a>
          </div>
        </section>

        {/* ───────── Showcase: a spa call ───────── */}
        <section className="lp-wrap" aria-label="Cartra Voice at a spa">
          <Reveal>
            <article id="voice" className="lp-card lp-card--light lp-card--static">
              <div className="flex flex-col">
                <span className="lp-tag self-start">What it handles</span>
                <h2 className="lp-display lp-h3 mt-6 max-w-[17ch]">{SPAS.showcase.title}</h2>
                <ul className="lp-caps mt-6">
                  {SPAS.showcase.capabilities.map((c, ci) => (
                    <li key={c}>
                      <span
                        className={`lp-glyph ${ci % 2 ? 'lp-glyph--square' : 'lp-glyph--circle'}`}
                        style={{ color: 'var(--lp-glow)' }}
                        aria-hidden
                      />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 lg:mt-auto lg:pt-7">
                  <CallButton variant="ink" location="voice_spas_card">
                    Book a call
                  </CallButton>
                </div>
              </div>
              <VoiceCall script={SPA_CALL} />
            </article>
          </Reveal>
        </section>

        {/* ───────── The problem ───────── */}
        <section className="lp-section" aria-labelledby="problem-title">
          <div className="lp-wrap">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end mb-12 lg:mb-16">
              <Reveal>
                <span className="lp-tag lp-tag--muted">The problem</span>
                <h2 id="problem-title" className="lp-display lp-h2 mt-6">
                  <span className="block">{problemLead}</span> <span className="lp-accent block">{problemAccent}</span>
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="lp-lede max-w-[34rem] lg:ml-auto">{SPAS.problem.body}</p>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="lp-compare">
                <div className="lp-compare__col lp-compare__col--generic">
                  <p className="lp-compare__head">
                    <span className="lp-mono">Today</span>
                  </p>
                  {SPAS.problem.rows.map((row) => (
                    <p key={row.today} className="lp-compare__row">
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden className="lp-compare__mark">
                        <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                      {row.today}
                    </p>
                  ))}
                </div>
                <div className="lp-compare__col lp-compare__col--cartra">
                  <p className="lp-compare__head">
                    <span className="lp-mono">With Cartra Voice</span>
                  </p>
                  {SPAS.problem.rows.map((row) => (
                    <p key={row.voice} className="lp-compare__row">
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden className="lp-compare__mark">
                        <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {row.voice}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────── Client stories ───────── */}
        <section id="results" className="lp-section lp-anchor" style={{ paddingTop: 0 }} aria-labelledby="story-title">
          <div className="lp-wrap">
            <Reveal>
              <span className="lp-tag lp-tag--muted">In the field</span>
              <h2 id="story-title" className="lp-display lp-h2 mt-6 max-w-[18ch]">
                {SPAS.storyTitle}
              </h2>
            </Reveal>
            <div className="lp-stories mt-12 lg:mt-16">
              {SPAS.stories.map((s, i) => (
                <Reveal key={s.industry} delay={i * 80} className="grid">
                  <StoryCard story={s} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── How it books ───────── */}
        <section id="how-it-books" className="lp-section lp-anchor" style={{ paddingTop: 0 }} aria-labelledby="booking-title">
          <div className="lp-wrap">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
              <Reveal>
                <span className="lp-tag lp-tag--muted">How it books</span>
                <h2 id="booking-title" className="lp-display lp-h2 mt-6 max-w-[14ch]">
                  {SPAS.booking.title}
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="lp-lede max-w-[34rem] lg:ml-auto">{SPAS.booking.body}</p>
              </Reveal>
            </div>
            <div className="lp-booking mt-12 lg:mt-16">
              {SPAS.booking.systems.map((sys, i) => (
                <Reveal key={sys.name} delay={i * 80} className="grid">
                  <div className="lp-booking__panel">
                    {/* Decorative: the heading below names each system. */}
                    <ul className="lp-booking__logos" aria-hidden>
                      {sys.logos.map((l) => (
                        <li key={l.slug} className={`lp-booking__logo ${l.wordmark ? 'lp-booking__logo--word' : ''}`}>
                          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG logos, no optimization needed */}
                          <img src={`/integrations/${l.slug}.${l.ext ?? 'svg'}`} alt="" />
                        </li>
                      ))}
                    </ul>
                    <span className="lp-mono lp-booking__label mt-10">{sys.label}</span>
                    <h3 className="lp-display lp-booking__name mt-3">{sys.name}</h3>
                    <p className="lp-small mt-3">{sys.body}</p>
                    <div className="mt-auto pt-8">
                      <div className="lp-appt" role="img" aria-label={`Example booking: ${sys.example.service}, ${sys.example.when}`}>
                        <svg className="lp-check" viewBox="0 0 16 16" fill="none" aria-hidden>
                          <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
                        </svg>
                        <span className="lp-appt__service">{sys.example.service}</span>
                        <span className="lp-mono lp-appt__when">{sys.example.when}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Languages ───────── */}
        <section className="lp-band" aria-labelledby="languages-title">
          <div className="lp-band__dots" aria-hidden />
          <div className="lp-wrap py-[clamp(5rem,11vw,9rem)]">
            <Reveal>
              <span className="lp-tag">90+ languages</span>
              <h2 id="languages-title" className="lp-display lp-h2 mt-8 max-w-[20ch]">
                {SPAS.languages.title}
              </h2>
              <p className="lp-lede mt-6 max-w-[36rem]" style={{ color: 'var(--lp-on-signal-muted)' }}>
                {SPAS.languages.body}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="lp-hellos mt-12 lg:mt-16" aria-label="A few of the languages it speaks">
                {SPAS.languages.greetings.map((g) => (
                  <li key={g.lang} className="lp-hello">
                    <span lang={g.lang} className="lp-hello__text">
                      {g.text}
                    </span>
                    <span className="lp-mono lp-hello__name">{g.name}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ───────── Features ───────── */}
        <section className="lp-section" aria-labelledby="features-title">
          <div className="lp-wrap">
            <Reveal>
              <span className="lp-tag lp-tag--muted">What it does</span>
              <h2 id="features-title" className="lp-display lp-h2 mt-6 max-w-[16ch]">
                What it does, day to day.
              </h2>
            </Reveal>
            <div className="lp-features mt-12 lg:mt-16">
              {SPAS.features.map((f, i) => (
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

        {/* ───────── How we set it up ───────── */}
        <section className="lp-section" style={{ paddingTop: 0 }} aria-labelledby="steps-title">
          <div className="lp-wrap">
            <Reveal>
              <span className="lp-tag lp-tag--muted">How it works</span>
              <h2 id="steps-title" className="lp-display lp-h2 mt-6 max-w-[16ch]">
                Set up by our team, not yours.
              </h2>
            </Reveal>
            <ol className="lp-product-steps mt-12 lg:mt-16">
              {SPAS.steps.map((s, i) => (
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

        <FaqSection faqs={SPAS.faqs} />

        <ClosingSection
          title={SPAS.closing.title}
          body={SPAS.closing.body}
          location="voice_spas_closing"
          cta={{ label: CTA, meta: 'Free consultation' }}
        />
      </main>
    </>
  );
}
