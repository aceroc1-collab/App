import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost, Space_Mono } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PEPTILAB | Science. Quality. Results.',
  description: 'Premium peptide research compounds. Tirzepatida, Retatrutida, BPC-157, TB-500, NAD+, GHK-CU y más. Calidad científica de alto nivel.',
  keywords: ['peptilab', 'péptidos', 'investigación', 'tirzepatida', 'retatrutida', 'bpc-157', 'tb-500', 'nad+'],
  authors: [{ name: 'PEPTILAB' }],
  creator: 'PEPTILAB',
  publisher: 'PEPTILAB',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PEPTILAB',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://peptilab.vercel.app',
    title: 'PEPTILAB | Science. Quality. Results.',
    description: 'Premium peptide research compounds. Calidad científica de alto nivel.',
    siteName: 'PEPTILAB',
    images: [{ url: '/logo.jpg', width: 1080, height: 1080, alt: 'PEPTILAB Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PEPTILAB | Science. Quality. Results.',
    description: 'Premium peptide research compounds.',
    images: ['/logo.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icons/icon-152x152.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#C9A84C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jost.variable} ${spaceMono.variable}`}>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="PEPTILAB" />
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-startup-image" href="/logo.jpg" />
      </head>
      <body className="bg-obsidian-900 text-silver-300 font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
