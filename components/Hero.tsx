'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { usePrices } from './PricesProvider';
import Sparkline from './Sparkline';
import { changePct, eur, formatChange } from '@/lib/metals';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { spot, open, history } = usePrices();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.fromTo('.hero__line > span', { yPercent: 115, autoAlpha: 1 }, { yPercent: 0, duration: 1.3, stagger: 0.12 }, 0.1)
        .fromTo('[data-hero-img]', { scale: 0.9, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.8, stagger: 0.15 }, 0.15)
        .fromTo('[data-hero-fade]', { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out', stagger: 0.08 }, 0.45);

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax),
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });

      gsap.to('.badge__ring', { rotation: 360, duration: 24, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
      gsap.to('.ring--solid', { rotation: 360, duration: 120, repeat: -1, ease: 'none' });
    },
    { scope: ref },
  );

  const goldChange = formatChange(changePct(spot.gold, open.gold));

  return (
    <section id="start" className="hero" ref={ref}>
      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="kicker" data-hero-fade>Goldankauf · Wiesbaden &amp; deutschlandweit</div>
          <h1 className="hero__title">
            <span className="hero__line"><span>Gold verkaufen</span></span>
            <span className="hero__line"><span>zum <em>Top-Preis.</em></span></span>
          </h1>
          <p className="hero__lead" data-hero-fade>
            Faire Bewertung, transparente Preise und schnelle Auszahlung für Gold, Silber, Platin und Luxusuhren – immer
            nach tagesaktuellem Marktwert.
          </p>
          <div className="hero__ctas" data-hero-fade>
            <a href="#rechner" className="btn btn-primary btn-lg">
              Jetzt Wert berechnen <ArrowRight size={18} strokeWidth={1.5} />
            </a>
            <a href="#kontakt" className="btn btn-secondary btn-lg">Kostenlose Bewertung</a>
          </div>
          <div className="assure" data-hero-fade>
            <div><strong>Kostenlos</strong><span>Prüfung &amp; Beratung</span></div>
            <div><strong>Tageskurs</strong><span>Transparente Preise</span></div>
            <div><strong>Sofort</strong><span>Auszahlung vor Ort</span></div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="ring ring--solid" />
          <div className="ring ring--dashed" />
          <div className="hero__pile" data-parallax="-10">
            <div data-hero-img className="hero__img-wrap">
              <Image src="/images/gold-pile.png" alt="Goldschmuck – Ketten, Armbänder und Ringe" fill sizes="(max-width: 1100px) 90vw, 620px" priority />
            </div>
          </div>
          <div className="hero__coins" data-parallax="22">
            <div data-hero-img className="hero__img-wrap">
              <Image src="/images/coin-stack.png" alt="Stapel Goldmünzen" fill sizes="280px" />
            </div>
          </div>

          <a href="#rechner" className="badge" aria-label="Zum Goldrechner">
            <svg className="badge__ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="c4g-ring" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
              </defs>
              <text>
                <textPath href="#c4g-ring" textLength={495} lengthAdjust="spacing">
                  Goldrechner · Wert berechnen · Goldrechner · Wert berechnen ·
                </textPath>
              </text>
            </svg>
            <span className="badge__core"><ArrowDown size={20} strokeWidth={1.5} /></span>
          </a>

          <div className="price-card" data-hero-fade>
            <div className="price-card__head">
              <span>Goldpreis heute</span>
              <span className="live"><span className="live-dot" />Live</span>
            </div>
            <div className="price-card__value tnum">
              <span>{eur.format(spot.gold)}</span>
              <small>/ g</small>
            </div>
            <div className="price-card__meta tnum">
              Feingold 999,9 · <span className="accent-text">{goldChange}</span> heute
            </div>
            <Sparkline data={history.gold} height={40} />
          </div>
        </div>
      </div>
    </section>
  );
}
