import Reveal from './Reveal';
import ZoomImage from './ZoomImage';

const SMALL = [
  { n: 'iii. Ag', title: 'Silber', text: 'Verwandeln Sie ungenutztes Silber in Bargeld – einfacher Ankauf und attraktive Preise für alle Silberarten.' },
  { n: 'iv. Pt · Pd', title: 'Platin & Palladium', text: 'Schnelle, transparente und faire Bewertung – egal ob Schmuck, Barren oder Industrieplatin.' },
  { n: 'v. Au', title: 'Zahngold', text: 'Auch Zahngold mit Resten von Keramik oder Zahnsubstanz bewerten wir fair nach Edelmetallanteil.' },
  { n: 'vi.', title: 'Luxusuhren', text: 'Verkaufen Sie Ihre Luxusuhr unkompliziert und schnell – mit fachkundiger Einschätzung des Marktwerts.' },
];

export default function Services() {
  return (
    <section id="leistungen" className="section">
      <div className="container">
        <Reveal className="section-head">
          <div className="section-head__main">
            <div className="kicker">03 — Ankauf</div>
            <h2 className="display">Was wir <em>ankaufen</em></h2>
          </div>
          <p className="lead" style={{ maxWidth: '26em' }}>
            Unser vielfältiges Serviceangebot hilft Ihnen, den maximalen Wert Ihrer Gegenstände zu erzielen.
          </p>
        </Reveal>

        <div className="services">
          <Reveal className="service">
            <ZoomImage src="/images/bars-coins.jpg" alt="Goldbarren und Goldmünzen" />
            <div className="service__body">
              <span className="numeral">i.</span>
              <div>
                <h3>Goldmünzen &amp; Barren</h3>
                <p className="justify">
                  Lassen Sie sich von unseren Experten fair bewerten und sichern Sie sich sofort Bargeld für Ihre wertvollen
                  Stücke – vom Krügerrand bis zum Kilobarren.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal className="service service--offset" delay={0.1}>
            <ZoomImage src="/images/jewelry-box.jpg" alt="Schmuckkästchen mit Goldarmband und Perlen" position="50% 45%" />
            <div className="service__body">
              <span className="numeral">ii.</span>
              <div>
                <h3>Altgold &amp; Schmuck</h3>
                <p className="justify">
                  Altgold verkaufen leicht gemacht – wir kaufen jede Art von Altgold, auch defekten Schmuck, und zahlen Ihnen
                  den besten Preis nach aktuellem Marktwert.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="services-small">
          {SMALL.map((s, i) => (
            <Reveal key={s.title} className="services-small__item" delay={i * 0.08}>
              <span className="numeral">{s.n}</span>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
