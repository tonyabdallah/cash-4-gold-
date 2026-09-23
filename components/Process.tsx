'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import Reveal from './Reveal';

const STEPS = [
  { n: '01', title: 'Termin vereinbaren', text: 'Rufen Sie uns an oder schreiben Sie uns – wir finden kurzfristig einen Termin, der zu Ihnen passt.' },
  { n: '02', title: 'Transparente Prüfung', text: 'Wir prüfen und wiegen Ihre Stücke vor Ihren Augen und erklären jede Bewertung nachvollziehbar – kostenlos und unverbindlich.' },
  { n: '03', title: 'Sofortige Auszahlung', text: 'Sie erhalten ein faires Angebot nach Tageskurs. Sagen Sie zu, zahlen wir Ihnen den Betrag sofort aus.' },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.process__line',
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', transformOrigin: 'left center', scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'top 40%', scrub: true } },
      );
    },
    { scope: ref },
  );

  return (
    <section id="ablauf" className="section section--rule section--tint">
      <div className="container">
        <Reveal className="section-head__main" >
          <div className="kicker">04 — Ablauf</div>
          <h2 className="display">In drei Schritten <em>zum Bargeld</em></h2>
        </Reveal>
        <div className="process" ref={ref}>
          <div className="process__line" />
          <div className="process__grid">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} className="process__step" delay={i * 0.12}>
                <span className="process__num tnum">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
