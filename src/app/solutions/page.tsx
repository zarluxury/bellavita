'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Lightbulb, Cpu, Shield, Hotel, Briefcase, Building, 
  Clock, Home, Zap, Smartphone, Power, Lock, 
  Activity, Monitor, CheckCircle2, Star, Quote 
} from 'lucide-react';

const SolutionsPage: React.FC = () => {
  const solutions = [
    { id: 'smart-homes', icon: Home, title: 'Smart Homes', color: 'from-blue-600/20', description: 'Complete home automation with unified control of lighting, climate, and security.', features: ['Unified control platform', 'Voice assistant integration', 'Mobile app control', 'Automated scheduling'] },
    { id: 'smart-hotels', icon: Hotel, title: 'Smart Hotels', color: 'from-purple-600/20', description: 'Enhance guest experience with intelligent room automation and keyless entry.', features: ['Guest room automation', 'Keyless entry systems', 'Climate control', 'Energy management'] },
    { id: 'smart-offices', icon: Briefcase, title: 'Smart Offices', color: 'from-emerald-600/20', description: 'Boost productivity with intelligent meeting rooms and environmental optimization.', features: ['Meeting room automation', 'Access control', 'Lighting optimization', 'Space utilization'] },
    { id: 'smart-buildings', icon: Building, title: 'Smart Buildings', color: 'from-orange-600/20', description: 'Comprehensive building management with integrated HVAC and energy systems.', features: ['BMS Integration', 'HVAC automation', 'Predictive maintenance', 'Sustainability reporting'] }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Solutions</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Tailored automation ecosystems designed to transform residential, commercial, and hospitality spaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid: High-Level Services */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            'Smart Lighting', 'Full Automation', 'Motorized Curtains',
            'Smart Security', 'Audio / Video', 'Building Solutions',
            'Office Optimization', 'Hotel Experience', '24x7 Monitoring'
          ].map((item, idx) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group relative p-8 rounded-[2rem] bg-[#0A0A0A] border border-white/10 hover:border-blue-500/40 transition-all duration-500 hover:bg-[#0E0E0E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all" />
                <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">{item}</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">High-performance tech integrated with seamless control logic for {item.toLowerCase()}.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Alternating Detailed Solutions */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-32">
          {solutions.map((sol, idx) => (
            <motion.div 
              key={sol.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}
            >
              {/* Visual Side */}
              <div className="w-full lg:w-1/2">
                <div className={`aspect-[4/3] rounded-[3rem] bg-gradient-to-br ${sol.color} to-transparent border border-white/10 flex items-center justify-center relative group overflow-hidden`}>
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                   <sol.icon className="w-24 h-24 text-white/20 group-hover:text-white/40 group-hover:scale-110 transition-all duration-700" />
                   <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Sector Solution</p>
                      <p className="text-xl font-bold">{sol.title}</p>
                   </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                    <sol.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-4xl font-bold">{sol.title}</h2>
                </div>
                <p className="text-xl text-gray-400 mb-10 leading-relaxed">{sol.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {sol.features.map(feat => (
                    <div key={feat} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Category Features: Bento Style */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">The Hardware Ecosystem</h2>
          <p className="text-gray-400">Intelligent devices engineered for reliability.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Power, title: 'Smart Switches', tags: ['Touch', 'Voice', 'App'] },
            { icon: Lightbulb, title: 'Smart Lighting', tags: ['RGB', 'CCT', 'Scenes'] },
            { icon: Lock, title: 'Smart Security', tags: ['Biometric', 'IP66', 'Alerts'] },
            { icon: Monitor, title: 'Control Panels', tags: ['HMI', 'LCD', 'Zigbee'] }
          ].map((cat, i) => (
            <div key={cat.title} className="p-8 rounded-[2.5rem] bg-[#0A0A0A] border border-white/10 hover:border-white/20 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-500">
                <cat.icon className="w-6 h-6 text-blue-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials: Premium Styling */}
      {/* <section className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rajesh Kumar', role: 'Homeowner', quote: 'Bellavita transformed our home into a smart living space. The app is incredibly intuitive.' },
              { name: 'Priya Sharma', role: 'Hotel Manager', quote: 'Guest satisfaction scores increased by 40% after implementing their smart solutions.' },
              { name: 'Amit Patel', role: 'CEO', quote: 'The smart office solution has reduced energy costs significantly while boosting comfort.' }
            ].map((t, i) => (
              <div key={t.name} className="relative p-10 rounded-[2.5rem] bg-[#0D0D0D] border border-white/5 shadow-2xl">
                <Quote className="absolute top-8 right-10 w-12 h-12 text-white/5" />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                </div>
                <p className="text-gray-300 italic mb-8 leading-relaxed">"{t.quote}"</p>
                <div className="border-t border-white/5 pt-6">
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-blue-500 font-medium">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
};

export default SolutionsPage;