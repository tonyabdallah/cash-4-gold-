import Image from 'next/image';
import { CONTACT } from '@/lib/metals';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Image src="/images/logo.jpeg" alt="Cash 4 Gold" width={1511} height={1600} className="footer__logo" />
          <p>Gold verkaufen zum Top-Preis. Faire Bewertung, transparente Preise und schnelle Auszahlung.</p>
        </div>
        <div className="footer__col">
          <span className="footer__title">Navigation</span>
          <a href="#start">Startseite</a>
          <a href="#preise">Preise</a>
          <a href="#rechner">Goldrechner</a>
          <a href="#ueber-uns">Über uns</a>
          <a href="#kontakt">Kontakt</a>
        </div>
        <div className="footer__col">
          <span className="footer__title">Ankauf</span>
          <a href="#leistungen">Altgold &amp; Schmuck</a>
          <a href="#leistungen">Goldmünzen &amp; Barren</a>
          <a href="#leistungen">Silber</a>
          <a href="#leistungen">Platin &amp; Palladium</a>
          <a href="#leistungen">Zahngold</a>
        </div>
        <div className="footer__col">
          <span className="footer__title">Kontakt</span>
          <a href={CONTACT.phoneHref} className="tnum">{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <span>{CONTACT.street}<br />{CONTACT.city}</span>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Cash 4 Gold. Alle Rechte vorbehalten.</span>
        <span className="footer__legal">
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
        </span>
      </div>
    </footer>
  );
}
