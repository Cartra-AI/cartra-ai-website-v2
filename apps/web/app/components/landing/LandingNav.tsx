'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CallButton } from './primitives';
import { INDUSTRIES, INDUSTRY_PATH } from '../../content/industries';

/*
 * Primary nav: Solutions and Industries open dropdown menus (hover or click on
 * desktop; grouped lists in the mobile menu), then plain links.
 */

type MenuItem = { href: string; label: string; note?: string };
type Menu = { id: string; label: string; items: MenuItem[]; footer?: MenuItem };

const MENUS: Menu[] = [
  {
    id: 'solutions',
    label: 'Solutions',
    items: [
      { href: '/os', label: 'Cartra OS', note: 'One workspace for people and agents' },
      { href: '/voice', label: 'Cartra Voice', note: 'AI voice agents for every call' },
      { href: '/agents', label: 'Cartra Agents', note: 'AI teammates for operations work' },
      { href: '/brain', label: 'Cartra Brain', note: 'Your company’s knowledge, put to work' },
    ],
  },
  {
    id: 'industries',
    label: 'Industries',
    items: INDUSTRIES.map((i) => ({ href: INDUSTRY_PATH(i.slug), label: i.name })),
    footer: { href: '/#industries', label: 'All industries' },
  },
];

const LINKS = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#faq', label: 'FAQ' },
];

function Caret() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden className="lp-nav__caret">
      <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dropdown({
  menu,
  open,
  setOpen,
  onEnter,
  onLeave,
}: {
  menu: Menu;
  open: boolean;
  setOpen: (id: string | null) => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div className="lp-nav__group" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        type="button"
        className="lp-nav__link lp-nav__trigger"
        aria-expanded={open}
        aria-controls={`lp-nav-${menu.id}`}
        onClick={() => setOpen(open ? null : menu.id)}
      >
        {menu.label}
        <Caret />
      </button>
      <div id={`lp-nav-${menu.id}`} className="lp-nav__panel" data-open={open} hidden={!open}>
        <ul className={menu.items.some((i) => i.note) ? 'lp-nav__list' : 'lp-nav__list lp-nav__list--two'}>
          {menu.items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="lp-nav__item" onClick={() => setOpen(null)}>
                <span>{item.label}</span>
                {item.note && <small>{item.note}</small>}
              </a>
            </li>
          ))}
        </ul>
        {menu.footer && (
          <a href={menu.footer.href} className="lp-nav__footer" onClick={() => setOpen(null)}>
            {menu.footer.label}
          </a>
        )}
      </div>
    </div>
  );
}

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  // One close timer for all dropdowns, so moving from one menu to the next
  // never lets the first menu's delayed close shut the second.
  const closeTimer = useRef<number | undefined>(undefined);
  const openMenu = (id: string) => {
    window.clearTimeout(closeTimer.current);
    setMenu(id);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), 120);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Desktop dropdowns: close on Escape or a click outside the nav.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(null);
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [menu]);

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
      <nav ref={navRef} className="lp-nav" data-scrolled={scrolled || open} aria-label="Primary">
        <div className="lp-wrap h-full flex items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            style={{ fontFamily: 'var(--lp-font-display)', fontWeight: 400, fontSize: '1.125rem', letterSpacing: '-0.02em' }}
          >
            <Image src="/cartra_geometric_logo_round.png" alt="" width={26} height={26} className="rounded-full" priority />
            Cartra
          </Link>

          <div className="hidden md:flex items-center gap-1 lp-nav__links">
            {MENUS.map((m) => (
              <Dropdown
                key={m.id}
                menu={m}
                open={menu === m.id}
                setOpen={setMenu}
                onEnter={() => openMenu(m.id)}
                onLeave={closeSoon}
              />
            ))}
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
          <div className="flex flex-col gap-6 overflow-y-auto">
            {MENUS.map((m) => (
              <div key={m.id}>
                <p className="lp-menu__heading">{m.label}</p>
                <ul className="lp-menu__list">
                  {m.items.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} onClick={() => setOpen(false)}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <ul className="lp-menu__list">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto pt-6">
            <CallButton location="landing_mobile_menu" className="w-full" />
          </div>
        </div>
      )}
    </>
  );
}
