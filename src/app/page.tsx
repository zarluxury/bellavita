'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Vision from '@/components/home/Vision';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Products from '@/components/home/ProductsBackend';
import CompatibilitySection from '@/components/sections/CompatibilitySection';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Vision />
      <WhyChooseUs />
      <Products />
      <CompatibilitySection />
      <Services />
      <Testimonials />
      <Footer />
    </div>
  );
}
