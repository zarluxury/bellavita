import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feature Projects — Top Home Automation Projects in Mumbai & India",
  description: "Explore Bellavita's featured smart home automation projects across Mumbai, Maharashtra & India. See real installations in luxury apartments, villas, hotels & commercial spaces. 6500+ projects completed since 2018.",
  alternates: { canonical: "https://bellavita.com/feature-projects" },
  openGraph: {
    title: "Feature Projects — Bellavita Smart Home Installations",
    description: "6500+ smart home projects completed. Explore our featured automation installations across Mumbai & India.",
    url: "https://bellavita.com/feature-projects",
  },
};

export default function FeatureProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
