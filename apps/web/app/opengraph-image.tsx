import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Cartra: transform your business with custom AI';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Same palette and pillar gradients as the site (landing.css, sierra).
const TEXT = '#282f3a';
const MUTED = '#68707d';
const ACCENT = '#0650b3';

const PILLARS = [
  { name: 'Cartra Voice', grad: 'linear-gradient(140deg, #1966d5 0%, #2675ec 52%, #3885fc 100%)' },
  { name: 'Cartra Agents', grad: 'linear-gradient(140deg, #467ccf 0%, #3a76d2 50%, #0267e8 100%)' },
  { name: 'Cartra Brain', grad: 'linear-gradient(140deg, #598fe4 0%, #487dd0 50%, #376cbd 100%)' },
];

export default async function OpenGraphImage() {
  // Satori can't read woff2, so the OG image ships its own TTF of Aeonik Regular.
  const [aeonik, logo] = await Promise.all([
    readFile(join(process.cwd(), 'app/fonts/aeonik-regular.ttf')),
    readFile(join(process.cwd(), 'public/cartra_geometric_logo_round.png')),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          color: TEXT,
          padding: 72,
          fontFamily: 'Aeonik',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src={logoSrc} width={48} height={48} alt="" style={{ borderRadius: 24 }} />
          <div style={{ fontSize: 38, letterSpacing: -1 }}>Cartra</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 84, lineHeight: 1.02, letterSpacing: -3.5 }}>
          <div>Transform your business</div>
          <div style={{ color: ACCENT }}>with custom AI.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            {PILLARS.map((p) => (
              <div
                key={p.name}
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  flex: 1,
                  height: 96,
                  padding: '0 24px 20px',
                  borderRadius: 16,
                  backgroundImage: p.grad,
                  color: '#ffffff',
                  fontSize: 28,
                  letterSpacing: -0.5,
                }}
              >
                {p.name}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 24, color: MUTED }}>
            AI voice agents, agent teammates, and a company brain, built around your business.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Aeonik', data: aeonik, weight: 400, style: 'normal' }],
    },
  );
}
