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
  metadataBase: new URL('https://bellavita.com'),
  title: {
    default: "Bellavita Smart Home — Best Home Automation Brand in Mumbai, Maharashtra & India",
    template: "%s | Bellavita Smart Home — Best Home Automation in India",
  },
  description: "Bellavita is India's best home automation brand based in Mumbai, Maharashtra. We deliver premium smart home solutions — smart lighting, security, curtains, climate control & home theatre — with 6500+ projects completed since 2018. Trusted by homeowners, builders & architects across Mumbai, Pune, Bengaluru, Delhi & all of India.",
  keywords: [
    "best home automation brand in mumbai",
    "best home automation brand in india",
    "best home automation brand in maharashtra",
    "home automation mumbai",
    "smart home automation india",
    "home automation company mumbai",
    "smart home solutions mumbai",
    "home automation brands india",
    "top home automation companies mumbai",
    "home automation services maharashtra",
    "smart lighting mumbai",
    "smart security systems india",
    "motorised curtains mumbai",
    "home theatre automation india",
    "climate control automation mumbai",
    "smart home installation mumbai",
    "home automation near me",
    "best smart home company india",
    "bellavita smart home",
    "bellavita automation",
    "bellavita home automation mumbai",
    "iot home automation india",
    "smart switch installation mumbai",
    "home automation for apartments mumbai",
    "luxury home automation india",
    "smart building automation maharashtra",
    "home automation for villa mumbai",
    "smart home integration mumbai",
    "home automation dealer mumbai",
    "home automation distributor india",
  ],
  icons: {
    icon: "/images/logo/favicon.ico",
    shortcut: "/images/logo/favicon.ico",
    apple: "/images/logo/favicon.ico",
  },
  openGraph: {
    title: "Bellavita Smart Home — Best Home Automation Brand in Mumbai & India",
    description: "India's #1 home automation brand. 6500+ smart homes delivered across Mumbai, Maharashtra & India. Smart lighting, security, curtains, climate & theatre automation.",
    type: "website",
    locale: "en_IN",
    url: "https://bellavita.com",
    siteName: "Bellavita Smart Home",
    images: [
      {
        url: "/images/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Bellavita Smart Home — Best Home Automation in Mumbai & India",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bellavita Smart Home — Best Home Automation Brand in India",
    description: "India's #1 home automation brand. 6500+ smart homes across Mumbai, Maharashtra & India.",
    images: ["/images/og-banner.jpg"],
  },
  alternates: {
    canonical: "https://bellavita.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// Initialize database on startup
initializeDatabase().catch(console.error);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://bellavita.com/#organization',
        name: 'Bellavita Smart Home',
        url: 'https://bellavita.com',
        logo: 'https://bellavita.com/images/logo/favicon.ico',
        description: "India's best home automation brand based in Mumbai, Maharashtra. Premium smart home solutions with 6500+ projects completed since 2018.",
        foundingDate: '2018',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Laxmi Industrial Estate, Suresh Nagar, Andheri West',
          addressLocality: 'Mumbai',
          addressRegion: 'Maharashtra',
          postalCode: '400053',
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-81047-70438',
          contactType: 'sales',
          areaServed: 'India',
          availableLanguage: ['English', 'Hindi'],
        },
        sameAs: [
          'https://www.instagram.com/bellavitasmarthome/',
          'https://www.linkedin.com/company/bellavita-smart-home/',
          'https://www.facebook.com/bellavitasmarthome/',
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://bellavita.com/#localbusiness',
        name: 'Bellavita Smart Home',
        url: 'https://bellavita.com',
        image: 'https://bellavita.com/images/og-banner.jpg',
        telephone: '+91-81047-70438',
        email: 'info@bellavitasmarthome.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Laxmi Industrial Estate, Suresh Nagar, Andheri West',
          addressLocality: 'Mumbai',
          addressRegion: 'Maharashtra',
          postalCode: '400053',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 19.1364,
          longitude: 72.8296,
        },
        areaServed: [
          { '@type': 'City', name: 'Mumbai' },
          { '@type': 'State', name: 'Maharashtra' },
          { '@type': 'Country', name: 'India' },
        ],
        priceRange: '$$',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '350',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://bellavita.com/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Which is the best home automation brand in Mumbai?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bellavita Smart Home is widely recognized as the best home automation brand in Mumbai. With 6500+ completed projects across Mumbai and Maharashtra, Bellavita offers premium smart lighting, security systems, motorised curtains, climate control, and home theatre automation backed by a 5-year warranty and dedicated after-sales support.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which is the best home automation brand in India?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bellavita Smart Home is one of the best home automation brands in India. Headquartered in Mumbai, Maharashtra, Bellavita has completed over 6500 smart home projects since 2018, offering end-to-end automation solutions including smart switches, lighting, security, curtains, climate control, and multi-room audio across major Indian cities.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which is the best home automation brand in Maharashtra?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bellavita Smart Home is the leading home automation brand in Maharashtra. Based in Mumbai, Bellavita has transformed 6500+ homes with smart lighting, security, motorised curtains, climate control, and home theatre systems. Their deep understanding of Maharashtrian homes and local support makes them the top choice.',
            },
          },
          {
            '@type': 'Question',
            name: 'What services does Bellavita Smart Home provide?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bellavita Smart Home provides complete home automation solutions including smart lighting control, security & surveillance systems, motorised curtains, climate control, home theatre setup, multi-room audio, smart switches, IR remote sensors, and centralised control panels. They serve apartments, villas, commercial spaces, hotels, and clubs.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much does home automation cost in Mumbai?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Home automation costs in Mumbai vary based on the size and scope of the project. Bellavita Smart Home offers solutions starting from basic smart lighting to full-home automation. Contact Bellavita for a free consultation and personalized quote tailored to your home and requirements.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is home automation worth it in India?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, home automation is absolutely worth it in India. It enhances security, saves energy, increases convenience, and adds significant property value. Brands like Bellavita Smart Home offer reliable, warranty-backed solutions designed specifically for Indian homes and electrical systems.',
            },
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://bellavita.com/#website',
        url: 'https://bellavita.com',
        name: 'Bellavita Smart Home',
        publisher: { '@id': 'https://bellavita.com/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://bellavita.com/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en-IN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
