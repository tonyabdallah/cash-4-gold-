# Cash 4 Gold – Next.js Website

Next.js 15 (App Router) · React 19 · TypeScript · GSAP + ScrollTrigger · Framer Motion · lucide-react

## Lokal starten

1. **Node.js installieren** – Version 18.18 oder neuer (empfohlen: 20 LTS) von https://nodejs.org
   Prüfen: `node -v`
2. **ZIP entpacken** und im Terminal in den Ordner wechseln:
   ```bash
   cd cash4gold-nextjs
   ```
3. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```
4. **Entwicklungsserver starten:**
   ```bash
   npm run dev
   ```
5. Browser öffnen: **http://localhost:3000**

Produktions-Build:
```bash
npm run build
npm start
```

## Struktur

```
app/
  layout.tsx           Fonts (Cormorant Garamond + Lora), SEO-Metadaten
  page.tsx             Startseite – setzt alle Sektionen zusammen
  globals.css          Design-Tokens (Gold / Schwarz / Weiß) + alle Styles
  api/prices/route.ts  ← HIER echte Edelmetallkurse anbinden
  api/contact/route.ts ← HIER E-Mail-Versand des Kontaktformulars anbinden
components/
  PricesProvider.tsx   Globaler Kurs-State (lädt /api/prices, pollt alle 60 s)
  Header.tsx           Sticky Header, Kurs-Ticker (GSAP), Mega-Menü (Framer Motion)
  Hero.tsx             Intro-Animation + Parallax (GSAP ScrollTrigger)
  Prices.tsx           Tageskurse + Tabelle nach Feingehalt
  Calculator.tsx       Goldrechner (animierter Betrag mit Framer Motion)
  Services, Process, About, Locations, Contact, Footer
lib/
  metals.ts            Metalle, Feingehalte, Ankaufsquote, Kontaktdaten, Städte
  gsap.ts              GSAP-Plugin-Registrierung
public/images/         Logo & Bilder
```

## Echte Kurse anbinden

1. In `app/api/prices/route.ts` die Demo-Werte durch einen API-Aufruf ersetzen
   (z. B. goldapi.io, metals-api.com). Rückgabe: **EUR pro Gramm Feinmetall**
   (Feinunze → Gramm: `preis / 31.1034768`).
2. API-Key in `.env.local` ablegen, z. B. `METALS_API_KEY=...`, und über `process.env.METALS_API_KEY` lesen.
3. In `lib/metals.ts` `SIMULATE_LIVE = false` setzen (schaltet die Demo-Kursbewegung ab).
4. Ankaufsquote anpassen: `PAYOUT_RATE` in `lib/metals.ts` (0.95 = 95 %).

## Offen

- Seiten `/impressum` und `/datenschutz` anlegen (Pflicht in Deutschland).
- Einzelne Städte-Landingpages (z. B. `/goldankauf-frankfurt`) bei Bedarf als `app/[stadt]/page.tsx`.
