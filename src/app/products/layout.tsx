import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Home Products — Best Home Automation Products in India",
  description: "Shop Bellavita's range of smart home automation products: smart switches, smart lights, curtain motors, smart locks, sensors, control panels, gateways & more. Trusted by 6500+ homes across Mumbai & India.",
  alternates: { canonical: "https://bellavita.com/products" },
  openGraph: {
    title: "Smart Home Products — Bellavita Smart Home",
    description: "Smart switches, lights, locks, curtains, sensors & more. Best home automation products in India.",
    url: "https://bellavita.com/products",
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
