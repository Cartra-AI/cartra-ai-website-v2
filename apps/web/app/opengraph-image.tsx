import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Cartra: your company, transformed for the AI era';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Same tokens as the site's "paper" palette (paper.css): warm off-white
// canvas, ink text, muted second clause, monochrome.
const BG = '#f7f7f4';
const INK = '#26251e';
const MUTED = 'rgba(38, 37, 30, 0.6)';
// The site's one signal color (paper.css --lp-orange): a few lit dots.
const ORANGE = '#f54e00';

/** A static echo of the hero's dot wave: rows of dots on a few sine waves. */
function dotWave() {
  const cols = 64;
  const rows = 9;
  const w = 1200;
  const top = 420;
  const dots: Array<{ x: number; y: number; r: number; o: number; lit: boolean }> = [];
  for (let j = 0; j < rows; j++) {
    const depth = j / (rows - 1);
    for (let i = 0; i < cols; i++) {
      const t = i / (cols - 1);
      const x = t * w;
      const y =
        top +
        j * 26 +
        34 * Math.sin(t * Math.PI * 2.2 + j * 0.35) * (0.55 + depth * 0.45) +
        12 * Math.sin(t * Math.PI * 5 - j * 0.6);
      const lit = j >= 3 && (i * 3 + j * 5) % 11 === 0;
      dots.push({ x, y, r: (lit ? 1.4 : 1.1) + depth * 1.5, o: lit ? 0.6 + depth * 0.4 : 0.1 + depth * 0.4, lit });
    }
  }
  return dots;
}

export default async function OpenGraphImage() {
  // Satori can't read woff or variable fonts, so the OG image ships a static
  // TTF of Geist Regular (instanced from GeistVF at wght 400, GPOS dropped:
  // Satori misapplies its kerning and leaves uneven word gaps).
  const [geist, logo] = await Promise.all([
    readFile(join(process.cwd(), 'app/fonts/geist-regular.ttf')),
    readFile(join(process.cwd(), 'public/cartra_geometric_logo_round.png')),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: BG,
          color: INK,
          padding: 72,
          fontFamily: 'Geist',
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: 'absolute', left: 0, top: 0 }}
        >
          {dotWave().map((d, k) => (
            <circle key={k} cx={d.x} cy={d.y} r={d.r} fill={d.lit ? ORANGE : INK} fillOpacity={d.o} />
          ))}
        </svg>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={logoSrc} width={44} height={44} alt="" style={{ borderRadius: 22 }} />
          <div style={{ fontSize: 34, letterSpacing: -0.6 }}>Cartra</div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 64,
            fontSize: 76,
            lineHeight: 1.08,
            letterSpacing: -2,
            whiteSpace: 'nowrap',
          }}
        >
          <div>Your company,</div>
          <div style={{ color: MUTED }}>transformed for the AI era.</div>
        </div>

        <div style={{ marginTop: 28, fontSize: 26, color: MUTED, letterSpacing: -0.2 }}>
          Custom AI agents, built around how your business works.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Geist', data: geist, weight: 400, style: 'normal' }],
    },
  );
}
