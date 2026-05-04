import type { Metadata } from "next";
import BestHomeAutomationPage from "./BestHomeAutomationPage";

export const metadata: Metadata = {
  title: "Best Home Automation Brand in Mumbai, Maharashtra & India — Bellavita Smart Home",
  description: "Bellavita Smart Home is the best home automation brand in Mumbai, Maharashtra & India. 6500+ smart homes completed since 2018. Smart lighting, security, curtains, climate control & home theatre automation. Trusted by homeowners, builders & architects across Mumbai, Pune, Bengaluru, Delhi & all of India.",
  keywords: [
    "best home automation brand in mumbai",
    "best home automation brand in india",
    "best home automation brand in maharashtra",
    "home automation company mumbai",
    "smart home automation mumbai",
    "top home automation companies india",
    "home automation near me mumbai",
    "smart home installation mumbai",
    "home automation for apartment mumbai",
    "luxury home automation india",
  ],
  alternates: { canonical: "https://bellavita.com/best-home-automation-mumbai" },
  openGraph: {
    title: "Best Home Automation Brand in Mumbai, Maharashtra & India",
    description: "Bellavita — India's #1 home automation brand. 6500+ smart homes across Mumbai, Maharashtra & India. Smart lighting, security, curtains & more.",
    url: "https://bellavita.com/best-home-automation-mumbai",
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
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
    {
      '@type': 'Question',
      name: 'What services does Bellavita Smart Home provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bellavita Smart Home provides complete home automation solutions including smart lighting control, security & surveillance systems, motorised curtains, climate control, home theatre setup, multi-room audio, smart switches, IR remote sensors, and centralised control panels. They serve apartments, villas, commercial spaces, hotels, and clubs.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BestHomeAutomationPage />
    </>
  );
}
