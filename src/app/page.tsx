'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Vision from '@/components/home/Vision';
import SmartSolutions from '@/components/home/SmartSolutions';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Products from '@/components/home/ProductsBackend';
import CompatibilitySection from '@/components/sections/CompatibilitySection';
import Testimonials from '@/components/home/Testimonials';
import WhyBellavita from '@/components/home/WhyBellavita';
import GoogleReviews from '@/components/home/GoogleReviews';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Vision />
      <SmartSolutions />
      <WhyChooseUs />
      <Products />
      <WhyBellavita />
      <CompatibilitySection />
      <Testimonials />
      <GoogleReviews />
      <TestimonialsCarousel />
      <Newsletter />
      <Footer />
    </div>
  );
}
