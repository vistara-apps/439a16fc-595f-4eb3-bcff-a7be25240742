import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShipnEarn - Decentralized Delivery Marketplace',
  description: 'Deliver locally, get paid instantly. Your decentralized bounty marketplace for deliveries.',
  keywords: ['delivery', 'blockchain', 'base', 'courier', 'bounty', 'decentralized'],
  authors: [{ name: 'ShipnEarn Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
