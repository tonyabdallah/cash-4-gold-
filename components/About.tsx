import Reveal from './Reveal';

export default function About() {
  return (
    <section id="ueber-uns" className="section section--rule">
      <div className="container split">
        <Reveal className="about__quote">
          <div className="kicker">05 — Über uns</div>
          <blockquote>
            „Vertrauen Sie auf unsere Expertise – wir erzielen für Sie den <span className="accent">besten Preis</span>.“
          </blockquote>
          <div className="about__sign"><span />Cash 4 Gold, Wiesbaden</div>
        </Reveal>
        <Reveal className="about__text justify" delay={0.12}>
          <p>
            Cash 4 Gold ist Ihr Ansprechpartner für den Ankauf von Gold, Silber, Platin, Palladium und Luxusuhren. Jedes Stück
            wird fachkundig und transparent bewertet – direkt vor Ihren Augen und nach tagesaktuellem Marktwert.
          </p>
          <p>
            Ob Erbstück, defekter Schmuck, Zahngold oder Anlagemünzen: Sie erhalten ein faires, nachvollziehbares Angebot und
            auf Wunsch die sofortige Auszahlung.
          </p>
          <p>
            Von unserem Sitz in Wiesbaden betreuen wir Kundinnen und Kunden in Hessen, Baden-Württemberg, Bayern und Berlin –
            persönlich, diskret und ohne versteckte Kosten.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
