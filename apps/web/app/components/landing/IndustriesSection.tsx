'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useConsultation } from '../ConsultationProvider';
import { trackEvent } from '../../lib/analytics';
import { Arrow } from './primitives';
import { INDUSTRIES, INDUSTRY_PATH } from '../../content/industries';

/*
 * Industries: a horizontal row of tall photo cards with prev/next arrows. The
 * industry name sits on a dark fade at the bottom. The last card opens the
 * consultation form. Photos live in public/industries/; all are supplied
 * photos.
 */

export default function IndustriesSection() {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const open = useConsultation();

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [update]);

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 8 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  /** Scrolls the row so the given industry's card sits at its start. */
  const show = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    const left = card.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft;
    el.scrollTo({ left, behavior: 'smooth' });
  };

  return (
    <section id="industries" className="lp-section lp-anchor lp-ind-section" aria-labelledby="industries-title">
      <div className="lp-wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="lp-tag">Industries</p>
            <h2 id="industries-title" className="lp-statement mt-3 max-w-[22ch]">
              Built for the industries that power the economy
            </h2>
          </div>
          <div className="flex gap-2">
            <button type="button" className="lp-ind__nav" aria-label="Previous industries" disabled={atStart} onClick={() => page(-1)}>
              <Arrow />
            </button>
            <button type="button" className="lp-ind__nav" aria-label="More industries" disabled={atEnd} onClick={() => page(1)}>
              <Arrow />
            </button>
          </div>
        </div>

        {/* Every industry at a glance; each chip brings its card into view. */}
        <ul className="lp-ind__chips mt-6" aria-label="Jump to an industry">
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.slug}>
              <button type="button" className="lp-ind__chip" onClick={() => show(i)}>
                {ind.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="lp-wrap lp-ind__wrap mt-8 lg:mt-10">
        <ul ref={track} className="lp-ind" aria-label="Industries we serve">
          {INDUSTRIES.map((ind) => (
            <li key={ind.slug}>
              <a href={INDUSTRY_PATH(ind.slug)} className="lp-ind__card">
                {ind.photo && <Photo file={ind.photo} focus={ind.focus} />}
                <span className="lp-ind__text">
                  <span className="lp-ind__name">{ind.name}</span>
                </span>
                <span className="lp-ind__go" aria-hidden>
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              aria-haspopup="dialog"
              className="lp-ind__card"
              onClick={() => {
                trackEvent('consultation_cta_click', { cta_location: 'landing_industries', cta_text: 'Your industry' });
                open();
              }}
            >
              <Photo file="any-motion.webp" />
              <span className="lp-ind__text">
                <span className="lp-ind__name">Your industry</span>
              </span>
              <span className="lp-ind__go" aria-hidden>
                <Arrow />
              </span>
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}

/** Card photo: decorative (the card's text names it), with a fade for legibility. */
function Photo({ file, focus }: { file: string; focus?: string }) {
  return (
    <>
      <Image
        src={`/industries/${file}`}
        alt=""
        fill
        sizes="(min-width: 1024px) 28rem, 84vw"
        className="lp-ind__photo"
        style={focus ? { objectPosition: focus } : undefined}
      />
      <span className="lp-ind__fade" aria-hidden />
    </>
  );
}
