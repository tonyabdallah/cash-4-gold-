'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import Reveal from './Reveal';
import { usePrices } from './PricesProvider';
import { CONTACT, METALS, eur, num } from '@/lib/metals';

export default function Calculator() {
  const { spot, payout } = usePrices();
  const [metalId, setMetalId] = useState('gold');
  const [purityIdx, setPurityIdx] = useState(2);
  const [weight, setWeight] = useState('25');

  const metal = METALS.find((m) => m.id === metalId)!;
  const purity = metal.purities[purityIdx] ?? metal.purities[0];
  const grams = Math.max(0, parseFloat(weight.replace(',', '.')) || 0);
  const total = grams * purity.fineness * spot[metal.base] * payout;

  // Framer Motion number tween for the result
  const [shown, setShown] = useState(total);
  const current = useRef(total);
  useEffect(() => {
    const controls = animate(current.current, total, {
      duration: 0.9,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => {
        current.current = v;
        setShown(v);
      },
    });
    return () => controls.stop();
  }, [total]);

  return (
    <section id="rechner" className="section section--dark">
      <div className="ring ring--calc-a" />
      <div className="ring ring--calc-b" />
      <div className="container calc">
        <Reveal className="calc__controls">
          <div className="section-head__main">
            <div className="kicker">02 — Goldrechner</div>
            <h2 className="display">Was ist Ihr <em>Edelmetall</em> wert?</h2>
            <p className="lead lead--dark">
              Wählen Sie Metall, Feingehalt und Gewicht – wir berechnen Ihren Ankaufswert live nach aktuellem Marktpreis.
            </p>
          </div>

          <fieldset className="calc__group">
            <legend className="calc__label">Metall</legend>
            <div className="chips">
              {METALS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`chip${m.id === metalId ? ' is-active' : ''}`}
                  aria-pressed={m.id === metalId}
                  onClick={() => {
                    setMetalId(m.id);
                    setPurityIdx(m.defaultPurity);
                  }}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="calc__group">
            <legend className="calc__label">Feingehalt</legend>
            <div className="chips chips--grid">
              {metal.purities.map((p, i) => (
                <button
                  key={p.label}
                  type="button"
                  className={`chip chip--purity${i === purityIdx ? ' is-active' : ''}`}
                  aria-pressed={i === purityIdx}
                  onClick={() => setPurityIdx(i)}
                >
                  <span className="tnum">{p.label}</span>
                  <small>{p.sub}</small>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="calc__group">
            <label htmlFor="c4g-weight" className="calc__label">Gewicht</label>
            <div className="weight">
              <input
                id="c4g-weight"
                type="text"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="weight__input tnum"
              />
              <span className="weight__unit">Gramm</span>
            </div>
            <input
              type="range"
              min={1}
              max={500}
              step={1}
              value={Math.min(500, Math.max(1, Math.round(grams)))}
              onChange={(e) => setWeight(e.target.value)}
              aria-label="Gewicht in Gramm"
              className="weight__range"
            />
            <div className="weight__scale tnum"><span>1 g</span><span>250 g</span><span>500 g</span></div>
          </div>
        </Reveal>

        <Reveal className="result" delay={0.15}>
          <span className="result__inner-rule" />
          <div className="result__head">
            <span>Geschätzter Ankaufswert</span>
            <span className="live live--dark"><span className="live-dot" />Live-Kurs</span>
          </div>
          <div className="result__value tnum" aria-live="polite">{eur.format(Math.max(0, shown))}</div>
          <dl className="result__rows tnum">
            <div><dt>Auswahl</dt><dd>{metal.name} {purity.label}{metal.id === 'zahngold' ? '' : ` · ${purity.sub}`}</dd></div>
            <div><dt>Reines Edelmetall</dt><dd>{num(grams * purity.fineness)} g</dd></div>
            <div><dt>Tageskurs Feinmetall</dt><dd>{eur.format(spot[metal.base])} /g</dd></div>
            <div><dt>Ankaufsquote</dt><dd>{num(payout * 100, 0)} %</dd></div>
          </dl>
          <div className="result__ctas">
            <a href="#kontakt" className="btn btn-lg btn-on-dark">Angebot anfordern</a>
            <a href={CONTACT.phoneHref} className="btn btn-lg btn-on-dark-quiet tnum">{CONTACT.phone}</a>
          </div>
          <p className="result__note">
            Unverbindliche Schätzung auf Basis des aktuellen Kurses. Der finale Preis wird nach fachkundiger Prüfung Ihrer
            Stücke ermittelt.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
