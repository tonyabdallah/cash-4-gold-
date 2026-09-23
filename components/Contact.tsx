'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Mail, MapPin, Phone } from 'lucide-react';
import Reveal from './Reveal';
import { CONTACT } from '@/lib/metals';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="kontakt" className="section section--rule">
      <div className="container split split--top">
        <Reveal className="contact__info">
          <div className="kicker">07 — Kontakt</div>
          <h2 className="display">Ihre kostenlose <em>Bewertung</em></h2>
          <p className="lead">
            Kontaktieren Sie uns noch heute und vereinbaren Sie einen Termin – wir ermitteln den echten Wert Ihrer
            Wertgegenstände mit Fachkompetenz und Transparenz.
          </p>
          <div className="contact__list">
            <a href={CONTACT.phoneHref}>
              <Phone size={22} strokeWidth={1.25} color="var(--color-accent)" />
              <span><small>Telefon</small><strong className="tnum">{CONTACT.phone}</strong></span>
            </a>
            <a href={`mailto:${CONTACT.email}`}>
              <Mail size={22} strokeWidth={1.25} color="var(--color-accent)" />
              <span><small>E-Mail</small><strong>{CONTACT.email}</strong></span>
            </a>
            <a href={CONTACT.maps} target="_blank" rel="noopener noreferrer">
              <MapPin size={22} strokeWidth={1.25} color="var(--color-accent)" />
              <span><small>Adresse</small><strong>{CONTACT.street}, {CONTACT.city}</strong></span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form className="form" onSubmit={onSubmit}>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div key="done" className="form__done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                  <span className="form__check"><Check size={24} strokeWidth={1.5} /></span>
                  <h3>Vielen Dank!</h3>
                  <p>Wir melden uns in Kürze bei Ihnen.</p>
                </motion.div>
              ) : (
                <motion.div key="form" className="form__fields" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <h3>Anfrage senden</h3>
                  <div className="form__row">
                    <div className="field"><label htmlFor="f-name">Name</label><input id="f-name" name="name" className="input" required /></div>
                    <div className="field"><label htmlFor="f-tel">Telefon</label><input id="f-tel" name="phone" type="tel" className="input" /></div>
                  </div>
                  <div className="field"><label htmlFor="f-mail">E-Mail</label><input id="f-mail" name="email" type="email" className="input" required /></div>
                  <div className="field">
                    <label htmlFor="f-art">Was möchten Sie verkaufen?</label>
                    <select id="f-art" name="category" className="input">
                      <option>Altgold &amp; Schmuck</option>
                      <option>Goldmünzen &amp; Barren</option>
                      <option>Silber</option>
                      <option>Platin &amp; Palladium</option>
                      <option>Zahngold</option>
                      <option>Luxusuhren</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="f-msg">Nachricht</label>
                    <textarea id="f-msg" name="message" className="input" rows={4} placeholder="z. B. Goldkette 585, ca. 20 g" />
                  </div>
                  <label className="check">
                    <input type="checkbox" name="consent" required />
                    <span className="check__box" />
                    Ich stimme der Verarbeitung meiner Daten gemäß Datenschutzerklärung zu.
                  </label>
                  {status === 'error' && <p className="form__error">Leider ist ein Fehler aufgetreten. Bitte rufen Sie uns an.</p>}
                  <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Wird gesendet …' : 'Kostenlose Bewertung anfragen'}
                    <ArrowRight size={18} strokeWidth={1.5} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
