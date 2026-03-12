'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Power, Lock, Lightbulb, PanelTop, Camera, Activity, Smartphone, Monitor, Cpu } from 'lucide-react';
import Card from '../ui/Card';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  name: string;
  image: string;
  description: string;
}

interface Category {
  id: string;
  title: string;
  folder: string;
}

interface ProductsResponse {
  categories?: Category[];
  category?: {
    id: string;
    title: string;
    folder: string;
  };
  products?: Product[];
}

const Products: React.FC = () => {
  const [productsData, setProductsData] = useState<ProductsResponse>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryIcons: { [key: string]: React.ReactNode } = {
    'smart-switches': <Power className="w-12 h-12" />,
    'smart-lights': <Lightbulb className="w-12 h-12" />,
    'curtain-track-motor': <PanelTop className="w-12 h-12" />,
    'smart-locks': <Lock className="w-12 h-12" />,
    'ir-remote-sensors': <Activity className="w-12 h-12" />,
    'multifunction-screens': <Monitor className="w-12 h-12" />,
    'drivers-controllers': <Cpu className="w-12 h-12" />,
    'gateways': <Smartphone className="w-12 h-12" />,
    'scene-switches': <Camera className="w-12 h-12" />
  };

  useEffect(() => {
    const loadProductsData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        const data = await response.json();
        
        if (data.success) {
          setProductsData(data.data);
        } else {
          setError(data.error?.error || 'Failed to load products');
        }
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to connect to server');
      } finally {
        setLoading(false);
      }
    };

    loadProductsData();
  }, []);

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

  // Display categories from backend
  const categories = productsData.categories || [];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/products/${category.id}`}>
                <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-4 left-4 text-white">
                      {categoryIcons[category.id] || <Power className="w-12 h-12" />}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {category.folder}
                    </p>
                    <div className="mt-4 text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                      Explore Products →
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {categories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">
              No product categories available at the moment.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Products;
