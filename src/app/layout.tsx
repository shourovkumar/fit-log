import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { PlanProvider } from '@/context/PlanContext';
import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'FitLog — Workout Library',
  description: 'A dark, no-nonsense gym companion.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${inter.variable} font-inter bg-[#0a0a0a] text-white antialiased min-h-screen flex flex-col`}>
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastContainer position="top-right" autoClose={2000} theme="dark" />
        </PlanProvider>
      </body>
    </html>
  );
}
