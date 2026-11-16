import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '../JsonLd';
import LandingNav from './LandingNav';
import ProcessSection from './ProcessSection';
import { Arrow, CallButton, Reveal } from './primitives';
import { ClosingSection, FaqSection, LogoGrid } from './sections';
import CaseStudies from './CaseStudies';
import { INDUSTRIES, INDUSTRY_PATH, type Industry } from '../../content/industries';
import { createBreadcrumbJsonLd, createServiceJsonLd } from '../../lib/seo';

/*
 * One template for every industry page, modeled on how varickagents.com
 * structures its industry pages: an outcome hero with a photo, "where agents
 * work" use cases, the systems they work in, case studies, the shared process,
 * other industries, FAQs, and a closing call to action.
 */

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="lp-usecase__check">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function IndustryPage({ industry }: { industry: Industry }) {
  const path = INDUSTRY_PATH(industry.slug);
  const [lead, accent] = industry.headline;
  const others = INDUSTRIES.filter((i) => i.slug !== industry.slug);

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/#industries' },
          { name: industry.name, path },
        ])}
      />
      <JsonLd
        data={createServiceJsonLd({
          name: `Cartra for ${industry.name}`,
          description: industry.seoDescription,
          serviceType: 'Custom AI agents',
          path,
          category: industry.name,
        })}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: industry.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      <LandingNav />

      <main>
        {/* ───────── Hero ───────── */}
        <section className="lp-ind-hero" aria-labelledby="industry-title">
          <div className="lp-wrap grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14 lg:items-center">
            <div>
              <p className="lp-tag lp-hero-in" style={{ '--d': '40ms' } as CSSProperties}>
                <Link href="/#industries" className="hover:underline underline-offset-4">
                  Industries
                </Link>{' '}
                / {industry.name}
              </p>
              <h1 id="industry-title" className="lp-display lp-h1 lp-h1--home mt-5 lp-hero-in" style={{ '--d': '80ms' } as CSSProperties}>
                <span className="block">{lead}</span>
                <span className="lp-accent block">{accent}</span>
              </h1>
              <p className="lp-lede mt-5 max-w-[36rem] lp-hero-in" style={{ '--d': '160ms' } as CSSProperties}>
                {industry.lede}
              </p>
              <div className="mt-8 flex flex-wrap gap-2 lp-hero-in" style={{ '--d': '240ms' } as CSSProperties}>
                <CallButton location={`industry_${industry.slug}_hero`}>Book a call</CallButton>
                <a href="#use-cases" className="lp-btn lp-btn--line">
                  Where agents work
                  <Arrow />
                </a>
              </div>
            </div>
            <div className="lp-ind-hero__photo lp-hero-in" style={{ '--d': '160ms' } as CSSProperties}>
              <Image
                src={`/industries/${industry.photo}`}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 34rem, 100vw"
                style={industry.focus ? { objectPosition: industry.focus } : undefined}
              />
            </div>
          </div>
        </section>

        {/* ───────── Use cases ───────── */}
        <section id="use-cases" className="lp-section lp-anchor" aria-labelledby="use-cases-title">
          <div className="lp-wrap">
            <Reveal>
              <p className="lp-tag">Use cases</p>
              <h2 id="use-cases-title" className="lp-statement mt-3 max-w-[24ch]">
                Where agents work in {industry.name.toLowerCase()}
              </h2>
            </Reveal>
            <div className="lp-usecases mt-10 lg:mt-12">
              {industry.useCases.map((u, i) => (
                <Reveal key={u.title} delay={(i % 3) * 80} className="lp-usecase">
                  <p className="lp-usecase__area">{u.area}</p>
                  <h3 className="lp-usecase__title">{u.title}</h3>
                  <p className="lp-usecase__body">{u.body}</p>
                  <ul className="lp-usecase__does">
                    {u.does.map((d) => (
                      <li key={d}>
                        <Check />
                        {d}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Systems ───────── */}
        <section className="lp-section" style={{ paddingTop: 0 }} aria-labelledby="systems-title">
          <div className="lp-wrap grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
            <Reveal>
              <p className="lp-tag">Integrations</p>
              <h2 id="systems-title" className="lp-statement mt-3 max-w-[18ch]">
                Inside the systems you already run
              </h2>
              <p className="lp-lede mt-4 max-w-[30rem]">
                Agents work in your phones, inboxes, and software, the way your team does. No migration and no new platform to learn.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <LogoGrid logos={industry.systems} more="and the rest of your stack" label={`Systems we connect to for ${industry.name}`} />
            </Reveal>
          </div>
        </section>

        {/* ───────── Case studies (real clients only) ───────── */}
        {industry.caseStudies.length > 0 && <CaseStudies studies={industry.caseStudies} />}

        {/* ───────── How we work (shared) ───────── */}
        <ProcessSection />

        {/* ───────── Other industries ───────── */}
        <section className="lp-section" style={{ paddingBottom: 0 }} aria-labelledby="other-industries-title">
          <div className="lp-wrap">
            <h2 id="other-industries-title" className="lp-tag">
              Other industries
            </h2>
            <ul className="lp-ind__chips mt-4" aria-labelledby="other-industries-title">
              {others.map((o) => (
                <li key={o.slug}>
                  <a href={INDUSTRY_PATH(o.slug)} className="lp-ind__chip">
                    {o.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FaqSection faqs={industry.faqs} />

        <ClosingSection
          title="See what agents could do for your team."
          body={`A short conversation about where ${industry.name.toLowerCase()} work piles up in your business, and which workflow to take live first.`}
          location={`industry_${industry.slug}_closing`}
          cta={{ label: 'Book a call', meta: 'Schedule discovery' }}
        />
      </main>
    </>
  );
}
