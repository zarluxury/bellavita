'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Users, Award, Target, Lightbulb, CheckCircle2, MoveRight, User } from 'lucide-react';
import Link from 'next/link';
import OneApp from '@/components/home/OneApp';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Pushing the boundaries of smart home technology with future-ready solutions.',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Our clients are at the heart of our engineering, ensuring complete satisfaction.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Uncompromising precision in every product, sensor, and installation.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Striving for perfection across our entire automation ecosystem.',
      color: 'from-rose-500 to-orange-500'
    }
  ];

  const milestones = [
    { year: '2018', title: 'The Vision', desc: 'Founded to bridge the gap in Indian smart home tech.' },
    { year: '2020', title: 'Expansion', desc: 'Presence established in major Indian metros.' },
    { year: '2022', title: 'Proprietary Tech', desc: 'Launched our unified cloud automation platform.' },
    { year: '2024', title: 'Market Leader', desc: 'Recognized as a premier name in premium automation.' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <Navbar />
      
      {/* Hero: Emotional Hook */}
      <section className="relative pt-40 pb-24 overflow-hidden px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-blue-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
          >
            Redefining Living Spaces
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            The Soul of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Bellavita</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            One of India's leading brands in Smart Home Solutions, blending contemporary sensibilities with best-in-class technology.
          </motion.p>
        </div>
      </section>

{/* Founder Section */}
<section className="py-24 px-6">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <span className="text-blue-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
        Meet the Visionary
      </span>
      <h2 className="text-3xl md:text-5xl font-bold">
        Led by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Passion</span>
      </h2>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      <div className="relative group">
        {/* Animated gradient border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />
        
        {/* Main card */}
        <div className="relative bg-gradient-to-br from-[#0A0A0A] to-[#0F0F0F] border border-white/10 rounded-[2rem] p-8 md:p-10 overflow-hidden">
          
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
          
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 relative z-10">
            
            {/* Founder Image Container - Responsive */}
            <div className="shrink-0">
              <div className="relative group/image">
                {/* Image glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-2xl blur-xl opacity-0 group-hover/image:opacity-100 transition duration-500" />
                
                {/* Image container - removed gradient overlay */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden border-2 border-white/20 group-hover/image:border-blue-500/50 transition-all duration-300">
                  {/* Image */}
                  <img
                    src="/images/Founder/founder.jpeg"
                    alt="Founder"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/image:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                
                {/* Decorative ring */}
                <div className="absolute -inset-3 rounded-2xl border border-dashed border-blue-500/30 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Founder Info */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Amaan Lakhani
                </h3>
                <div className="inline-block">
                  <p className="text-blue-400 font-semibold text-lg md:text-xl tracking-wide uppercase relative">
                    Founder & CEO
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-blue-500 to-transparent" />
                  </p>
                </div>
              </div>
              
              <p className="text-gray-400 leading-relaxed text-base md:text-lg max-w-xl mx-auto lg:mx-0">
                The driving force behind Bellavita's vision to transform Indian homes into intelligent living spaces. With a deep passion for automation and design, leading the company from its inception to becoming a market leader.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                  Since 2018
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                  Mumbai, India
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                  6500+ Projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>

    <div className='px-24'>
      <OneApp/>
</div>
      {/* Values: Interaction Cards */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-16">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div 
              key={v.title}
              whileHover={{ y: -8 }}
              className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/10 transition-all hover:border-blue-500/30 group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-6 shadow-lg`}>
                <v.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{v.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline: Linear Path */}
      <section className="py-24 bg-[#080808] border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-16">Our Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
             <div className="hidden lg:block absolute top-6 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500/50 via-white/10 to-transparent" />
             {milestones.map((m, i) => (
               <div key={m.year} className="relative group">
                 <div className="w-12 h-12 rounded-full bg-[#0A0A0A] border-2 border-blue-500 flex items-center justify-center font-bold text-blue-500 mb-6 relative z-10 group-hover:scale-110 transition-transform">
                   {i + 1}
                 </div>
                 <div className="text-2xl font-bold mb-1">{m.year}</div>
                 <div className="text-blue-400 font-semibold mb-2">{m.title}</div>
                 <p className="text-gray-500 text-sm">{m.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default AboutPage;