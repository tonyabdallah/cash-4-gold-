'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { BASE_PRICES, PAYOUT_RATE, SIMULATE_LIVE, seedHistory, type BaseMetal } from '@/lib/metals';

type Prices = Record<BaseMetal, number>;
export type PriceContext = {
  spot: Prices;
  open: Prices;
  history: Record<BaseMetal, number[]>;
  updatedAt: Date | null;
  payout: number;
};

const Ctx = createContext<PriceContext | null>(null);

export function PricesProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(() => {
    const seeded = seedHistory(BASE_PRICES);
    return { spot: { ...BASE_PRICES }, open: seeded.open, history: seeded.history, updatedAt: null as Date | null };
  });

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        const res = await fetch('/api/prices', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (!alive || !data?.spot) return;
        setState((s) => {
          const history = { ...s.history };
          (Object.keys(data.spot) as BaseMetal[]).forEach((k) => {
            history[k] = [...s.history[k].slice(1), data.spot[k]];
          });
          return { spot: data.spot, open: data.open ?? s.open, history, updatedAt: new Date(data.updatedAt ?? Date.now()) };
        });
      } catch {
        /* keep last known prices */
      }
    };

    load();
    const poll = setInterval(load, 60_000);

    const sim = SIMULATE_LIVE
      ? setInterval(() => {
          setState((s) => {
            const spot = { ...s.spot };
            const history = { ...s.history };
            (Object.keys(spot) as BaseMetal[]).forEach((k) => {
              spot[k] = spot[k] * (1 + (Math.random() - 0.5) * 0.0026);
              history[k] = [...s.history[k].slice(1), spot[k]];
            });
            return { ...s, spot, history, updatedAt: new Date() };
          });
        }, 3200)
      : null;

    return () => {
      alive = false;
      clearInterval(poll);
      if (sim) clearInterval(sim);
    };
  }, []);

  const value = useMemo(() => ({ ...state, payout: PAYOUT_RATE }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePrices() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('usePrices must be used inside <PricesProvider>');
  return ctx;
}
