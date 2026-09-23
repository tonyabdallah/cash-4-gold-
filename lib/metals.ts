export type BaseMetal = 'gold' | 'silber' | 'platin' | 'palladium';
export type Purity = { label: string; sub: string; fineness: number };
export type Metal = {
  id: string;
  base: BaseMetal;
  name: string;
  symbol: string;
  defaultPurity: number;
  purities: Purity[];
};

/** Ankaufsquote auf den Tageskurs (0.95 = 95 %) */
export const PAYOUT_RATE = 0.95;

/** Simuliert Kursbewegungen im Browser (Demo). Auf false setzen, sobald echte Kurse angebunden sind. */
export const SIMULATE_LIVE = true;

/** Demo-Kurse in EUR pro Gramm Feinmetall – werden von /api/prices überschrieben. */
export const BASE_PRICES: Record<BaseMetal, number> = {
  gold: 118.4,
  silber: 1.384,
  platin: 37.22,
  palladium: 32.61,
};

export const INITIAL_DRIFT: Record<BaseMetal, number> = {
  gold: 0.0042,
  silber: -0.0018,
  platin: 0.0061,
  palladium: -0.0034,
};

export const METALS: Metal[] = [
  {
    id: 'gold', base: 'gold', name: 'Gold', symbol: 'Au', defaultPurity: 2,
    purities: [
      { label: '999,9', sub: '24 Karat', fineness: 0.9999 },
      { label: '916', sub: '22 Karat', fineness: 0.916 },
      { label: '750', sub: '18 Karat', fineness: 0.75 },
      { label: '585', sub: '14 Karat', fineness: 0.585 },
      { label: '333', sub: '8 Karat', fineness: 0.333 },
    ],
  },
  {
    id: 'zahngold', base: 'gold', name: 'Zahngold', symbol: 'Au', defaultPurity: 0,
    purities: [
      { label: 'Hochgoldhaltig', sub: 'ca. 72 % Au', fineness: 0.72 },
      { label: 'Goldreduziert', sub: 'ca. 45 % Au', fineness: 0.45 },
      { label: 'Palladiumbasis', sub: 'ca. 18 % Au', fineness: 0.18 },
    ],
  },
  {
    id: 'silber', base: 'silber', name: 'Silber', symbol: 'Ag', defaultPurity: 1,
    purities: [
      { label: '999', sub: 'Feinsilber', fineness: 0.999 },
      { label: '925', sub: 'Sterling', fineness: 0.925 },
      { label: '835', sub: 'Silberwaren', fineness: 0.835 },
      { label: '800', sub: 'Altsilber', fineness: 0.8 },
    ],
  },
  {
    id: 'platin', base: 'platin', name: 'Platin', symbol: 'Pt', defaultPurity: 1,
    purities: [
      { label: '999', sub: 'Feinplatin', fineness: 0.999 },
      { label: '950', sub: 'Schmuck', fineness: 0.95 },
      { label: '900', sub: 'Legierung', fineness: 0.9 },
    ],
  },
  {
    id: 'palladium', base: 'palladium', name: 'Palladium', symbol: 'Pd', defaultPurity: 0,
    purities: [
      { label: '999', sub: 'Feinpalladium', fineness: 0.999 },
      { label: '950', sub: 'Schmuck', fineness: 0.95 },
      { label: '500', sub: 'Legierung', fineness: 0.5 },
    ],
  },
];

export const REGIONS: { name: string; cities: string[] }[] = [
  { name: 'Hessen', cities: ['Frankfurt', 'Mainz', 'Darmstadt', 'Kassel', 'Marburg', 'Gießen'] },
  { name: 'Baden-Württemberg', cities: ['Stuttgart', 'Mannheim', 'Karlsruhe', 'Freiburg', 'Heidelberg', 'Heilbronn', 'Ulm', 'Pforzheim', 'Reutlingen', 'Esslingen', 'Tübingen', 'Ludwigsburg', 'Konstanz', 'Offenburg', 'Villingen-Schwenningen'] },
  { name: 'Bayern', cities: ['München', 'Nürnberg', 'Augsburg', 'Regensburg', 'Ingolstadt', 'Würzburg', 'Fürth', 'Erlangen', 'Bamberg', 'Bayreuth', 'Aschaffenburg', 'Landshut', 'Kempten', 'Rosenheim', 'Freising', 'Passau', 'Schweinfurt', 'Straubing'] },
  { name: 'Berlin', cities: ['Berlin Mitte', 'Charlottenburg', 'Spandau', 'Neukölln', 'Tempelhof', 'Kreuzberg', 'Lichtenberg', 'Marzahn', 'Hellersdorf', 'Reinickendorf', 'Steglitz', 'Zehlendorf', 'Köpenick', 'Treptow', 'Pankow'] },
];

export const CONTACT = {
  phone: '+49 160 8002101',
  phoneHref: 'tel:+491608002101',
  email: 'info@cash-4gold.de',
  street: 'In der Hofreite 17',
  city: '65207 Wiesbaden',
  maps: 'https://maps.google.com/?q=In+der+Hofreite+17+65207+Wiesbaden',
};

export const eur = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
export const num = (v: number, digits = 2) =>
  new Intl.NumberFormat('de-DE', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(v);

export const changePct = (spot: number, open: number) => ((spot - open) / open) * 100;
export const formatChange = (c: number) => (c >= 0 ? '▲ +' : '▼ −') + num(Math.abs(c)) + ' %';

/** Deterministic seeded history so server and client render identical sparklines. */
export function seedHistory(base: Record<BaseMetal, number>, points = 40) {
  let seed = 11;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const open = {} as Record<BaseMetal, number>;
  const history = {} as Record<BaseMetal, number[]>;
  (Object.keys(base) as BaseMetal[]).forEach((k) => {
    open[k] = base[k] / (1 + INITIAL_DRIFT[k]);
    const pts: number[] = [];
    let v = open[k];
    for (let i = 0; i < points - 1; i++) {
      pts.push(v);
      v = v * (1 + (rnd() - 0.5) * 0.007) + (base[k] - v) * 0.07;
    }
    pts.push(base[k]);
    history[k] = pts;
  });
  return { open, history };
}

export function sparkPath(arr: number[], w = 120, h = 36) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const r = max - min || 1;
  const n = arr.length;
  return arr
    .map((v, i) => `${i ? 'L' : 'M'}${((i / (n - 1)) * w).toFixed(2)},${(h - 2 - ((v - min) / r) * (h - 4)).toFixed(2)}`)
    .join(' ');
}
