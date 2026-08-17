'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  ArrowLeft, Power, Lock, Lightbulb, PanelTop, Camera, 
  Activity, Smartphone, Monitor, Cpu, X, ChevronRight, CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { apiHeaders } from '@/lib/apiHeaders';

interface Product {
  name: string;
  image: string;
  description: string;
}

const CATEGORY_MAP: { [key: string]: any } = {
  'smart-switches': { title: 'Smart Switches', icon: Power, color: 'from-blue-500 to-cyan-400', description: 'Premium touch-enabled switches with mobile control.' },
  'smart-lights': { title: 'Smart Lights', icon: Lightbulb, color: 'from-yellow-400 to-orange-500', description: 'RGB LED lights with millions of colors and automated scenes.' },
  'curtain-track-motor': { title: 'Curtain Systems', icon: PanelTop, color: 'from-purple-500 to-indigo-600', description: 'Automated curtain systems with quiet precision motors.' },
  'smart-locks': { title: 'Smart Locks', icon: Lock, color: 'from-red-500 to-rose-700', description: 'Biometric security for the modern home.' },
  'ir-remote-sensors': { title: 'Sensors', icon: Activity, color: 'from-emerald-400 to-green-600', description: 'Advanced environmental and motion tracking.' },
  'multifunction-screens': { title: 'Control Panels', icon: Monitor, color: 'from-indigo-400 to-blue-700', description: 'Command center for your entire automation ecosystem.' },
  'drivers-controllers': { title: 'Controllers', icon: Cpu, color: 'from-pink-500 to-rose-500', description: 'The intelligent brain behind your device nodes.' },
  'gateways': { title: 'Gateways', icon: Smartphone, color: 'from-teal-400 to-emerald-600', description: 'Seamless connectivity for all smart hardware.' },
  'scene-switches': { title: 'Scene Selectors', icon: Camera, color: 'from-orange-400 to-red-500', description: 'One-tap custom lighting and mood settings.' },
  'smart-knob': { title: 'Smart Knob', icon: Power, color: 'from-slate-400 to-slate-600', description: 'Tactile control for the discerning user.' }
};

const ProductCategoryPage = () => {
  const params = useParams();
  const category = params.category as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const info = CATEGORY_MAP[category];
  const Icon = info?.icon;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/all-products', { headers: apiHeaders() });
        const data = await response.json();
        if (data.success && data.data) {
          const filtered = data.data
            .filter((p: any) => p.category === category)
            .map((p: any) => ({ name: p.name, image: p.imageUrl, description: p.description }));
          setProducts(filtered);
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    loadProducts();
  }, [category]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <Navbar />
      
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        {/* Breadcrumb & Header */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/products" className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Catalog
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-16">
            <div className={`p-4 rounded-3xl bg-gradient-to-br ${info?.color} shadow-lg shadow-blue-500/10 border border-white/20`}>
              {Icon && <Icon className="w-10 h-10 text-white" />}
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight mb-3">{info?.title}</h1>
              <p className="text-gray-400 max-w-xl text-lg">{info?.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedProduct(product)}
              className="group relative cursor-pointer"
            >
              {/* The Bordered Card */}
              <div className="relative bg-[#0A0A0A] border border-white/10 rounded-3xl p-5 h-full transition-all duration-500 hover:border-blue-500/40 hover:bg-[#0E0E0E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <div className="relative h-60 w-full mb-6 overflow-hidden rounded-2xl bg-[#111] border border-white/5">
                  <Image src={product.image} alt={product.name} fill className="object-contain p-6 transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{product.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-6">{product.description}</p>
                <div className="flex items-center text-blue-400 text-sm font-semibold">
                  Details <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0D0D0D] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20">
                <X className="w-5 h-5" />
              </button>

              <div className="grid lg:grid-cols-2">
                <div className="bg-[#141414] p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5">
                  <div className="relative w-full aspect-square">
                    <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-contain" />
                  </div>
                </div>
                
                <div className="p-10 lg:p-14 flex flex-col justify-center">
                  <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-4">{info?.title}</span>
                  <h2 className="text-4xl font-bold mb-6">{selectedProduct.name}</h2>
                  <p className="text-gray-400 leading-relaxed mb-8">{selectedProduct.description}</p>
                  
                  <div className="space-y-4 mb-10">
                    {['Certified Hardware', 'App Control Enabled', '2-Year Warranty'].map(f => (
                      <div key={f} className="flex items-center gap-3 text-sm text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {f}
                      </div>
                    ))}
                  </div>

                  <Link href="/contact" className="w-full py-4 bg-white text-black font-bold rounded-2xl text-center hover:bg-gray-200 transition-colors">
                    Request Pricing
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default ProductCategoryPage;