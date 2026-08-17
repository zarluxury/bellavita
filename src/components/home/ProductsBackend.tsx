'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Power, Lock, Lightbulb, PanelTop, Camera, Activity, Smartphone, Monitor, Cpu, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Link from 'next/link';
import Image from 'next/image';
import { apiHeaders } from '@/lib/apiHeaders';

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

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/all-products', { headers: apiHeaders() });
        const data = await response.json();
        
        if (data.success && data.data) {
          setProducts(data.data);
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to connect to server');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Get one product per category, limit to 4 total
  const featuredProducts = useMemo(() => {
    const seen = new Set();
    const filtered = products.filter(p => {
      if (seen.has(p.category)) return false;
      seen.add(p.category);
      return true;
    });
    return filtered.slice(0, 4);
  }, [products]);

  if (loading) {
    return (
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-white">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Products
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Unable to load products at the moment.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Products
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our comprehensive range of smart home products designed to transform 
            your living experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => {
            const config = CATEGORY_CONFIG[product.category] || { 
              icon: Power, 
              color: 'from-gray-500 to-gray-700', 
              title: product.category 
            };
            const Icon = config.icon;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Link href={`/products/${product.category}`}>
                  <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 bg-[#0A0A0A] border border-white/10 hover:border-blue-500/50 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden shrink-0">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-110 p-4"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <div className={`p-2 rounded-full bg-gradient-to-br ${config.color} border border-white/20`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors flex-1 pr-2 line-clamp-2 leading-tight">
                          {product.name}
                        </h3>
                        <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full shrink-0">
                          {config.title}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                        {product.description}
                      </p>
                      <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors mt-auto">
                        View Collection
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {featuredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">
              No products available at the moment.
            </p>
          </motion.div>
        )}

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link 
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
