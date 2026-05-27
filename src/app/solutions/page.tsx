'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Lightbulb, Cpu, Shield, Hotel, Briefcase, Building, 
  Clock, Home, Zap, Smartphone, Power, Lock, 
  Activity, Monitor, CheckCircle2, Star, Quote 
} from 'lucide-react';

const SolutionsPage: React.FC = () => {
  const solutions = [
    { 
      id: 'smart-homes', 
      icon: Home, 
      title: 'Smart Homes', 
      color: 'from-blue-600/20', 
      description: 'Complete home automation with unified control of lighting, climate, and security.',
      features: ['Unified control platform', 'Voice assistant integration', 'Mobile app control', 'Automated scheduling'],
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=450&fit=crop',
        'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&h=450&fit=crop',
        'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=450&fit=crop'
      ]
    },
    { 
      id: 'smart-hotels', 
      icon: Hotel, 
      title: 'Smart Hotels', 
      color: 'from-purple-600/20', 
      description: 'Enhance guest experience with intelligent room automation and keyless entry.',
      features: ['Guest room automation', 'Keyless entry systems', 'Climate control', 'Energy management'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=450&fit=crop',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=450&fit=crop',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=450&fit=crop'
      ]
    },
    { 
      id: 'smart-offices', 
      icon: Briefcase, 
      title: 'Smart Offices', 
      color: 'from-emerald-600/20', 
      description: 'Boost productivity with intelligent meeting rooms and environmental optimization.',
      features: ['Meeting room automation', 'Access control', 'Lighting optimization', 'Space utilization'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=450&fit=crop',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=450&fit=crop',
        'https://images.unsplash.com/photo-1497366815508-1a6b7e6ad6bf?w=600&h=450&fit=crop'
      ]
    },
    { 
      id: 'smart-buildings', 
      icon: Building, 
      title: 'Smart Buildings', 
      color: 'from-orange-600/20', 
      description: 'Comprehensive building management with integrated HVAC and energy systems.',
      features: ['BMS Integration', 'HVAC automation', 'Predictive maintenance', 'Sustainability reporting'],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=450&fit=crop',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=450&fit=crop',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=450&fit=crop'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1558002038-1055907df827?w=1920&h=600&fit=crop"
            alt="Smart Solutions Hero"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
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

      {/* Grid: High-Level Services with Icons */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Smart Lighting', icon: Lightbulb, desc: 'Intelligent lighting control with scene automation' },
            { name: 'Full Automation', icon: Cpu, desc: 'Complete home ecosystem integration' },
            { name: 'Motorized Curtains', icon: Activity, desc: 'Automated blinds and drapery systems' },
            { name: 'Smart Security', icon: Shield, desc: 'Advanced surveillance and access control' },
            { name: 'Audio / Video', icon: Monitor, desc: 'Immersive entertainment solutions' },
            { name: 'Building Solutions', icon: Building, desc: 'Commercial building management systems' },
            { name: 'Office Optimization', icon: Briefcase, desc: 'Productivity-enhancing office automation' },
            { name: 'Hotel Experience', icon: Hotel, desc: 'Luxury guest room automation' },
            { name: '24x7 Monitoring', icon: Clock, desc: 'Round-the-clock system monitoring' }
          ].map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group relative p-8 rounded-[2rem] bg-[#0A0A0A] border border-white/10 hover:border-blue-500/40 transition-all duration-500 hover:bg-[#0E0E0E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">{item.name}</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Alternating Detailed Solutions with Images */}
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
              {/* Visual Side with Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-[3rem] bg-gradient-to-br overflow-hidden group">
                  <Image
                    src={sol.image}
                    alt={sol.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
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



      <Footer />
    </div>
  );
};

export default SolutionsPage;