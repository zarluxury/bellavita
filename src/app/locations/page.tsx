'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { ChevronLeft, ChevronRight, MapPin, Building, Home } from 'lucide-react';

const LocationsPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      name: 'Runwal Elegante',
      location: 'Andheri West',
      type: 'Residential',
      description: 'Luxury residential complex with complete home automation for 200+ apartments.',
      features: ['Smart lighting', 'Security systems', 'Climate control', 'Automated curtains'],
      image: '/images/runwal-elegante.jpg',
      completionYear: '2023'
    },
    {
      name: 'World One',
      location: 'Lower Parel',
      type: 'Residential',
      description: 'Premium high-rise with integrated smart home solutions for ultra-luxury living.',
      features: ['Home automation', 'Audio integration', 'Smart security', 'Energy management'],
      image: '/images/world-one.jpg',
      completionYear: '2024'
    },
    {
      name: 'Indiabulls Blu',
      location: 'Worli',
      type: 'Residential',
      description: 'Sophisticated automation systems for waterfront luxury residences.',
      features: ['Lighting control', 'Curtain automation', 'Security', 'Entertainment systems'],
      image: '/images/indiabulls-blu.jpg',
      completionYear: '2023'
    },
    {
      name: 'Rustomjee Crown',
      location: 'Prabhadevi',
      type: 'Residential',
      description: 'Complete smart home integration for premium residential development.',
      features: ['Smart switches', 'Door locks', 'Sensors', 'Cameras', 'Central control'],
      image: '/images/rustomjee-crown.jpg',
      completionYear: '2024'
    },
    {
      name: 'Lodha Bella Vista',
      location: 'Worli',
      type: 'Residential',
      description: 'State-of-the-art automation for luxury waterfront apartments.',
      features: ['Voice control', 'Scene automation', 'Energy monitoring', 'Remote access'],
      image: '/images/lodha-bella-vista.jpg',
      completionYear: '2024'
    },
    {
      name: 'Amita Tower',
      location: 'Bandra Kurla Complex',
      type: 'Commercial',
      description: 'Commercial building automation with advanced energy management.',
      features: ['Building management', 'Access control', 'HVAC control', 'Lighting automation'],
      image: '/images/amita-tower.jpg',
      completionYear: '2023'
    }
  ];

  const cities = [
    { name: 'Mumbai', image: '/images/mumbai-skyline.jpg' },
    { name: 'Pune', image: '/images/pune-skyline.jpg' },
    { name: 'Bengaluru', image: '/images/bengaluru-skyline.jpg' },
    { name: 'Delhi', image: '/images/delhi-skyline.jpg' }
  ];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/city-skyline-hero.jpg"
            alt="City Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black-70" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white px-4 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-blue-400">Locations</span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover our premium projects across India's major cities
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Cities We Serve
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Present in major cities with a growing network of satisfied customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {cities.map((city, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {city.name}
                    </h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our portfolio of premium automation installations
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            <div className="flex items-center justify-center">
              <button
                onClick={prevProject}
                className="absolute left-0 z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <Card className="overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="relative h-64 lg:h-96">
                        <img
                          src={projects[currentIndex].image}
                          alt={projects[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                      </div>

                      <div className="p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center mb-4">
                            <MapPin className="w-5 h-5 text-blue-400 mr-2" />
                            <span className="text-blue-400">{projects[currentIndex].location}</span>
                          </div>
                          
                          <h3 className="text-3xl font-bold text-white mb-3">
                            {projects[currentIndex].name}
                          </h3>
                          
                          <div className="flex items-center mb-4">
                            <Home className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-gray-400">{projects[currentIndex].type}</span>
                            <span className="mx-2 text-gray-600">•</span>
                            <span className="text-gray-400">Completed {projects[currentIndex].completionYear}</span>
                          </div>

                          <p className="text-gray-300 leading-relaxed mb-6">
                            {projects[currentIndex].description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {projects[currentIndex].features.map((feature, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={nextProject}
                className="absolute right-0 z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Transform Your Space?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Schedule a consultation to explore our smart home solutions
              </p>
              <button className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Schedule a Visit
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocationsPage;
