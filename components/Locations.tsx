import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { REGIONS } from '@/lib/metals';

export default function Locations() {
  return (
    <section id="standorte" className="section section--rule section--tint">
      <div className="container">
        <Reveal className="section-head__main" >
          <div className="kicker">06 — Standorte</div>
          <h2 className="display">Goldankauf <em>in Ihrer Nähe</em></h2>
        </Reveal>
        <div className="regions">
          {REGIONS.map((r, i) => (
            <Reveal key={r.name} className="region" delay={i * 0.08}>
              <div className="region__head">
                <h3>{r.name}</h3>
                <span className="tnum">{r.cities.length} Städte</span>
              </div>
              <ul>
                {r.cities.map((c) => (
                  <li key={c}>
                    <a href="#kontakt">
                      Goldankauf {c}
                      <ArrowUpRight size={14} strokeWidth={1.5} color="var(--color-accent)" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
