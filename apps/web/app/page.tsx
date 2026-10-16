import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import JsonLd from './components/JsonLd';
import { createPageMetadata } from './lib/seo';
import LandingNav from './components/landing/LandingNav';
import DotField from './components/landing/DotField';
import LineArt from './components/landing/LineArt';
import LogoMarquee from './components/landing/integrations/LogoMarquee';
import BeyondLogos from './components/landing/integrations/BeyondLogos';
import { VoiceMockup, AgentsMockup, BrainMockup } from './components/landing/Mockups';
import { Arrow, CallButton, CallTile, Reveal } from './components/landing/primitives';
import { CONTRAST, DEPARTMENTS, FAQS, HERO, OUTCOMES, PILLARS, STEPS, type Pillar } from './components/landing/content';

export const metadata: Metadata = createPageMetadata({
  title: 'Cartra | Applied AI for Voice, Agents, and Company Knowledge',
  description:
    'Cartra is an applied AI company that designs, builds, and runs custom AI inside your business: AI voice agents, AI agent teammates for operations, and a company knowledge base that powers them.',
  path: '/',
});

const MOCKUPS: Record<Pillar['id'], () => React.JSX.Element> = {
  voice: VoiceMockup,
  agents: AgentsMockup,
  brain: BrainMockup,
};

// One-line blurbs for the hero pillar strip.
const PILLAR_BLURB: Record<Pillar['id'], string> = {
  voice: 'Next-generation AI voice agents for your customer support and sales. Supported in 90+ languages.',
  agents: 'Hire AI teammates specifically built around your company, how you operate, and that self-improve.',
  brain: 'Turn your know-how, expertise, and procedures into the foundation for the AI-native future of your company.',
};

const CARD_CTA: Record<Pillar['tone'], 'ink' | 'signal' | 'light'> = {
  light: 'ink',
  ink: 'signal',
  signal: 'light',
};

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
          <div className="lp-hero__field">
            <DotField />
          </div>

          <div className="lp-wrap relative z-[2] flex-1 flex flex-col">
            <h1 id="hero-title" className="lp-display lp-h1 max-w-[12ch] lg:max-w-none lp-hero-in" style={{ '--d': '80ms' } as CSSProperties}>
              <span className="lg:block">{lead}</span>{' '}
              <span className="lp-accent lg:block">{accent}</span>
            </h1>

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,38rem)_auto] lg:justify-between lg:items-end">
              <p className="lp-lede lp-hero-in" style={{ '--d': '200ms' } as CSSProperties}>
                {HERO.lede}
              </p>
              <div className="grid grid-cols-2 gap-2 sm:w-[30rem] lp-hero-in" style={{ '--d': '320ms' } as CSSProperties}>
                <CallTile label="Book a call" meta="Discovery session" location="landing_hero" />
                <a href="#platform" className="lp-tile lp-tile--ink">
                  <span className="lp-tile__label">
                    See the platform
                    <Arrow />
                  </span>
                  <span className="lp-tile__meta">Voice · Agents · Brain</span>
                </a>
              </div>
            </div>

            <div className="mt-auto pt-14" />
            <nav aria-label="Cartra products" className="lp-pillar-strip lp-hero-in" style={{ '--d': '440ms' } as CSSProperties}>
              {PILLARS.map((p) => (
                <a key={p.id} href={`#${p.id}`}>
                  <span className="lp-pillar-strip__name">{p.name}</span>
                  <Arrow />
                  <span className="lp-pillar-strip__desc">{PILLAR_BLURB[p.id]}</span>
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* ───────── Built by ───────── */}
        <section aria-label="Founding team" style={{ borderBlock: '1px solid var(--lp-line)', background: 'var(--lp-surface)' }}>
          <div className="lp-wrap py-8 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 lp-logos">
            <span className="lp-mono" style={{ color: 'var(--lp-muted)' }}>Built by engineers from</span>
            <div className="flex items-center gap-10">
              {[
                ['/META.svg', 'Meta'],
                ['/GOOG.svg', 'Google'],
              ].map(([src, name]) => (
                <span key={name} className="flex items-center gap-2.5" style={{ color: 'var(--lp-muted)' }}>
                  <Image src={src!} alt="" width={32} height={22} className="h-[20px] w-auto" />
                  <span className="lp-h4" style={{ fontSize: '1.25rem' }}>{name}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Problem vs solution ───────── */}
        <section className="lp-section" aria-labelledby="contrast-title">
          <div className="lp-wrap">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end mb-12 lg:mb-16">
              <Reveal>
                <span className="lp-tag lp-tag--muted">The problem</span>
                <h2 id="contrast-title" className="lp-display lp-h2 mt-6 max-w-[16ch]">
                  Everyone has the same AI. <span className="lp-accent">Few have AI built for them.</span>
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="lp-lede max-w-[34rem] lg:ml-auto">
                  Off-the-shelf tools don&apos;t know your customers, your systems, or how your team actually works. So they
                  stall after the demo, sit beside the real work, and leave the hard parts to your people.
                </p>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="lp-compare">
                <div className="lp-compare__col lp-compare__col--generic">
                  <p className="lp-compare__head">
                    <span className="lp-mono">Off-the-shelf AI</span>
                  </p>
                  {CONTRAST.map((row) => (
                    <p key={row.generic} className="lp-compare__row">
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden className="lp-compare__mark">
                        <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                      {row.generic}
                    </p>
                  ))}
                </div>
                <div className="lp-compare__col lp-compare__col--cartra">
                  <p className="lp-compare__head">
                    <span className="lp-mono">Built by Cartra</span>
                  </p>
                  {CONTRAST.map((row) => (
                    <p key={row.cartra} className="lp-compare__row">
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden className="lp-compare__mark">
                        <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {row.cartra}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="lp-lede mx-auto mt-12 lg:mt-16 max-w-[44rem] text-center" style={{ color: 'var(--lp-text)' }}>
                We work with you to tailor and optimize AI solutions to your exact needs so that{' '}
                <span className="lp-accent">it becomes your competitive advantage.</span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ───────── Platform: three pillars ───────── */}
        <section id="platform" className="lp-anchor pb-[clamp(5rem,10vw,8.5rem)]" aria-labelledby="platform-title">
          <div className="lp-wrap">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end mb-12 lg:mb-16">
              <Reveal>
                <span className="lp-tag lp-tag--muted">The platform</span>
                <h2 id="platform-title" className="lp-display lp-h2 mt-6 max-w-[14ch]">
                  Three ways we put AI to work.
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="lp-lede max-w-[34rem] lg:ml-auto">
                  Voice handles the conversations. Agents handle the work. Brain holds what your company knows. Start with
                  one, or combine all three into a single operating layer.
                </p>
              </Reveal>
            </div>

            <div className="lp-stack">
              {PILLARS.map((p, i) => {
                const Mock = MOCKUPS[p.id];
                return (
                  <article
                    key={p.id}
                    id={p.id}
                    className={`lp-card lp-card--${p.tone} lp-anchor`}
                    style={{ '--stack-i': i } as CSSProperties}
                    aria-labelledby={`${p.id}-title`}
                  >
                    <div className="flex flex-col">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="lp-tag">
                          {p.name}
                        </span>
                        <span className="lp-mono" style={{ opacity: 0.75 }}>{p.kicker}</span>
                      </div>
                      <h3 id={`${p.id}-title`} className="lp-display lp-h3 mt-6 max-w-[17ch]">
                        {p.title}
                      </h3>
                      <p className="lp-body mt-5 max-w-[34rem]">{p.body}</p>
                      <ul className="lp-caps mt-6">
                        {p.capabilities.map((c, ci) => (
                          <li key={c}>
                            <span
                              className={`lp-glyph ${ci % 2 ? 'lp-glyph--square' : 'lp-glyph--circle'}`}
                              style={{ color: p.tone === 'signal' ? '#fff' : 'var(--lp-glow)' }}
                              aria-hidden
                            />
                            {c}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-7 lg:mt-auto lg:pt-7">
                        <CallButton variant={CARD_CTA[p.tone]} location={`landing_pillar_${p.id}`}>
                          {`Talk to us about ${p.name.replace('Cartra ', '')}`}
                        </CallButton>
                      </div>
                    </div>
                    <Mock />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───────── Integrations ───────── */}
        <section
          id="integrations"
          className="lp-section lp-anchor"
          style={{ paddingTop: 'clamp(1.5rem, 3vw, 3rem)' }}
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

        {/* ───────── How it works ───────── */}
        <section id="how-it-works" className="lp-section lp-anchor" style={{ paddingTop: 'clamp(1.5rem, 3vw, 3rem)' }} aria-labelledby="process-title">
          <div className="lp-wrap">
            <Reveal className="text-center mb-12 lg:mb-16">
              <span className="lp-tag lp-tag--muted">How it works</span>
              <h2 id="process-title" className="lp-display lp-h2 mt-6 mx-auto max-w-[14ch] sm:max-w-none">
                <span className="sm:block">Start focused. Prove it.</span> <span className="lp-accent">Let it compound.</span>
              </h2>
            </Reveal>

            <div className="lp-bento">
              {/* Step 1 */}
              <Reveal className="lp-span-2">
                <div className="lp-step lp-on-ink" style={{ minHeight: '28rem' }}>
                  <div className="lp-step__art" style={{ color: 'var(--lp-on-ink)' }}>
                    <LineArt variant="arcs" opacity={0.16} accent={11} />
                  </div>
                  <span className="lp-tag self-start" style={{ color: 'var(--lp-on-ink)' }}>{STEPS[0]!.tag}</span>
                  <div className="max-w-[34rem]">
                    <h3 className="lp-display lp-h3">{STEPS[0]!.title}</h3>
                    <p className="lp-body mt-5">{STEPS[0]!.body}</p>
                    <div className="mt-8">
                      <CallButton location="landing_step_first_win">Find your first win</CallButton>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Step 2 */}
              <Reveal>
                <div className="lp-step lp-step--2 h-full">
                  <div className="lp-step__art" style={{ color: 'var(--lp-text)' }}>
                    <LineArt variant="fins" opacity={0.13} />
                  </div>
                  <span className="lp-tag self-start">{STEPS[1]!.tag}</span>
                  <div>
                    <h3 className="lp-display lp-h3">{STEPS[1]!.title}</h3>
                    <p className="lp-body mt-5">{STEPS[1]!.body}</p>
                  </div>
                </div>
              </Reveal>

              {/* Step 3 */}
              <Reveal delay={100}>
                <div className="lp-step lp-step--3 h-full">
                  <div className="lp-step__art" style={{ color: '#fff' }}>
                    <LineArt variant="sweep" opacity={0.2} />
                  </div>
                  <span className="lp-tag self-start">{STEPS[2]!.tag}</span>
                  <div>
                    <h3 className="lp-display lp-h3">{STEPS[2]!.title}</h3>
                    <p className="lp-body mt-5" style={{ color: 'var(--lp-on-signal-muted)' }}>{STEPS[2]!.body}</p>
                  </div>
                </div>
              </Reveal>

              {/* Always on */}
              <Reveal className="lp-span-2">
                <div className="lp-step grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end" style={{ background: 'var(--lp-surface)', border: '1px solid var(--lp-line)' }}>
                  <div className="lp-step__art" style={{ color: 'var(--lp-text)' }}>
                    <LineArt variant="grid" opacity={0.06} />
                  </div>
                  <div className="flex flex-col justify-between gap-12 h-full">
                    <span className="lp-tag self-start" style={{ color: 'var(--lp-accent-text)' }}>{STEPS[3]!.tag}</span>
                    <div className="max-w-[32rem]">
                      <h3 className="lp-display lp-h3">{STEPS[3]!.title}</h3>
                      <p className="lp-body mt-5">{STEPS[3]!.body}</p>
                    </div>
                  </div>
                  <div className="lp-mock" role="img" aria-label="Example: skills the system learned this week">
                    <div className="lp-mock__bar">
                      <span>Skills learned</span>
                      <span>This week</span>
                    </div>
                    {[
                      ['Callers asking about split shipments', 'Voice', 'Live'],
                      ['New vendor invoice layout', 'Agents', 'Live'],
                      ['Holiday return window', 'Brain', 'Learning'],
                    ].map(([title, pillar, status]) => (
                      <div key={title} className="lp-step-row" style={{ gridTemplateColumns: '1fr auto auto' }}>
                        <span>{title}</span>
                        <span className="lp-pill">{pillar}</span>
                        <span className={`lp-pill ${status === 'Learning' ? 'lp-pill--hot' : ''}`}>{status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
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
                  <span className="lp-outcome__n">.0{i + 1}</span>
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
                Cartra works across the functions where calls, paperwork, and questions pile up. Each one starts with the product
                that fits the job.
              </p>
            </Reveal>

            <div className="mt-14 lg:mt-20 grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-10">
              {DEPARTMENTS.map((d, i) => (
                <Reveal key={d.name} delay={(i % 3) * 90} className="lp-dept">
                  <span className="lp-dept__mark" aria-hidden>
                    {d.mark.map((m, mi) => (
                      <i key={mi} className={m} />
                    ))}
                  </span>
                  <h3 className="lp-h4">{d.name}</h3>
                  <p className="lp-small">{d.body}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                    {d.pillars.map((p) => (
                      <span key={p} className="lp-chip">{p}</span>
                    ))}
                  </div>
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
              <p className="lp-display lp-h2 mt-8 max-w-[22ch]">
                Successful companies differentiate in the AI-era by having AI systems that are uniquely built for them and that compound over time.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section id="faq" className="lp-section lp-anchor" aria-labelledby="faq-title">
          <div className="lp-wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 self-start">
              <h2 id="faq-title" className="lp-display lp-h2 max-w-[11ch]">
                Frequently asked questions.
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
              {FAQS.map((f, i) => (
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

        {/* ───────── Closing ───────── */}
        <section className="lp-section" style={{ paddingTop: 0 }} aria-labelledby="closing-title">
          <div className="lp-wrap">
            <div className="grid gap-2 lg:grid-cols-[1.4fr_1fr]">
              <Reveal>
                <div className="relative h-full overflow-hidden p-[clamp(1.5rem,4vw,3.5rem)] lp-on-ink lp-round-xl" style={{ minHeight: '26rem', isolation: 'isolate' }}>
                  <div className="lp-step__art" style={{ color: 'var(--lp-on-ink)' }}>
                    <LineArt variant="sweep" opacity={0.12} accent={13} />
                  </div>
                  <span className="lp-tag lp-tag--muted">Get started</span>
                  <h2 id="closing-title" className="lp-display lp-h2 mt-8 max-w-[15ch]">
                    See what AI could look like inside your company.
                  </h2>
                  <p className="lp-lede mt-6 max-w-[32rem]">
                    A short conversation with our team to find where Voice, Agents, and Brain could make the biggest difference
                    first.
                  </p>
                </div>
              </Reveal>
              <div className="grid gap-2">
                <Reveal delay={80} className="grid">
                  <CallTile label="Book a discovery call" meta="Schedule discovery" location="landing_closing" className="lp-round-xl" />
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
      </main>
    </>
  );
}
