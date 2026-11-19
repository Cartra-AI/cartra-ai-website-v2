import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import JsonLd from './components/JsonLd';
import { createPageMetadata } from './lib/seo';
import LandingNav from './components/landing/LandingNav';
import DotRipple from './components/landing/DotRipple';
import DotField from './components/landing/DotField';
import TypedText from './components/landing/TypedText';
import ProcessSection from './components/landing/ProcessSection';
import IndustriesSection from './components/landing/IndustriesSection';
import LogoMarquee from './components/landing/integrations/LogoMarquee';
import BeyondLogos from './components/landing/integrations/BeyondLogos';
import { Arrow, CallButton, Reveal } from './components/landing/primitives';
import { ClosingSection, FaqSection } from './components/landing/sections';
import { DEPARTMENTS, FAQS, HERO, OUTCOMES } from './components/landing/content';

export const metadata: Metadata = createPageMetadata({
  title: 'Cartra: Custom AI Agents for Businesses',
  description:
    'Cartra is an applied AI company that designs, builds, and runs custom AI inside your business: AI voice agents, AI agent teammates for operations, and a company knowledge base that powers them.',
  path: '/',
});

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Home() {
  const [lead, accent] = HERO.headline;

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <LandingNav />

      <main>
        {/* ───────── Hero ───────── */}
        <section className="lp-hero" aria-labelledby="hero-title">
          <div className="lp-hero__field lp-hero-in" style={{ '--d': '80ms' } as CSSProperties}>
            <DotField />
          </div>
          <div className="lp-wrap relative z-[2] flex-1 flex flex-col">
            <h1 id="hero-title" className="lp-display lp-h1 lp-h1--home lp-hero-in" style={{ '--d': '80ms' } as CSSProperties}>
              <span className="block">{lead}</span>
              <TypedText text={accent!} delay={150} className="lp-accent block" />
            </h1>

            <p className="lp-lede mt-5 max-w-[36rem] lp-hero-in" style={{ '--d': '80ms' } as CSSProperties}>
              <span className="hidden sm:inline">{HERO.lede}</span>
              <span className="sm:hidden">{HERO.ledeShort}</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-2 lp-hero-in" style={{ '--d': '80ms' } as CSSProperties}>
              <CallButton location="landing_hero">Book a call</CallButton>
              <a href="#how-it-works" className="lp-btn lp-btn--line">
                How it works
                <Arrow />
              </a>
            </div>

            {/* Phones: a contained dot ripple fills the space above the logos. */}
            <div className="lp-hero__ripple lp-hero-in" style={{ '--d': '80ms' } as CSSProperties} aria-hidden>
              <DotRipple />
            </div>

            {/* Built by: pinned to the bottom of the hero so it sits above the fold. */}
            <section aria-label="Founding team" className="lp-logo-tiles mt-auto pt-12 lp-hero-in" style={{ '--d': '80ms' } as CSSProperties}>
              <p>Built by engineers from</p>
              {[
                ['/META.svg', 'Meta'],
                ['/GOOG.svg', 'Google'],
              ].map(([src, name]) => (
                <span key={name}>
                  <Image src={src!} alt="" width={32} height={22} className="h-[20px] w-auto" />
                  <span className="lp-h4" style={{ fontSize: '1.25rem' }}>{name}</span>
                </span>
              ))}
              <span className="lp-logo-tiles__more">and more</span>
            </section>
          </div>
        </section>

        {/* ───────── What we do ───────── */}
        <section className="lp-section" aria-labelledby="intro-title">
          <div className="lp-wrap text-center">
            <Reveal>
              <h2 id="intro-title" className="lp-tag">What we do</h2>
              <p className="lp-intro mx-auto mt-6">
                At Cartra, we unlock your company&apos;s potential using AI. Automate the repetitive work, speed up
                operations, reduce mistakes and flag risks, and more. We learn how your company works, what your
                bottlenecks are, and design and deploy custom AI agents and AI solutions tailored specifically to your
                business.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <dl className="lp-stat-tiles mt-14 lg:mt-16">
                {[
                  ['$5M–$100M', 'Annual revenue of our clients'],
                  ['100+', 'AI agents running in production'],
                  ['4 weeks', 'From kickoff to first results'],
                ].map(([value, label]) => (
                  <div key={value}>
                    <dt className="lp-stat-tiles__label">{label}</dt>
                    <dd className="lp-stat-tiles__value">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ───────── How we work: three steps ───────── */}
        <ProcessSection />

        {/* ───────── Industries ───────── */}
        <IndustriesSection />

        {/* ───────── Integrations ───────── */}
        <section
          id="integrations"
          className="lp-section lp-anchor"
          aria-labelledby="integrations-title"
        >
          <div className="lp-wrap">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
              <Reveal>
                <span className="lp-tag lp-tag--muted">Fully integrated</span>
                <h2 id="integrations-title" className="lp-display lp-h2 mt-6 max-w-[14ch]">
                  Built on the systems you already run.
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="lp-lede max-w-[34rem] lg:ml-auto">
                  Cartra works across your phone lines, inboxes, and software, connecting them into one operating layer. No
                  migrations, and no new platform for your team to learn.
                </p>
              </Reveal>
            </div>
          </div>
          <Reveal className="mt-12 lg:mt-16">
            <LogoMarquee label={null} />
          </Reveal>
          <div className="lp-wrap mt-10 lg:mt-12">
            <BeyondLogos />
          </div>
        </section>

        {/* ───────── Outcomes ───────── */}
        <section className="lp-section" style={{ paddingTop: 0 }} aria-labelledby="outcomes-title">
          <div className="lp-wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 self-start">
              <h2 id="outcomes-title" className="lp-display lp-h2 max-w-[13ch]">
                AI-native companies will set the pace.
              </h2>
              <p className="lp-lede mt-6 max-w-[30rem]">
                AI isn&apos;t just a way to cut costs. It&apos;s how good companies grow faster than their headcount: more
                customers served, more revenue captured, and new things they couldn&apos;t do before.
              </p>
              <div className="mt-8">
                <CallButton location="landing_outcomes" />
              </div>
            </Reveal>
            <div>
              {OUTCOMES.map((o, i) => (
                <Reveal key={o.title} delay={i * 80} className="lp-outcome">
                  <span className="lp-outcome__n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="lp-display lp-h3" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}>
                      {o.title}
                    </h3>
                    <p className="lp-body mt-3 max-w-[30rem]">{o.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Where we deploy ───────── */}
        <section className="lp-section lp-on-ink" aria-labelledby="deploy-title">
          <div className="lp-wrap">
            <Reveal className="text-center">
              <span className="lp-tag lp-tag--muted">Where we deploy</span>
              <h2 id="deploy-title" className="lp-display lp-h2 mt-6 mx-auto max-w-[17ch]">
                Built for the teams that run your business.
              </h2>
              <p className="lp-lede mx-auto mt-6 max-w-[40rem]">
                Cartra works across the functions where calls, paperwork, and questions pile up, with agents built around
                how each team already works.
              </p>
            </Reveal>

            <div className="mt-14 lg:mt-20 grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-10">
              {DEPARTMENTS.map((d, i) => (
                <Reveal key={d.name} delay={(i % 3) * 90} className="lp-dept">
                  <h3 className="lp-h4">{d.name}</h3>
                  <p className="lp-small">{d.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Thesis band ───────── */}
        <section className="lp-band" aria-label="Our thesis">
          <div className="lp-band__dots" aria-hidden />
          <svg
            className="absolute right-[-4rem] top-1/2 -translate-y-1/2 hidden lg:block w-[26rem] h-[26rem] -z-10"
            viewBox="0 0 120 120"
            fill="none"
            stroke="#fff"
            strokeWidth="0.6"
            aria-hidden
          >
            <circle cx="50" cy="38" r="12" />
            <rect x="70" y="26" width="24" height="24" rx="2.5" fill="#fff" fillOpacity="0.16" />
            <circle cx="39" cy="60" r="12" fill="#fff" fillOpacity="0.16" />
            <circle cx="50" cy="82" r="12" />
            <rect x="70" y="70" width="24" height="24" rx="2.5" />
          </svg>
          <div className="lp-wrap py-[clamp(5rem,11vw,9rem)]">
            <Reveal>
              <span className="lp-tag">Our thesis</span>
              <p className="lp-statement mt-6 mx-auto max-w-[30ch]">
                Successful companies differentiate in the AI-era by having AI systems that are uniquely built for them and that compound over time.
              </p>
            </Reveal>
          </div>
        </section>

        <FaqSection faqs={FAQS} />

        {/* ───────── Closing ───────── */}
        <ClosingSection
          title="See what AI could look like inside your company."
          body="A short conversation with our team to find where Voice, Agents, and Brain could make the biggest difference first."
          location="landing_closing"
        />
      </main>
    </>
  );
}
