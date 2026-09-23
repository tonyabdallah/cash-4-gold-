import type { Metadata } from 'next';
import { Cormorant_Garamond, Lora } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const heading = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const body = Lora({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cash 4 Gold | Gold verkaufen zum Top-Preis',
  description:
    'Faire Bewertung, transparente Preise und schnelle Auszahlung für Gold, Silber, Platin, Palladium und Luxusuhren – nach tagesaktuellem Marktwert.',
  icons: { icon: '/images/logo.jpeg' },
  openGraph: {
    title: 'Cash 4 Gold | Gold verkaufen zum Top-Preis',
    description: 'Faire Bewertung, transparente Preise und schnelle Auszahlung für Gold & Edelmetalle.',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${heading.variable} ${body.variable}`}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
