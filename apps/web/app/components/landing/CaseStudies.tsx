'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CaseStudy } from '../../content/case-studies';
import { Arrow } from './primitives';

/*
 * Case studies as wide, short cards in a horizontal row (the next card peeks
 * in): the outcome headline, the figures, and the client, beside a photo that runs flush to the card's edges.
 * The longer write-up fields in case-studies.ts (challenge, built, steps) are
 * kept for dedicated case study pages.
 */

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="lp-cs__check">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CaseStudies({ studies, title = 'Results measured in production' }: { studies: CaseStudy[]; title?: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const cardStep = (el: HTMLElement) => {
    const first = el.children[0] as HTMLElement | undefined;
    const second = el.children[1] as HTMLElement | undefined;
    if (!first) return el.clientWidth;
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  };

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setIndex(Math.min(studies.length - 1, Math.round(el.scrollLeft / cardStep(el))));
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, [studies.length]);

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

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: Math.max(0, i) * cardStep(el), behavior: 'smooth' });
  };

  const many = studies.length > 1;

  return (
    <section className="lp-section lp-dark" aria-labelledby="case-studies-title">
      <div className="lp-wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="lp-tag">Case studies</p>
            <h2 id="case-studies-title" className="lp-statement mt-3">
              {title}
            </h2>
          </div>
          {many && (
            <div className="flex gap-2">
              <button type="button" className="lp-ind__nav" aria-label="Previous case study" disabled={index === 0} onClick={() => go(index - 1)}>
                <Arrow />
              </button>
              <button type="button" className="lp-ind__nav" aria-label="Next case study" disabled={atEnd} onClick={() => go(index + 1)}>
                <Arrow />
              </button>
            </div>
          )}
        </div>

        <ul ref={track} className={`lp-cs mt-10 ${many ? '' : 'lp-cs--single'}`} aria-label="Case studies">
          {studies.map((s) => {
            const stats = s.results.filter((r) => r.value).slice(0, 2);
            const points = s.results.filter((r) => !r.value);
            return (
              <li key={s.id}>
                <article className={`lp-cs__card ${s.photo ? '' : 'lp-cs__card--text'}`}>
                  <div className="lp-cs__body">
                    <h3 className="lp-cs__title">{s.title}</h3>

                    <div className="lp-cs__foot">
                      {stats.length > 0 ? (
                        <dl className="lp-cs__stats">
                          {stats.map((r) => (
                            <div key={r.label}>
                              <dt>{r.label}</dt>
                              <dd>{r.value}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : (
                        <ul className="lp-cs__points">
                          {points.slice(0, 2).map((r) => (
                            <li key={r.label}>
                              <Check />
                              {r.label}
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="lp-cs__client">
                        <span>{s.client}</span>
                        <small>{s.agents ? s.agents.join(' · ') : 'Case study'}</small>
                      </p>
                    </div>
                  </div>
                  {s.photo && (
                    <div className="lp-cs__photo">
                      <Image
                        src={`/case-studies/${s.photo}`}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 32rem, 100vw"
                        style={s.photoFocus ? { objectPosition: s.photoFocus } : undefined}
                      />
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
