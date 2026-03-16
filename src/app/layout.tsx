import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { initializeDatabase } from '@/lib/db';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bellavita Smart Home - India's Leading Automation Integrators",
  description: "Bellavita Smart Home is one of India's leading brands in smart home automation. With contemporary sensibilities, best-in-class technology and a deep understanding of the modern Indian home, we provide people with spaces they are proud to own and happy to call home.",
  keywords: "Bellavita Smart Home, smart home automation, lighting control, security systems, audio video integration, Mumbai, Pune, Bengaluru, Delhi",
  icons: {
    icon: "/images/logo/favicon.ico",
    shortcut: "/images/logo/favicon.ico",
    apple: "/images/logo/favicon.ico",
  },
  openGraph: {
    title: "Bellavita Smart Home - India's Leading Automation Integrators",
    description: "India's leading smart home automation brand with 6500+ projects completed since 2018",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bellavita Smart Home",
    description: "Transform your living space with intelligent automation solutions",
  },
};

// Initialize database on startup
initializeDatabase().catch(console.error);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
