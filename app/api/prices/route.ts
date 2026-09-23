import { NextResponse } from 'next/server';
import { BASE_PRICES, INITIAL_DRIFT, type BaseMetal } from '@/lib/metals';

export const dynamic = 'force-dynamic';

/**
 * GET /api/prices
 * Returns spot prices in EUR per gram of FINE metal.
 *
 * TODO: Replace the demo values below with a real market-data provider
 * (e.g. goldapi.io, metals-api.com, metalpriceapi.com). Most providers return
 * prices per troy ounce – convert with: pricePerGram = pricePerOunce / 31.1034768
 * Keep your API key in .env.local (e.g. METALS_API_KEY=...) and read it via process.env.
 */
export async function GET() {
  const spot = { ...BASE_PRICES };
  const open = Object.fromEntries(
    (Object.keys(spot) as BaseMetal[]).map((k) => [k, spot[k] / (1 + INITIAL_DRIFT[k])]),
  );

  return NextResponse.json({
    currency: 'EUR',
    unit: 'g',
    updatedAt: new Date().toISOString(),
    spot,
    open, // price 24h ago – used for the % change
  });
}
