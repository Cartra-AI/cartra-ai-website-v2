'use client';

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import { trackEvent } from '../../lib/analytics';
import { useConsultation } from '../ConsultationProvider';

export function Arrow({ className = 'lp-arrow' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

/** Adds data-reveal="in" once the element scrolls into view. */
export function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
  plain = false,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: ReactNode;
  /** Track visibility without the fade-up (for SVG draw-ins). */
  plain?: boolean;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.reveal = 'in';
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${plain ? '' : 'lp-reveal'} ${className}`.trim()}
      style={{ '--d': `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Opens the site consultation form. Sharp landing-page styling. */
export function CallButton({
  children = 'Book a call',
  variant = 'signal',
  size = 'md',
  location,
  className = '',
}: {
  children?: ReactNode;
  variant?: 'signal' | 'ink' | 'light' | 'line';
  size?: 'sm' | 'md';
  location: string;
  className?: string;
}) {
  const open = useConsultation();
  const variantClass = variant === 'signal' ? '' : `lp-btn--${variant}`;
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      className={`lp-btn ${variantClass} ${size === 'sm' ? 'lp-btn--sm' : ''} ${className}`}
      onClick={() => {
        trackEvent('consultation_cta_click', {
          cta_location: location,
          cta_text: typeof children === 'string' ? children : 'Book a call',
        });
        open();
      }}
    >
      {children}
      <Arrow />
    </button>
  );
}

/** Large square CTA tile (hero, closing section). */
export function CallTile({
  label,
  meta,
  location,
  className = '',
}: {
  label: string;
  meta: string;
  location: string;
  className?: string;
}) {
  const open = useConsultation();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      className={`lp-tile ${className}`}
      onClick={() => {
        trackEvent('consultation_cta_click', { cta_location: location, cta_text: label });
        open();
      }}
    >
      <span className="lp-tile__label">
        {label}
        <Arrow />
      </span>
      <span className="lp-tile__meta">{meta}</span>
    </button>
  );
}
