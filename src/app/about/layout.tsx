import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Bellavita — India's #1 Home Automation Brand Since 2018",
  description: "Learn about Bellavita Smart Home, India's leading home automation brand. Founded in 2018 in Mumbai, Maharashtra, we've completed 6500+ smart home projects with a passion for transforming Indian homes through intelligent automation.",
  alternates: { canonical: "https://bellavita.com/about" },
  openGraph: {
    title: "About Bellavita — India's #1 Home Automation Brand",
    description: "6500+ smart homes transformed since 2018. Learn about our mission, values & the team behind India's best home automation brand.",
    url: "https://bellavita.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
