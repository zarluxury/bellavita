'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { Power, Lock, Lightbulb, PanelTop, Activity, Monitor, Cpu, Smartphone, ArrowRight, Filter, Grid, List } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

const ProductsPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCategoryPage, setIsCategoryPage] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const categoryMap: { [key: string]: any } = {
    'smart-switches': {
      title: 'Smart Switches',
      icon: <Power className="w-6 h-6" />,
      description: 'Premium touch-enabled switches with mobile control and scheduling capabilities.',
      color: 'from-blue-600 to-blue-800'
    },
    'smart-lights': {
      title: 'Smart Lights',
      icon: <Lightbulb className="w-6 h-6" />,
      description: 'RGB LED lights with millions of colors and automated scene management.',
      color: 'from-yellow-600 to-orange-800'
    },
    'curtain-track-motor': {
      title: 'Curtain Track & Motor',
      icon: <PanelTop className="w-6 h-6" />,
      description: 'Automated curtain systems with quiet motors and precision tracking.',
      color: 'from-purple-600 to-purple-800'
    },
    'smart-locks': {
      title: 'Smart Locks',
      icon: <Lock className="w-6 h-6" />,
      description: 'Biometric and app-controlled door locks with advanced security features.',
      color: 'from-red-600 to-red-800'
    },
    'ir-remote-sensors': {
      title: 'IR Remote & Sensors',
      icon: <Activity className="w-6 h-6" />,
      description: 'Advanced sensors and remotes for comprehensive home automation.',
      color: 'from-green-600 to-green-800'
    },
    'multifunction-screens': {
      title: 'Multifunction Screens',
      icon: <Monitor className="w-6 h-6" />,
      description: 'Touch screen controllers for complete home management.',
      color: 'from-indigo-600 to-indigo-800'
    },
    'drivers-controllers': {
      title: 'Drivers & Controllers',
      icon: <Cpu className="w-6 h-6" />,
      description: 'Essential control nodes and drivers for seamless automation.',
      color: 'from-gray-600 to-gray-800'
    },
    'gateways': {
      title: 'Gateways',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Smart gateways for connecting all your home automation devices.',
      color: 'from-cyan-600 to-cyan-800'
    },
    'scene-switches': {
      title: 'Scene Switches',
      icon: <Power className="w-6 h-6" />,
      description: 'Programmable switches for custom scene control and automation.',
      color: 'from-pink-600 to-pink-800'
    },
    'smart-knob': {
      title: 'Smart Knob',
      icon: <Power className="w-6 h-6" />,
      description: 'Intelligent knob controls for smart home automation.',
      color: 'from-teal-600 to-teal-800'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories and products in parallel
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/all-products')
        ]);
        
        const categoriesData = await categoriesResponse.json();
        const productsData = await productsResponse.json();
        
        let categoriesList: Category[] = [];
        let productsList: Product[] = [];
        
        if (categoriesData.success) {
          categoriesList = categoriesData.data.categories || [];
          setCategories(categoriesList);
        }
        
        if (productsData.success) {
          productsList = productsData.data || [];
          setProducts(productsList);
        }
        
        setFilteredProducts(productsList);
        
        // Mark data as loaded
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

useEffect(() => {
  if (!products.length) return;

  // If "All" selected -> show ONE product per category
  if (selectedCategory === 'all') {
    
    const categoryMap = new Map();

    products.forEach((product) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, product);
      }
    });

    setFilteredProducts(Array.from(categoryMap.values()));
    setIsCategoryPage(false);
    return;
  }

  // If specific category selected -> show ONE product
  const product = products.find(p => p.category === selectedCategory);

  if (product) {
    setFilteredProducts([product]);
  } else {
    setFilteredProducts([]);
  }

  setIsCategoryPage(true);

}, [selectedCategory, products]);

  const handleCategoryFilter = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  // Temporary debug display
  console.log('Page state:', { 
    categoriesCount: categories.length, 
    productsCount: products.length, 
    filteredCount: filteredProducts.length,
    selectedCategory,
    dataLoaded
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Our Products
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive range of smart home products designed to transform your living experience.
            </p>
          </motion.div>

          {/* Category Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Filter className="w-6 h-6 text-blue-400" />
                Categories
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              
              
              {categories.map((category) => {
                const categoryInfo = categoryMap[category.slug];
                const productCount = products.filter(p => p.category === category.slug).length;
                
                if (!categoryInfo) return null;

                return (
                  <label key={category.id} className="flex items-center gap-3 cursor-pointer bg-gray-800 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                    <input
                      type="radio"
                      name="category"
                      value={category.slug}
                      checked={selectedCategory === category.slug}
                      onChange={() => handleCategoryFilter(category.slug)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-blue-400">{categoryInfo.icon}</span>
                    <span className="font-medium text-white">
                      {categoryInfo.title} ({productCount})
                    </span>
                  </label>
                );
              })}
            </div>
          </motion.div>

          {/* Products Grid/List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedCategory === 'all' ? 'All Categories' : `${categoryMap[selectedCategory]?.title || 'Products'} - Featured Product`}
                <span className="text-gray-400 font-normal ml-2">({filteredProducts.length})</span>
              </h2>
              {isCategoryPage && (
                <button
                  onClick={() => handleCategoryFilter('all')}
                  className="text-blue-400 hover:text-blue-300 font-medium text-sm"
                >
                  ← Back to All Categories
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 text-lg mb-4">
                  {selectedCategory === 'all' ? 'No featured products found' : `No products found in ${categoryMap[selectedCategory]?.title}`}
                </div>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => handleCategoryFilter('all')}
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    View all categories instead
                  </button>
                )}
              </motion.div>
            ) : (
              <div className={viewMode === 'grid' ? 
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : 
                "space-y-4"
              }>
                {filteredProducts.map((product, index) => {
  const categoryInfo = categoryMap[product.category];
  
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/products/${product.category}`}>
        <Card className="group relative overflow-hidden h-full cursor-pointer bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-500 rounded-2xl">
          
          {/* Subtle Hover Gradient Glow */}
          <div className="absolute -inset-px bg-gradient-to-br from-blue-600/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {viewMode === 'grid' ? (
            // --- NEW GRID UI ---
            <div className="relative p-5 h-full flex flex-col">
              {/* Image Container */}
              <div className="relative h-52 mb-6 rounded-xl bg-gradient-to-b from-gray-800/50 to-transparent overflow-hidden">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-6 transition-transform duration-500 scale-95 group-hover:scale-110 group-hover:-rotate-2"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Filter className="w-12 h-12 text-gray-700" />
                  </div>
                )}
              </div>
              
              {/* Category Tag */}
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                  {categoryInfo?.icon ? React.cloneElement(categoryInfo.icon, { size: 14 }) : <Power size={14} />}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {categoryInfo?.title || product.category}
                </span>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                {product.name}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow">
                {product.description}
              </p>
              
              {/* Action */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                <span className="text-xs font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                  {selectedCategory === 'all' ? 'Explore Collection' : 'View Details'}
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ) : (
            // --- NEW LIST UI ---
            <div className="relative p-4 flex items-center gap-6">
              <div className="relative w-32 h-32 flex-shrink-0 bg-gray-800/50 rounded-xl overflow-hidden">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Filter className="w-8 h-8 text-gray-700" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">
                    {categoryInfo?.title || product.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 max-w-2xl">
                  {product.description}
                </p>
              </div>
              
              <div className="pr-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500 transition-all">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          )}
        </Card>
      </Link>
    </motion.div>
  );
})}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
