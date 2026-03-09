'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { ArrowLeft, Power, Lock, Lightbulb, PanelTop, Camera, Activity, Smartphone, Monitor, Cpu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  name: string;
  image: string;
  description: string;
}

const ProductCategoryPage: React.FC = () => {
  const params = useParams();
  const category = params.category as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const categoryMap: { [key: string]: any } = {
    'smart-switches': {
      title: 'Smart Switches',
      icon: <Power className="w-8 h-8" />,
      description: 'Premium touch-enabled switches with mobile control and scheduling capabilities.',
      folder: 'SMART SWITCH'
    },
    'smart-lights': {
      title: 'Smart Lights',
      icon: <Lightbulb className="w-8 h-8" />,
      description: 'RGB LED lights with millions of colors and automated scene management.',
      folder: 'SMART LIGHT'
    },
    'curtain-track-motor': {
      title: 'Curtain Track & Motor',
      icon: <PanelTop className="w-8 h-8" />,
      description: 'Automated curtain systems with quiet motors and precision tracking.',
      folder: 'CURTAIN TRACK & MOTOR'
    },
    'smart-locks': {
      title: 'Smart Locks',
      icon: <Lock className="w-8 h-8" />,
      description: 'Biometric and app-controlled door locks with advanced security features.',
      folder: 'LOCK'
    },
    'ir-remote-sensors': {
      title: 'IR Remote & Sensors',
      icon: <Activity className="w-8 h-8" />,
      description: 'Advanced sensors and remotes for comprehensive home automation.',
      folder: 'IR REMOTE & SENSORE'
    },
    'multifunction-screens': {
      title: 'Multifunction Screens',
      icon: <Monitor className="w-8 h-8" />,
      description: 'Touch screen controllers for complete home management.',
      folder: 'MUTIFUCATION SCREEN'
    },
    'drivers-controllers': {
      title: 'Drivers & Controllers',
      icon: <Cpu className="w-8 h-8" />,
      description: 'Essential control nodes and drivers for seamless automation.',
      folder: 'DRIVER - CONTROLLER - NODE - RELAY'
    },
    'gateways': {
      title: 'Gateways',
      icon: <Smartphone className="w-8 h-8" />,
      description: 'Smart gateways for connecting all your home automation devices.',
      folder: 'GATWAY'
    },
    'scene-switches': {
      title: 'Scene Switches',
      icon: <Camera className="w-8 h-8" />,
      description: 'Programmable switches for custom scene control and automation.',
      folder: 'SCENE SWITCH'
    }
  };

  // Fallback image paths
  const fallbackImages = [
    '/images/PRODUCT DRIVE/SMART SWITCH/TITTAN SWITCH FRONT SIDE/1. 2M 2TOUCH + KNOB.png',
    '/images/placeholder-product.png',
    '/images/default-product.jpg'
  ];

  useEffect(() => {
    const loadProducts = async () => {
      const info = categoryMap[category];
      if (!info) {
        setLoading(false);
        return;
      }

      setCategoryInfo(info);

      try {
        // Fetch real products from API
        const response = await fetch(`/api/products?category=${category}`);
        const data = await response.json();
        
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          // Generate multiple sample products for better UX
          const sampleProducts: Product[] = [
            {
              name: `${info.title} - Premium Model`,
              image: `/images/PRODUCT DRIVE/${info.folder}/1 MODULE SWITCH.png`,
              description: `Advanced ${info.title.toLowerCase()} with premium features and smart home integration.`
            },
            {
              name: `${info.title} - Pro Series`,
              image: `/images/PRODUCT DRIVE/${info.folder}/2 MODULE SWITCH.png`,
              description: `Professional grade ${info.title.toLowerCase()} with enhanced capabilities and reliability.`
            },
            {
              name: `${info.title} - Elite Edition`,
              image: `/images/PRODUCT DRIVE/${info.folder}/3 MODULE SWITCH.png`,
              description: `Elite series ${info.title.toLowerCase()} with cutting-edge technology and design.`
            }
          ];
          setProducts(sampleProducts);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        // Generate sample products on error
        const sampleProducts: Product[] = [
          {
            name: `${info.title} - Premium Model`,
            image: `/images/PRODUCT DRIVE/${info.folder}/1 MODULE SWITCH.png`,
            description: `Advanced ${info.title.toLowerCase()} with premium features and smart home integration.`
          },
          {
            name: `${info.title} - Pro Series`,
            image: `/images/PRODUCT DRIVE/${info.folder}/2 MODULE SWITCH.png`,
            description: `Professional grade ${info.title.toLowerCase()} with enhanced capabilities and reliability.`
          },
          {
            name: `${info.title} - Elite Edition`,
            image: `/images/PRODUCT DRIVE/${info.folder}/3 MODULE SWITCH.png`,
            description: `Elite series ${info.title.toLowerCase()} with cutting-edge technology and design.`
          }
        ];
        setProducts(sampleProducts);
      }

      setLoading(false);
    };

    loadProducts();
  }, [category]);

  const handleImageError = (productName: string, fallbackIndex: number = 0) => {
    setImageErrors(prev => ({
      ...prev,
      [productName]: true
    }));
    
    // You can implement retry logic with different fallback images here
    const imgElement = document.getElementById(`product-image-${productName}`) as HTMLImageElement;
    if (imgElement && fallbackIndex < fallbackImages.length) {
      imgElement.src = fallbackImages[fallbackIndex];
      // If this fallback also fails, try next one
      imgElement.onerror = () => {
        if (fallbackIndex + 1 < fallbackImages.length) {
          handleImageError(productName, fallbackIndex + 1);
        }
      };
    }
  };

  const getImageSrc = (product: Product) => {
    return imageErrors[product.name] ? fallbackImages[0] : product.image;
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

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link href="/products" className="text-blue-400 hover:text-blue-300">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <Link 
              href="/products" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Products
            </Link>
            
            <div className="flex items-center mb-6">
              <div className="text-blue-400 mr-4">
                {categoryInfo.icon}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {categoryInfo.title}
                </h1>
                <p className="text-xl text-gray-300">
                  {categoryInfo.description}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden bg-gray-800">
                    <img
                      id={`product-image-${product.name}`}
                      src={getImageSrc(product)}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      onError={() => handleImageError(product.name)}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <motion.button
                        onClick={() => setSelectedProduct(product)}
                        className="text-blue-400 font-medium hover:text-blue-300 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Product
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {products.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">
                Products for this category will be available soon.
              </p>
            </motion.div>
          )}

        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                >
                  <X size={24} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="relative h-96 lg:h-full min-h-[400px] overflow-hidden bg-gray-800 rounded-l-2xl">
                    <img
                      src={getImageSrc(selectedProduct)}
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain p-8"
                      onError={() => handleImageError(selectedProduct.name)}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-4">
                        {selectedProduct.name}
                      </h2>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-blue-400 mb-3">Product Description</h3>
                        <p className="text-gray-300 leading-relaxed">
                          {selectedProduct.description}
                        </p>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-blue-400 mb-3">Key Features</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center text-gray-300">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            Premium quality construction
                          </li>
                          <li className="flex items-center text-gray-300">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            Smart home compatible
                          </li>
                          <li className="flex items-center text-gray-300">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            Easy installation
                          </li>
                          <li className="flex items-center text-gray-300">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            Mobile app control
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-3">Specifications</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Category:</span>
                            <p className="text-white font-medium">{categoryInfo?.title}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Type:</span>
                            <p className="text-white font-medium">Smart Device</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Warranty:</span>
                            <p className="text-white font-medium">2 Years</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Installation:</span>
                            <p className="text-white font-medium">Professional Recommended</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                      >
                        <Link href="/contact">
                          Get Quote
                        </Link>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedProduct(null)}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                      >
                        Close
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ProductCategoryPage;