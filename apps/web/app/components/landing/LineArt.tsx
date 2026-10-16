/*
 * Generated architectural line work for the process cards. Stands in for
 * Varick's duotone building photography without stock imagery.
 */

type Variant = 'arcs' | 'fins' | 'sweep' | 'grid';

const r = (n: number) => Math.round(n * 10) / 10;

function arcs() {
  const paths: string[] = [];
  for (let i = 0; i < 46; i++) {
    const rad = 120 + i * 22;
    paths.push(`M ${r(1200 - rad)} 600 A ${rad} ${rad} 0 0 1 1200 ${r(600 - rad)}`);
  }
  return paths;
}

function fins() {
  const paths: string[] = [];
  const vx = 1500;
  const vy = -300;
  for (let i = 0; i < 60; i++) {
    const x = 300 + i * 22;
    paths.push(`M ${x} 600 L ${r(x + (vx - x) * 0.55)} ${r(600 + (vy - 600) * 0.55)}`);
  }
  for (let k = 0; k < 14; k++) {
    const y = 600 - k * 34;
    paths.push(`M ${300 + k * 40} ${y} Q 900 ${y - 60 - k * 6} 1200 ${y - 140 - k * 8}`);
  }
  return paths;
}

function sweep() {
  const paths: string[] = [];
  for (let i = 0; i < 52; i++) {
    const o = i * 14;
    paths.push(`M -50 ${r(620 - o * 0.2)} C 300 ${r(560 - o)}, 700 ${r(700 - o * 1.4)}, 1250 ${r(120 + o * 0.35)}`);
  }
  return paths;
}

function grid() {
  const paths: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = i * 30;
    paths.push(`M ${x} 0 L ${x} 600`);
  }
  for (let j = 0; j <= 20; j++) {
    const y = j * 30;
    paths.push(`M 0 ${y} L 1200 ${y}`);
  }
  return paths;
}

const BUILDERS: Record<Variant, () => string[]> = { arcs, fins, sweep, grid };

export default function LineArt({
  variant,
  color = 'currentColor',
  opacity = 0.35,
  accent,
}: {
  variant: Variant;
  color?: string;
  opacity?: number;
  /** Highlight every nth line in the brand orange. */
  accent?: number;
}) {
  const paths = BUILDERS[variant]();
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMaxYMax slice" aria-hidden>
      <g fill="none" strokeWidth={variant === 'grid' ? 0.75 : 1} vectorEffect="non-scaling-stroke">
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={accent && i % accent === 0 ? 'var(--lp-glow)' : color}
            strokeOpacity={accent && i % accent === 0 ? 0.9 : opacity}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
