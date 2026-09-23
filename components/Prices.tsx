'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import Sparkline from './Sparkline';
import { usePrices } from './PricesProvider';
import { METALS, changePct, eur, formatChange, num } from '@/lib/metals';

export default function Prices() {
  const { spot, open, history, payout, updatedAt } = usePrices();
  const [selected, setSelected] = useState('gold');
  const sel = METALS.find((m) => m.id === selected)!;

  const stamp = updatedAt
    ? `${updatedAt.toLocaleDateString('de-DE')}, ${updatedAt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} Uhr`
    : 'wird geladen …';

  return (
    <section id="preise" className="section section--rule">
      <div className="container">
        <Reveal className="section-head">
          <div className="section-head__main">
            <div className="kicker">01 — Tageskurse</div>
            <h2 className="display">Aktuelle <em>Ankaufspreise</em></h2>
            <p className="lead">
              Wir bieten Ihnen stets faire Ankaufspreise auf Basis der aktuellen Börsenkurse – transparent für jede Legierung.
            </p>
          </div>
          <div className="stamp tnum"><span className="live-dot" />Stand: {stamp}</div>
        </Reveal>

        <Reveal className="metal-cards">
          {METALS.map((m) => {
            const p = m.purities[0];
            const c = changePct(spot[m.base], open[m.base]);
            const active = m.id === selected;
            return (
              <button
                key={m.id}
                type="button"
                className={`metal-card${active ? ' is-active' : ''}`}
                onClick={() => setSelected(m.id)}
                aria-pressed={active}
              >
                <div className="metal-card__top">
                  <span className="metal-card__name">{m.name}</span>
                  <span className="metal-card__sym">{m.symbol}</span>
                </div>
                <div className="metal-card__price tnum">
                  <span>{eur.format(spot[m.base] * p.fineness * payout)}</span>
                  <small>Ankauf je g · {p.label}</small>
                </div>
                <Sparkline data={history[m.base]} height={34} />
                <span className={`metal-card__change tnum ${c >= 0 ? 'is-up' : 'is-down'}`}>{formatChange(c)} · 24 Std.</span>
              </button>
            );
          })}
        </Reveal>

        <Reveal className="purity">
          <div className="purity__intro">
            <h3>{sel.name} nach Feingehalt</h3>
            <p className="justify">
              Der Ankaufspreis richtet sich nach dem Feingehalt Ihrer Stücke und dem aktuellen Tageskurs. Die Punze – etwa
              585 oder 750 – verrät den Anteil an reinem Edelmetall. Für Münzen und Barren erstellen wir Ihnen ein
              individuelles Angebot.
            </p>
            <a href="#rechner" className="btn btn-ghost">Eigenen Wert berechnen <ArrowRight size={16} strokeWidth={1.5} /></a>
          </div>
          <div className="table-wrap">
            <table className="table tnum">
              <thead>
                <tr>
                  <th>Legierung</th>
                  <th>Feingehalt</th>
                  <th className="r">je 1 g</th>
                  <th className="r">je 10 g</th>
                  <th className="r">je 100 g</th>
                </tr>
              </thead>
              <AnimatePresence mode="wait">
                <motion.tbody
                  key={sel.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {sel.purities.map((p) => {
                    const g = spot[sel.base] * p.fineness * payout;
                    return (
                      <tr key={p.label}>
                        <td><span className="purity__label">{p.label}</span><span className="purity__sub">{p.sub}</span></td>
                        <td className="muted">{num(p.fineness * 100, 1)} %</td>
                        <td className="r">{eur.format(g)}</td>
                        <td className="r">{eur.format(g * 10)}</td>
                        <td className="r accent-text">{eur.format(g * 100)}</td>
                      </tr>
                    );
                  })}
                </motion.tbody>
              </AnimatePresence>
            </table>
            <p className="footnote">
              Ankaufspreise inkl. {num(payout * 100, 0)} % Ankaufsquote auf den Tageskurs. Alle Angaben unverbindlich.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
