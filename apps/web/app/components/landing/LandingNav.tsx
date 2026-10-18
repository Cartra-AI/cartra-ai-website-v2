'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CallButton } from './primitives';

const LINKS = [
  { href: '/voice', label: 'Voice' },
  { href: '/agents', label: 'Agents' },
  { href: '/brain', label: 'Brain' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#faq', label: 'FAQ' },
];

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <nav className="lp-nav" data-scrolled={scrolled || open} aria-label="Primary">
        <div className="lp-wrap h-full flex items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            style={{ fontFamily: 'var(--lp-font-display)', fontWeight: 400, fontSize: '1.125rem', letterSpacing: '-0.02em' }}
          >
            <Image src="/cartra_geometric_logo_round.png" alt="" width={26} height={26} className="rounded-full" priority />
            Cartra
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="lp-nav__link">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <CallButton size="sm" location="landing_nav" className="hidden sm:inline-flex" />
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-10 h-10"
              aria-expanded={open}
              aria-controls="lp-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                {open ? (
                  <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.5" />
                ) : (
                  <path d="M2 6h16M2 14h16" stroke="currentColor" strokeWidth="1.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div id="lp-menu" className="lp-menu md:hidden">
          <div className="flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="lp-display py-4"
                style={{ fontSize: '2rem', borderBottom: '1px solid var(--lp-line)' }}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-auto">
            <CallButton location="landing_mobile_menu" className="w-full" />
          </div>
        </div>
      )}
    </>
  );
}
