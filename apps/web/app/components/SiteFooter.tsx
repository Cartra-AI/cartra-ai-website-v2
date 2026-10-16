import Image from 'next/image';
import Link from 'next/link';
import ContactLink from './ContactLink';

/* Site-wide footer in the redesign's system: logo + contact on the left,
   link columns on the right, legal row underneath. */

const COLUMNS: Array<{ title: string; links: Array<{ href: string; label: string }> }> = [
  {
    title: 'Products',
    links: [
      { href: '/#voice', label: 'Cartra Voice' },
      { href: '/#agents', label: 'Cartra Agents' },
      { href: '/#brain', label: 'Cartra Brain' },
      { href: '/#integrations', label: 'Integrations' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/', label: 'Home' },
      { href: '/agent-systems', label: 'Agent Systems' },
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/support', label: 'Support' },
    ],
  },
  {
    title: 'AI Services',
    links: [
      { href: '/ai-agent-development-company', label: 'AI Agent Development Company' },
      { href: '/ai-automation-agency', label: 'AI Automation Agency' },
      { href: '/ai-workflow-automation', label: 'AI Workflow Automation' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-wrap">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div className="max-w-[22rem]">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              style={{ fontFamily: 'var(--lp-font-display)', fontSize: '1.125rem', letterSpacing: '-0.02em' }}
            >
              <Image src="/cartra_geometric_logo_round.png" alt="" width={26} height={26} className="rounded-full" />
              Cartra
            </Link>
            <p className="lp-small mt-4">
              Applied AI for the businesses that run the real economy: voice agents, agent teammates, and a company brain.
            </p>
            <div className="lp-small mt-6 grid gap-1.5">
              <a href="mailto:team@cartra.ai" className="lp-footer__link">
                team@cartra.ai
              </a>
              <span>
                2261 Market Street, STE 85777
                <br />
                San Francisco, CA 94114
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-14">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="lp-mono" style={{ color: 'var(--lp-muted)' }}>
                  {col.title}
                </p>
                <ul className="mt-4 grid gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="lp-footer__link">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  {col.title === 'Company' && (
                    <li>
                      <ContactLink className="lp-footer__link cursor-pointer" />
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="lp-footer__legal">
          <p className="tabular-nums">&copy; {new Date().getFullYear()} Cartra. All rights reserved.</p>
          <nav aria-label="Legal" className="flex items-center gap-6">
            <Link href="/privacy" className="lp-footer__link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="lp-footer__link">
              Terms of Use
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
