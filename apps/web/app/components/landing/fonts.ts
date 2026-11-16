import localFont from 'next/font/local';

/** Mono face for step labels, indices and UI chrome on the landing page. */
export const landingMono = localFont({
  src: '../../fonts/GeistMonoVF.woff',
  variable: '--font-lp-mono',
  weight: '100 900',
  display: 'swap',
});

/** Sans for the 'paper' palette: headings, body and UI. */
export const landingSans = localFont({
  src: '../../fonts/GeistVF.woff',
  variable: '--font-lp-sans',
  weight: '100 900',
  display: 'swap',
});
