import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'The Best Ibiza Escort Girls Models - Premium VIP Escorts',
  description:
    'Discover the World’s Most Stunning Escort Models in Ibiza, Madrid, Barcelona, Marbella, and Worldwide: VIP Models, Premium Models, Independent Models, Guy Models, and Trans Models.',
  keywords: [
    'Ibiza escorts',
    'Ibiza escort girls',
    'best model ibiza',
    'VIP companions Ibiza',
    'luxury yacht escorts',
    'Madrid escorts',
    'Barcelona models',
    'Marbella VIP escorts',
  ],
  metadataBase: new URL('https://bestmodelibiza.com'),
  openGraph: {
    title: 'The Best Ibiza Escort Girls Models - Premium VIP',
    description:
      'Discover the World’s Most Stunning Escort Models in Europe and World: VIP Models, Premium Models, Independent Model, Top Model Escort, Guys Model, Trans Models.',
    url: 'https://bestmodelibiza.com',
    siteName: 'Best Models Escort International',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://bestmodelibiza.com/wp-content/uploads/2023/05/Best-Model-Ibiza-1.png',
        width: 1200,
        height: 630,
        alt: 'Best Model Ibiza',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Best Ibiza Escort Girls Models - Premium VIP',
    description:
      'Discover the World’s Most Stunning Escort Models in Europe and World: VIP Models, Premium Models, Independent Model, Top Model Escort.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#08080c] text-white selection:bg-gold-500 selection:text-black">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
