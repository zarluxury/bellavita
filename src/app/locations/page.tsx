'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { ChevronLeft, ChevronRight, MapPin, Building, Home, Star, ArrowRight, Calendar, CheckCircle2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const LocationsPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      name: 'Runwal Elegante',
      location: 'Andheri West',
      type: 'Residential',
      description: 'Luxury residential complex with complete home automation for 200+ apartments featuring state-of-the-art smart living solutions.',
      features: ['Smart lighting', 'Security systems', 'Climate control', 'Automated curtains', 'Voice control', 'Mobile app integration'],
      image: '/images/location/Runwal_Elegante_Tower_A_-_33.jpg',
      completionYear: '2023',
      rating: 4.8,
      units: '200+',
      detailedDescription: 'Runwal Elegante represents the pinnacle of luxury living in Andheri West, featuring cutting-edge home automation systems that seamlessly integrate lighting, climate control, security, and entertainment. Each of the 200+ apartments is equipped with voice-activated controls, mobile app management, and automated curtain systems, providing residents with unparalleled convenience and sophistication.',
      specifications: {
        totalUnits: '200+ Apartments',
        automationLevel: 'Full Home Automation',
        keyFeatures: ['Voice Control', 'Mobile App', 'Smart Security', 'Energy Management'],
        completionDate: '2023'
      }
    },
    {
      name: 'World One',
      location: 'Lower Parel',
      type: 'Residential',
      description: 'Premium high-rise with integrated smart home solutions for ultra-luxury living with breathtaking city views.',
      features: ['Home automation', 'Audio integration', 'Smart security', 'Energy management', 'Scene automation', 'Biometric access'],
      image: '/images/location/one world.jpg',
      completionYear: '2024',
      rating: 4.9,
      units: '150+',
      detailedDescription: 'World One stands as an architectural marvel in Lower Parel, offering ultra-luxury residences with breathtaking panoramic views of Mumbai. This premium high-rise features comprehensive smart home integration, including advanced audio systems, biometric security, and sophisticated scene automation that adapts to residents\' lifestyles.',
      specifications: {
        totalUnits: '150+ Luxury Apartments',
        automationLevel: 'Premium Automation',
        keyFeatures: ['Biometric Access', 'Audio Integration', 'Scene Management', 'Energy Optimization'],
        completionDate: '2024'
      }
    },
    {
      name: 'Indiabulls Blu',
      location: 'Worli',
      type: 'Residential',
      description: 'Sophisticated automation systems for waterfront luxury residences with panoramic ocean views.',
      features: ['Lighting control', 'Curtain automation', 'Security', 'Entertainment systems', 'Smart sensors', 'Remote monitoring'],
      image: '/images/location/indiabulls_blu_tower_b-worli-mumbai-indiabulls.jpeg',
      completionYear: '2023',
      rating: 4.7,
      units: '180+',
      detailedDescription: 'Indiabulls Blu offers sophisticated waterfront living in Worli with panoramic ocean views and advanced automation systems. Each residence features intelligent lighting control, automated curtains, comprehensive security systems, and entertainment integration, all managed through smart sensors and remote monitoring capabilities.',
      specifications: {
        totalUnits: '180+ Waterfront Residences',
        automationLevel: 'Advanced Integration',
        keyFeatures: ['Waterfront Views', 'Smart Sensors', 'Remote Monitoring', 'Entertainment Systems'],
        completionDate: '2023'
      }
    },
    {
      name: 'Rustomjee Crown',
      location: 'Prabhadevi',
      type: 'Residential',
      description: 'Complete smart home integration for premium residential development with cutting-edge technology.',
      features: ['Smart switches', 'Door locks', 'Sensors', 'Cameras', 'Central control', 'Energy optimization'],
      image: '/images/location/JLL_Mumbai_Rustomjee Crown_3493_EXT_1.jpg',
      completionYear: '2024',
      rating: 4.9,
      units: '120+',
      detailedDescription: 'Rustomjee Crown in Prabhadevi sets new standards for smart living with cutting-edge technology integration. This premium development features intelligent switches, advanced door locks, comprehensive sensor networks, and centralized control systems, all optimized for maximum energy efficiency and resident comfort.',
      specifications: {
        totalUnits: '120+ Premium Apartments',
        automationLevel: 'Cutting-Edge Technology',
        keyFeatures: ['Central Control', 'Energy Optimization', 'Advanced Security', 'Smart Switches'],
        completionDate: '2024'
      }
    }
  ];

  const cities = [
    { 
      name: 'Mumbai', 
      image: '/images/location/indiabulls_blu_tower_b-worli-mumbai-indiabulls.jpeg',
      projects: '15+ Projects',
      description: 'Financial capital with premium smart homes'
    }
  ];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/location/one world.jpg"
            alt="City Skyline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white px-4 max-w-5xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Locations</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Discover our premium projects across India's major cities with cutting-edge smart home automation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Cities We Serve
            </h2>
          </motion.div>

          <div className="flex justify-center items-center mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
              {cities.map((city, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="lg:col-start-2"
              >
                <Card className="overflow-hidden group cursor-pointer bg-[#0A0A0A] border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">{city.name}</h3>
                      <p className="text-blue-400 text-sm font-medium">{city.projects}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 text-sm leading-relaxed">{city.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
            </div>
          </div>

          {/* Featured Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our portfolio of premium automation installations and smart living spaces
            </p>
          </motion.div>

          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center justify-center">
              <button
                onClick={prevProject}
                className="absolute left-0 z-10 p-4 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
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
                  <Card className="overflow-hidden bg-[#0A0A0A] border border-white/10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative h-80 lg:h-[500px]">
                        <Image
                          src={projects[currentIndex].image}
                          alt={projects[currentIndex].name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-6 left-6">
                          <div className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full">
                            <span className="text-blue-400 text-sm font-medium">Featured Project</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-8 lg:p-12 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center mb-6">
                            <MapPin className="w-5 h-5 text-blue-400 mr-2" />
                            <span className="text-blue-400 font-medium">{projects[currentIndex].location}</span>
                            <span className="mx-3 text-gray-600">•</span>
                            <Building className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-gray-400">{projects[currentIndex].type}</span>
                          </div>
                          
                          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                            {projects[currentIndex].name}
                          </h3>
                          
                          <div className="flex items-center gap-6 mb-6">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-gray-400">Completed {projects[currentIndex].completionYear}</span>
                            </div>
                            <div className="flex items-center">
                              <Home className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-gray-400">{projects[currentIndex].units} Units</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                              <span className="text-gray-400">{projects[currentIndex].rating} Rating</span>
                            </div>
                          </div>

                          <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            {projects[currentIndex].description}
                          </p>

                          <div className="flex flex-wrap gap-3 mb-8">
                            {projects[currentIndex].features.map((feature, index) => (
                              <div key={index} className="flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                                <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2" />
                                <span className="text-blue-300 text-sm font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={openModal}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center"
                          >
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </button>
                          <Link href="/contact">
                            <button className="px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-full font-semibold transition-all duration-300">
                              Schedule Visit
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={nextProject}
                className="absolute right-0 z-10 p-4 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="flex justify-center mt-8 space-x-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-blue-400 w-8' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-16 max-w-5xl mx-auto text-center border border-white/10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Space?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Schedule a consultation to explore our smart home solutions and visit our flagship projects
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                    Schedule a Visit
                  </button>
                </Link>
                <button className="px-8 py-4 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300">
                  Download Brochure
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-96">
                    <Image
                      src={projects[currentIndex].image}
                      alt={projects[currentIndex].name}
                      fill
                      className="object-cover rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none" />
                  </div>
                  
                  <div className="p-8 lg:p-12">
                    <h3 className="text-3xl font-bold text-white mb-4">{projects[currentIndex].name}</h3>
                    <div className="flex items-center mb-6">
                      <MapPin className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="text-blue-400 font-medium">{projects[currentIndex].location}</span>
                      <span className="mx-3 text-gray-600">•</span>
                      <Building className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-400">{projects[currentIndex].type}</span>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-8">{projects[currentIndex].detailedDescription}</p>
                    
                    <div className="space-y-4 mb-8">
                      <h4 className="text-xl font-semibold text-white mb-4">Specifications</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Total Units</p>
                          <p className="text-white font-medium">{projects[currentIndex].specifications.totalUnits}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Automation Level</p>
                          <p className="text-white font-medium">{projects[currentIndex].specifications.automationLevel}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Completion</p>
                          <p className="text-white font-medium">{projects[currentIndex].specifications.completionDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Rating</p>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                            <span className="text-white font-medium">{projects[currentIndex].rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {projects[currentIndex].specifications.keyFeatures.map((feature, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Link href="/contact">
                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105">
                          Schedule Visit
                        </button>
                      </Link>
                      <button 
                        onClick={closeModal}
                        className="px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-full font-semibold transition-all duration-300"
                      >
                        Close
                      </button>
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

export default LocationsPage;
