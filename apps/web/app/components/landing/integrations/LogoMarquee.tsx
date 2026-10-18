import type { CSSProperties } from 'react';

/*
 * Two scrolling rows of "works with" logos for the integrations section.
 * Brand logos are shown in their own colors from /public/integrations
 * (sanitized SVGs). Custom integrations, computer use and the long tail are
 * called out separately in BeyondLogos. Trademarks belong to their owners
 * and indicate compatibility only.
 */

type Logo = {
  slug: string;
  name: string;
  /** Hide the text label when the logo already spells the name. */
  wordmark?: boolean;
  /** File type in /public/integrations when there's no SVG. */
  ext?: 'svg' | 'png';
};

// Row 1: where conversations happen (chat, email, phones, calendars, CRM).
const FRONT: Logo[] = [
  { slug: 'slack', name: 'Slack' },
  { slug: 'microsoftteams', name: 'Microsoft Teams' },
  { slug: 'gmail', name: 'Gmail' },
  { slug: 'microsoftoutlook', name: 'Microsoft Outlook' },
  { slug: 'twilio', name: 'Twilio' },
  { slug: 'ringcentral', name: 'RingCentral' },
  { slug: 'zoom', name: 'Zoom' },
  { slug: 'dialpad', name: 'Dialpad', wordmark: true },
  { slug: 'googlecalendar', name: 'Google Calendar' },
  { slug: 'salesforce', name: 'Salesforce', wordmark: true },
  { slug: 'hubspot', name: 'HubSpot' },
];

// Row 2: systems of record and company knowledge.
const BACK: Logo[] = [
  { slug: 'hawksoft', name: 'HawkSoft' },
  { slug: 'efreight', name: 'E-Freight', ext: 'png' },
  { slug: 'netsuite', name: 'Oracle NetSuite', wordmark: true },
  { slug: 'quickbooks', name: 'QuickBooks' },
  { slug: 'googledrive', name: 'Google Drive' },
  { slug: 'microsoftsharepoint', name: 'Microsoft SharePoint' },
  { slug: 'box', name: 'Box', wordmark: true },
  { slug: 'notion', name: 'Notion' },
  { slug: 'confluence', name: 'Confluence' },
  { slug: 'zendesk', name: 'Zendesk' },
];

function Chips({ logos, hidden = false }: { logos: Logo[]; hidden?: boolean }) {
  // Two passes per half so each half is wider than any screen: the loop
  // shifts by exactly one half, which must never expose an empty edge.
  return (
    <ul className="lp-marquee__list" aria-hidden={hidden || undefined}>
      {[...logos, ...logos].map((l, i) => (
        <li
          key={`${l.slug}-${i}`}
          className={`lp-logo ${i >= logos.length ? 'lp-logo--dup' : ''}`}
          aria-hidden={i >= logos.length || undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG logos, no optimization needed */}
          <img
            src={`/integrations/${l.slug}.${l.ext ?? 'svg'}`}
            alt={l.wordmark ? l.name : ''}
            className={l.wordmark ? 'lp-logo__mark lp-logo__mark--word' : 'lp-logo__mark'}
            decoding="async"
          />
          {!l.wordmark && <span>{l.name}</span>}
        </li>
      ))}
    </ul>
  );
}

function Row({ logos, reverse = false, duration }: { logos: Logo[]; reverse?: boolean; duration: string }) {
  return (
    <div className={`lp-marquee ${reverse ? 'lp-marquee--reverse' : ''}`} style={{ '--marquee-duration': duration } as CSSProperties}>
      <div className="lp-marquee__track">
        <Chips logos={logos} />
        <Chips logos={logos} hidden />
      </div>
    </div>
  );
}

export default function LogoMarquee({
  label = 'Works with the tools your team already uses',
}: {
  /** Small caption above the rows; pass null when a section heading already says it. */
  label?: string | null;
}) {
  return (
    <div className="lp-marquee-wrap">
      {label && (
        <p className="lp-mono text-center mb-5" style={{ color: 'var(--lp-muted)' }}>
          {label}
        </p>
      )}
      <div className="grid gap-2.5">
        <Row logos={FRONT} duration="90s" />
        <Row logos={BACK} reverse duration="80s" />
      </div>
    </div>
  );
}
