'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle2, Award, Building2, MapPin, Phone, Mail, Clock, Star, TrendingUp, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const BestHomeAutomationPage = () => {
  const services = [
    { icon: Zap, title: 'Smart Lighting', desc: 'Control all your lights with app, voice, or automation scenes.' },
    { icon: Shield, title: 'Security Systems', desc: 'Smart locks, cameras, and motion sensors for complete protection.' },
    { icon: Building2, title: 'Motorised Curtains', desc: 'Automated curtain systems with quiet precision motors.' },
    { icon: Star, title: 'Home Theatre', desc: 'Immersive audio-visual experiences with one-touch control.' },
  ];

  const locations = [
    'Mumbai', 'Pune', 'Bengaluru', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Ahmedabad', 'Nagpur', 'Nashik', 'Thane', 'Navi Mumbai', 'Goa'
  ];

  const faqs = [
    {
      q: 'Which is the best home automation brand in Mumbai?',
      a: 'Bellavita Smart Home is widely recognized as the best home automation brand in Mumbai. With 6500+ completed projects across Mumbai and Maharashtra, Bellavita offers premium smart lighting, security systems, motorised curtains, climate control, and home theatre automation backed by a 5-year warranty and dedicated after-sales support.'
    },
    {
      q: 'Which is the best home automation brand in India?',
      a: 'Bellavita Smart Home is one of the best home automation brands in India. Headquartered in Mumbai, Maharashtra, Bellavita has completed over 6500 smart home projects since 2018, offering end-to-end automation solutions including smart switches, lighting, security, curtains, climate control, and multi-room audio across major Indian cities.'
    },
    {
      q: 'Which is the best home automation brand in Maharashtra?',
      a: 'Bellavita Smart Home is the leading home automation brand in Maharashtra. Based in Mumbai, Bellavita has transformed 6500+ homes with smart lighting, security, motorised curtains, climate control, and home theatre systems. Their deep understanding of Maharashtrian homes and local support makes them the top choice.'
    },
    {
      q: 'How much does home automation cost in Mumbai?',
      a: 'Home automation costs in Mumbai vary based on the size and scope of the project. Bellavita Smart Home offers solutions starting from basic smart lighting to full-home automation. Contact Bellavita for a free consultation and personalized quote tailored to your home and requirements.'
    },
    {
      q: 'Is home automation worth it in India?',
      a: 'Yes, home automation is absolutely worth it in India. It enhances security, saves energy, increases convenience, and adds significant property value. Brands like Bellavita Smart Home offer reliable, warranty-backed solutions designed specifically for Indian homes and electrical systems.'
    },
    {
      q: 'What services does Bellavita Smart Home provide?',
      a: 'Bellavita Smart Home provides complete home automation solutions including smart lighting control, security & surveillance systems, motorised curtains, climate control, home theatre setup, multi-room audio, smart switches, IR remote sensors, and centralised control panels. They serve apartments, villas, commercial spaces, hotels, and clubs.'
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best Home Automation Brand in <span className="text-blue-400">Mumbai</span>, <span className="text-blue-400">Maharashtra</span> & <span className="text-blue-400">India</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Bellavita Smart Home — Transforming homes since 2018. 6500+ projects completed across India. 
              Premium smart lighting, security, curtains, climate control & home theatre automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="px-8 py-4 text-lg">Get Free Consultation</Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="px-8 py-4 text-lg">Explore Products</Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {[
              { value: '6500+', label: 'Projects Completed' },
              { value: '7+', label: 'Years Experience' },
              { value: '5-Year', label: 'Warranty' },
              { value: '24/7', label: 'Support' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Bellavita */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Bellavita is the Best Home Automation Brand in India</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our passion for automation goes beyond business — it's about creating spaces you're proud to own and happy to call home.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'Industry Expertise', desc: '7+ years of experience with 6500+ completed smart home projects across India.' },
              { icon: CheckCircle2, title: 'Quality Assurance', desc: '5-year warranty on all products and installation. Only certified hardware.' },
              { icon: Building2, title: 'End-to-End Solutions', desc: 'From design to installation and after-sales support — complete automation ecosystem.' },
              { icon: TrendingUp, title: 'Future-Ready Technology', desc: 'Scalable systems that grow with your needs. Compatible with latest IoT standards.' },
              { icon: Shield, title: 'Indian-First Design', desc: 'Solutions designed specifically for Indian homes and electrical systems.' },
              { icon: Clock, title: '24/7 Support', desc: 'Dedicated support team available round the clock for all your automation needs.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-colors"
              >
                <item.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Premium Smart Home Solutions</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Complete home automation ecosystem designed for modern Indian homes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer"
              >
                <service.icon className="w-14 h-14 text-blue-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Serving Across India</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              From Mumbai to Bengaluru, Bellavita is transforming homes across major Indian cities.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {locations.map((location, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gray-900 border border-gray-800 rounded-full px-6 py-3 flex items-center gap-2 hover:border-blue-500 transition-colors"
              >
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-white">{location}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">
              Everything you need to know about home automation in Mumbai, Maharashtra & India
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/30 transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                  <span className="text-blue-400">Q{idx + 1}.</span>
                  {faq.q}
                </h3>
                <p className="text-gray-400 leading-relaxed pl-8">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Home?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get a free consultation from India's best home automation brand. Our experts will design a custom solution for your space.
            </p>
            <Link href="/contact">
              <Button className="px-10 py-5 text-xl">Get Free Quote</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center"
            >
              <Phone className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Call Us</h3>
              <p className="text-gray-400">+91 81047 70438</p>
              <p className="text-gray-500 text-sm mt-2">Mon-Sat 9AM-7PM</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center"
            >
              <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Email Us</h3>
              <p className="text-gray-400">info@bellavitasmarthome.com</p>
              <p className="text-gray-500 text-sm mt-2">Response within 24 hours</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center"
            >
              <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Visit Us</h3>
              <p className="text-gray-400">Laxmi Industrial Estate, Andheri West</p>
              <p className="text-gray-500 text-sm mt-2">Mumbai, Maharashtra 400053</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BestHomeAutomationPage;
