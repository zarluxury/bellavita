import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Home Solutions — Best Home Automation Solutions in Mumbai & India",
  description: "Explore Bellavita's premium smart home solutions: smart lighting, security & surveillance, motorised curtains, climate control, home theatre & multi-room audio. The best home automation solutions in Mumbai, Maharashtra & India.",
  alternates: { canonical: "https://bellavita.com/solutions" },
  openGraph: {
    title: "Smart Home Solutions — Bellavita Smart Home",
    description: "Premium smart lighting, security, curtains, climate & theatre automation. Best home automation solutions in Mumbai & India.",
    url: "https://bellavita.com/solutions",
  },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
