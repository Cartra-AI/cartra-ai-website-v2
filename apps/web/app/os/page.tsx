import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';
import LandingNav from '../components/landing/LandingNav';
import ProductName from '../components/landing/ProductName';
import { Arrow, CallButton, Reveal } from '../components/landing/primitives';
import { ClosingSection, FaqSection } from '../components/landing/sections';
import OsWorkspace from '../components/os/OsWorkspace';
import OsFeatures from '../components/os/OsFeatures';
import OsFlow from '../components/os/OsFlow';
import { createBreadcrumbJsonLd, createPageMetadata, createServiceJsonLd } from '../lib/seo';

/*
 * /os: Cartra OS, the workspace every Cartra agent runs in. Hero with a live
 * workspace loop, the four things inside it, how work flows through it, the
 * controls, the products built on it, FAQs, and a closing call to action.
 * Control claims are limited to what Jeff confirmed (data ownership, logging,
 * no training, isolated environments, approvals). No certifications or SSO.
 */

const PATH = '/os';
const SEO_TITLE = 'Cartra OS: One Workspace for Your People and AI Agents | Cartra';
const SEO_DESCRIPTION =
  'Cartra OS is the workspace where your team and your AI agents work together: shared context, exceptions routed to the right person, and custom apps on request.';

export const metadata: Metadata = createPageMetadata({ title: SEO_TITLE, description: SEO_DESCRIPTION, path: PATH });

const CONTROLS = [
  {
    title: 'You set the rules',
    body: 'Decide what each agent does on its own and what waits for a person. Approvals sit in the same inbox as everything else.',
  },
  {
    title: 'Every action logged',
    body: 'See what each agent did, when, and with which information, from the first case to the latest.',
  },
  {
    title: 'Your data stays yours',
    body: 'Your configuration, memory, knowledge, and data belong to you. Export or delete them at any time.',
  },
  {
    title: 'Never used to train models',
    body: 'Nothing in your workspace is used to train AI models, ours or anyone else’s.',
  },
  {
    title: 'Isolated for each company',
    body: 'Every customer runs in its own environment, so your agents and data never share space with another company’s.',
  },
  {
    title: 'Built around your stack',
    body: 'Agents connect to the software you already run. No migration, and no new system of record to adopt.',
  },
];

const BUILT_ON = [
  { href: '/voice', name: 'Cartra Voice', body: 'Voice agents that answer and make calls, with every call and follow-up in your workspace.' },
  { href: '/agents', name: 'Cartra Agents', body: 'AI teammates for email, documents, and system work, managed side by side with your team.' },
  { href: '/brain', name: 'Cartra Brain', body: 'Your company’s knowledge in one place, the same context your agents work from.' },
];

const FAQS = [
  {
    q: 'What is Cartra OS?',
    a: 'Cartra OS is the workspace where your people and your AI agents work together. Agents post their work there, context and company knowledge live there, exceptions come to the right person there, and anyone can ask an agent to build a custom app or report there. Every agent Cartra builds runs on it.',
  },
  {
    q: 'Do we have to replace our current software?',
    a: 'No. Agents work inside the systems you already run, such as your ERP, CRM, inbox, and phones. Cartra OS sits on top as the place to see, steer, and review that work. Nothing is migrated.',
  },
  {
    q: 'What happens when an agent is not sure?',
    a: 'It stops and asks. The case goes to the person who owns that decision, with the evidence and the options laid out. Their answer is saved as context, so the next case like it can be handled without asking.',
  },
  {
    q: 'What kinds of apps can we build?',
    a: 'Dashboards, trackers, reports, and simple internal tools that run on your live data. Describe what you need and an agent builds it, then shares it with the people who should see it.',
  },
  {
    q: 'Who builds and maintains the agents?',
    a: 'Cartra does, with your team. We map how the work runs, build the agents around your processes, and stay on to improve them. Your team works with them day to day in Cartra OS.',
  },
  {
    q: 'Who owns the data in Cartra OS?',
    a: 'You do. Your configuration, memory, knowledge, and data belong to you and can be exported or deleted at any time. Every action is logged, each company runs in its own environment, and nothing is used to train AI models.',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Cartra OS', path: PATH },
        ])}
      />
      <JsonLd
        data={createServiceJsonLd({
          name: 'Cartra OS',
          description: SEO_DESCRIPTION,
          serviceType: 'AI agent workspace',
          path: PATH,
          category: 'AI agent workspace',
        })}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />
      <LandingNav />

      <main>
        {/* ───────── Hero ───────── */}
        <section className="lp-product-hero lp-os-hero" aria-labelledby="os-title">
          <div className="lp-wrap">
            <div className="flex flex-wrap items-center gap-3 lp-hero-in" style={{ '--d': '40ms' } as CSSProperties}>
              <ProductName name="Cartra OS" />
              <span className="lp-mono" style={{ color: 'var(--lp-muted)' }}>
                The workspace for people and agents
              </span>
            </div>
            <h1 id="os-title" className="lp-display lp-h1 mt-6 lp-hero-in" style={{ '--d': '80ms' } as CSSProperties}>
              <span className="block">One workspace for</span>
              <span className="lp-accent block">your people and your agents.</span>
            </h1>
            <div className="mt-5 grid gap-8 lp-hero-in" style={{ '--d': '160ms' } as CSSProperties}>
              <p className="lp-lede max-w-[38rem]">
                Cartra OS is where your team and your AI agents work together. Context lives in one place, exceptions reach the right
                person, and anyone can ask for a custom app. Every agent Cartra builds runs on it.
              </p>
              <div className="flex flex-wrap gap-2">
                <CallButton location="os_hero">Book a call</CallButton>
                <a href="#inside" className="lp-btn lp-btn--line">
                  See what&apos;s inside
                  <Arrow />
                </a>
              </div>
            </div>
            <div className="mt-12 lg:mt-16 lp-hero-in" style={{ '--d': '240ms' } as CSSProperties}>
              <OsWorkspace />
            </div>
          </div>
        </section>

        <OsFeatures />

        <OsFlow />

        {/* ───────── Control ───────── */}
        <section className="lp-section" style={{ paddingTop: 0 }} aria-labelledby="control-title">
          <div className="lp-wrap">
            <Reveal>
              <p className="lp-tag">Control</p>
              <h2 id="control-title" className="lp-statement mt-3 max-w-[22ch]">
                Agents for the whole company, with you in charge
              </h2>
            </Reveal>
            <div className="lp-os-controls mt-10">
              {CONTROLS.map((c, i) => (
                <Reveal key={c.title} delay={(i % 3) * 80} className="lp-os-control">
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Built on Cartra OS ───────── */}
        <section className="lp-section" style={{ paddingTop: 0 }} aria-labelledby="built-title">
          <div className="lp-wrap">
            <Reveal>
              <p className="lp-tag">Built on Cartra OS</p>
              <h2 id="built-title" className="lp-statement mt-3 max-w-[22ch]">
                Everything Cartra builds runs here
              </h2>
            </Reveal>
            <div className="lp-os-built mt-10">
              {BUILT_ON.map((p, i) => (
                <Reveal key={p.href} delay={i * 80}>
                  <a href={p.href} className="lp-os-built__card">
                    <ProductName name={p.name} />
                    <p>{p.body}</p>
                    <span className="lp-link">
                      Learn more
                      <Arrow />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FaqSection faqs={FAQS} />

        <ClosingSection
          title="See your team and agents in one workspace."
          body="A short conversation about where work piles up in your business, and what your first agents in Cartra OS would take on."
          location="os_closing"
          cta={{ label: 'Book a call', meta: 'Schedule discovery' }}
        />
      </main>
    </>
  );
}
