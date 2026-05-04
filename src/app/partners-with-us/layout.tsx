import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners With Us — Home Automation Dealership & Partnership in India",
  description: "Partner with Bellavita Smart Home — India's best home automation brand. Become a dealer, distributor or integration partner. Expand your business with our proven smart home automation solutions across Mumbai, Maharashtra & India.",
  alternates: { canonical: "https://bellavita.com/partners-with-us" },
  openGraph: {
    title: "Partners With Us — Bellavita Smart Home",
    description: "Become a Bellavita automation partner. Dealership & distributorship opportunities across India.",
    url: "https://bellavita.com/partners-with-us",
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
