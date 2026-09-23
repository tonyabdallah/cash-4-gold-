'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { usePrices } from './PricesProvider';
import { CONTACT, METALS, REGIONS, changePct, eur, formatChange } from '@/lib/metals';

const LINKS = [
  { href: '#preise', label: 'Preise' },
  { href: '#rechner', label: 'Goldrechner' },
  { href: '#ueber-uns', label: 'Über uns' },
  { href: '#kontakt', label: 'Kontakt' },
];

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function Header() {
  const { spot, open, payout } = usePrices();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  useGSAP(
    () => {
      gsap.to('.ticker__track', { xPercent: -50, duration: 50, ease: 'none', repeat: -1 });
    },
    { scope: tickerRef },
  );

  const items = METALS.map((m) => {
    const p = m.purities[0];
    const c = changePct(spot[m.base], open[m.base]);
    return {
      id: m.id,
      name: m.id === 'zahngold' ? 'Zahngold hochgoldh.' : `${m.name} ${p.label}`,
      price: `${eur.format(spot[m.base] * p.fineness * payout)} /g`,
      change: formatChange(c),
      up: c >= 0,
    };
  });

  return (
    <header className="header">
      <div className="ticker" ref={tickerRef} aria-label="Aktuelle Ankaufspreise">
        <div className="ticker__track">
          {[...items, ...items].map((t, i) => (
            <span className="ticker__item" key={t.id + i} aria-hidden={i >= items.length}>
              <span className="ticker__name">{t.name}</span>
              <span className="ticker__price">{t.price}</span>
              <span className={t.up ? 'up' : 'down'}>{t.change}</span>
            </span>
          ))}
        </div>
      </div>

      <nav className={`nav${scrolled ? ' is-scrolled' : ''}`} aria-label="Hauptnavigation">
        <div className="container nav__inner">
          <a href="#start" className="nav__brand" aria-label="Cash 4 Gold – Startseite">
            <Image src="/images/logo.jpeg" alt="Cash 4 Gold" width={1511} height={1600} className="nav__logo" priority />
          </a>

          <div className="nav__links">
            <a className="nav__link" href="#start">Startseite</a>
            <div className="nav__mega-trigger" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
              <a className="nav__link" href="#standorte" aria-expanded={mega} aria-haspopup="true">
                Standorte <ChevronDown size={14} strokeWidth={1.5} />
              </a>
              <AnimatePresence>
                {mega && (
                  <motion.div
                    className="mega"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease }}
                  >
                    <div className="container mega__grid">
                      {REGIONS.map((r, i) => (
                        <motion.div
                          key={r.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.04 * i, ease }}
                        >
                          <div className="mega__title">{r.name}</div>
                          <div className="mega__cities">
                            {r.cities.map((c) => (
                              <a key={c} href="#standorte" onClick={() => setMega(false)}>{c}</a>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {LINKS.map((l) => (
              <a key={l.href} className="nav__link" href={l.href}>{l.label}</a>
            ))}
          </div>

          <div className="nav__actions">
            <a href={CONTACT.phoneHref} className="nav__phone tnum">
              <Phone size={16} strokeWidth={1.5} color="var(--color-accent)" />
              {CONTACT.phone}
            </a>
            <a href="#rechner" className="btn btn-primary">Wert berechnen</a>
          </div>

          <div className="nav__mobile">
            <a href={CONTACT.phoneHref} className="btn btn-secondary btn-icon btn-touch" aria-label="Anrufen">
              <Phone size={18} strokeWidth={1.5} color="var(--color-accent)" />
            </a>
            <button
              type="button"
              className="btn btn-secondary btn-icon btn-touch"
              aria-label={mobile ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={mobile}
              onClick={() => setMobile((m) => !m)}
            >
              {mobile ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobile && (
            <motion.div
              className="mobile-menu"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.45, ease }}
            >
              <div className="container mobile-menu__inner">
                {[{ href: '#start', label: 'Startseite' }, { href: '#standorte', label: 'Standorte' }, ...LINKS].map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    className="mobile-menu__link"
                    onClick={() => setMobile(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * i, ease }}
                  >
                    {l.label}
                  </motion.a>
                ))}
                <a href={CONTACT.phoneHref} className="btn btn-primary btn-lg" style={{ marginTop: 20 }}>
                  {CONTACT.phone} anrufen
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
