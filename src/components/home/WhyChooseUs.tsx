'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Plus, X, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';

const WhyChooseUs: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Effect Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x * 20); // Move range of 20px
    mouseY.set(y * 20);
  };

  const hotspots = [
    { id: 1, x: '30%', y: '70%', title: 'Smart Living Room', content: 'Complete entertainment automation with voice-controlled audio.', image: '/images/whychooseus/sofa.jpg', category: 'Audio' },
    { id: 2, x: '55%', y: '40%', title: 'Intelligent Lighting', content: 'Lighting that adapts to natural light and preferences.', image: '/images/whychooseus/dining table.jpg', category: 'Lighting' },
    { id: 3, x: '20%', y: '40%', title: 'Automated Curtains', content: 'Curtain systems that respond to sunlight and schedules.', image: '/images/whychooseus/bed room.jpg', category: 'Comfort' },
    { id: 4, x: '55%', y: '65%', title: 'Home Theater', content: '24/7 monitoring with smart locks and cameras.', image: '/images/whychooseus/home theat.jpg', category: 'Security' }
  ];

  const highlights = [
    '5 years warranty on products', 'Own requirements manufacturing', 'One stop automation & AV',
    'Single application control', 'Works with existing wiring', 'Single point support'
  ];

  return (
    <section className="py-24 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-blue-500 font-semibold tracking-widest uppercase text-sm">Experience Excellence</span>
          <h2 className="text-5xl font-bold text-white mt-4 mb-6">Why Choose Bellavita</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We don't just install gadgets; we orchestrate a symphony of lifestyle automation.
          </p>
        </motion.div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
          className="relative mb-20 group cursor-crosshair"
        >
          {/* Main Image with Parallax */}
          <motion.div 
            style={{ x: springX, y: springY }}
            className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <motion.img
              animate={{ scale: 1.1 }}
              src="/images/whychooseus/main.jpg"
              alt="Luxury Living Room"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
            
            {hotspots.map((hotspot) => (
              <div 
                key={hotspot.id}
                className="absolute"
                style={{ left: hotspot.x, top: hotspot.y }}
              >
                {/* Hotspot Button */}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-2xl z-30 transition-colors duration-300 ${activeHotspot === hotspot.id ? 'bg-white text-blue-600' : 'bg-blue-600/80 backdrop-blur-md'}`}
                  onMouseEnter={() => setActiveHotspot(hotspot.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <AnimatePresence mode="wait">
                    {activeHotspot === hotspot.id ? 
                      <motion.div key="x" initial={{rotate:-90}} animate={{rotate:0}}><X size={18} /></motion.div> : 
                      <motion.div key="p" initial={{rotate:90}} animate={{rotate:0}}><Plus size={18} /></motion.div>
                    }
                  </AnimatePresence>
                  <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-25" />
                </motion.button>

                {/* Floating Info Card */}
                <AnimatePresence>
                  {activeHotspot === hotspot.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-64 pointer-events-none"
                    >
                      <div className="bg-gray-900/95 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                        <img src={hotspot.image} alt="" className="h-32 w-full object-cover" />
                        <div className="p-4">
                          <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{hotspot.category}</span>
                          <h3 className="text-white font-bold text-sm mb-1">{hotspot.title}</h3>
                          <p className="text-gray-400 text-xs leading-relaxed">{hotspot.content}</p>
                        </div>
                      </div>
                      {/* Decorative pointer */}
                      <div className="w-3 h-3 bg-gray-900 border-r border-b border-blue-500/30 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Feature Grid with Hover Interaction */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="group h-full bg-white/5 border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 p-5 cursor-default">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm md:text-base leading-snug">
                      {highlight}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;