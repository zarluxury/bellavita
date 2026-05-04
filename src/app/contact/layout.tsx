import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Bellavita — Best Home Automation Company in Mumbai, Maharashtra",
  description: "Get in touch with Bellavita Smart Home, the best home automation company in Mumbai & Maharashtra. Call +91 81047 70438 or fill our contact form for a free smart home consultation. We serve Mumbai, Pune, Bengaluru, Delhi & all of India.",
  alternates: { canonical: "https://bellavita.com/contact" },
  openGraph: {
    title: "Contact Bellavita — Free Smart Home Consultation",
    description: "Contact India's best home automation brand. Free consultation for smart lighting, security, curtains & more in Mumbai & India.",
    url: "https://bellavita.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
