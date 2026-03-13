'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { 
  Power, Lock, Lightbulb, PanelTop, Camera, Activity, 
  Smartphone, Monitor, Cpu, ArrowRight, Layers 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// --- Types & Constants ---
interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

const CATEGORY_CONFIG: { [key: string]: { icon: any; color: string; title: string } } = {
  'smart-switches': { icon: Power, color: 'from-blue-500 to-cyan-400', title: 'Smart Switches' },
  'smart-lights': { icon: Lightbulb, color: 'from-yellow-400 to-orange-500', title: 'Smart Lights' },
  'curtain-track-motor': { icon: PanelTop, color: 'from-purple-500 to-indigo-600', title: 'Curtain Systems' },
  'smart-locks': { icon: Lock, color: 'from-red-500 to-rose-700', title: 'Smart Security' },
  'ir-remote-sensors': { icon: Activity, color: 'from-emerald-400 to-green-600', title: 'Sensors' },
  'multifunction-screens': { icon: Monitor, color: 'from-indigo-400 to-blue-700', title: 'Control Panels' },
  'drivers-controllers': { icon: Cpu, color: 'from-pink-500 to-rose-500', title: 'Controllers' },
  'gateways': { icon: Smartphone, color: 'from-teal-400 to-emerald-600', title: 'Gateways' },
  'scene-switches': { icon: Camera, color: 'from-orange-400 to-red-500', title: 'Scene Selectors' },
  'smart-knob': { icon: Power, color: 'from-slate-400 to-slate-600', title: 'Smart Knobs' }
};

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch('/api/all-products'),
          fetch('/api/products')
        ]);
        if (!pRes.ok || !cRes.ok) throw new Error('Failed to synchronize hardware data.');
        
        const pData = await pRes.json();
        setProducts(pData.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const featuredProducts = useMemo(() => {
    const seen = new Set();
    return products.filter(p => {
      if (seen.has(p.category)) return false;
      seen.add(p.category);
      return true;
    });
  }, [products]);

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <Navbar />
      
      {/* Hero Section: Focused & High-Impact */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#1e293b,transparent)] opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
              The Future of Living
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              Elevate Your Space.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Precision-engineered smart solutions designed to blend seamlessly into your lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Grid: Visual Clarity */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {featuredProducts.map((product, idx) => {
              const config = CATEGORY_CONFIG[product.category] || { icon: Layers, color: 'from-gray-500 to-gray-700', title: product.category };
              const Icon = config.icon;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <div className="group relative bg-[#0A0A0A] rounded-3xl p-4 transition-all duration-500 
                /* Primary Border */
                border border-white/10 
                /* Subtle Glow on Hover */
                hover:border-blue-500/50 
                /* Inner Shadow for Depth */
                shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.05)]
                hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
  
  {/* Optional: Animated Border Gradient (The "Glow" effect) */}
  <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

  {/* Image Container with its own border */}
  <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-zinc-900 border border-white/5">
    <Image
      src={product.imageUrl}
      alt={product.name}
      fill
      className="object-fill transition-transform duration-700 group-hover:scale-105 opacity-90"
    />
  </div>

  {/* Content Area */}
  <div className="mt-6 px-2 relative z-10">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-2xl font-semibold tracking-tight text-white/90">{product.name}</h3>
      <div className={`p-2 rounded-xl bg-gradient-to-br ${config.color} border border-white/20`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
    
    <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-2">
      {product.description}
    </p>
    
    <Link 
      href={`/products/${product.category}`}
      className="flex items-center justify-between w-full p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group/btn"
    >
      <span className="text-sm font-medium">View Collection</span>
      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
    </Link>
  </div>
</div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* Modern Category Footer */}
      <section className="py-20 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-12 text-center">Quick Navigation</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(CATEGORY_CONFIG).map(([slug, info]) => (
              <Link key={slug} href={`/products/${slug}`}>
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="px-6 py-3 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-blue-500/50 transition-all flex items-center gap-3"
                >
                  <info.icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-300">{info.title}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="relative">
      <div className="h-24 w-24 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-tighter font-bold">Lumina</div>
    </div>
  </div>
);

export default ProductsPage;