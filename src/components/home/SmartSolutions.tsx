'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building, Hotel, Briefcase, Users, ChevronRight, Lightbulb, Shield, Zap, Wifi, Volume2 } from 'lucide-react';
import Card from '../ui/Card';
import {  
  Cpu, 
  PanelsTopLeft, 
  Clock 
} from 'lucide-react';
import Link from 'next/link';
interface Solution {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  image: string;
  color: string;
}

const SmartSolutions: React.FC = () => {
  const [activeSolution, setActiveSolution] = useState<number>(1);

  const solutions: Solution[] = [
    {
      id: 1,
      title: 'Smart Home',
      description: 'Transform your residence into an intelligent living space with seamless automation and control.',
      icon: <Home className="w-8 h-8" />,
      features: [
        'Voice-controlled lighting and climate',
        'Automated security systems',
        'Smart entertainment integration',
        'Energy management and optimization'
      ],
      image: '/images/oursolutions/smart-home.jpg',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Smart Office',
      description: 'Enhance productivity and efficiency with intelligent workspace automation solutions.',
      icon: <Briefcase className="w-8 h-8" />,
      features: [
        'Automated meeting room management',
        'Smart lighting and climate control',
        'Access control and security',
        'Energy monitoring and savings'
      ],
      image: '/images/oursolutions/smart-office.jpg',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Smart Building',
      description: 'Comprehensive building management systems for optimal performance and sustainability.',
      icon: <Building className="w-8 h-8" />,
      features: [
        'Centralized building management',
        'HVAC automation and optimization',
        'Fire safety and emergency systems',
        'Predictive maintenance alerts'
      ],
      image: '/images/oursolutions/smart-building.jpeg',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Smart Hotel',
      description: 'Elevate guest experiences with intelligent hospitality automation solutions.',
      icon: <Hotel className="w-8 h-8" />,
      features: [
        'Keyless entry systems',
        'Guest room automation',
        'Energy-efficient operations',
        'Staff management and coordination'
      ],
      image: '/images/oursolutions/smart-hotel.jpg',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      title: 'Smart Clubs',
      description: 'Create immersive experiences with intelligent entertainment and venue automation.',
      icon: <Users className="w-8 h-8" />,
      features: [
        'Dynamic lighting and sound systems',
        'Access control and member management',
        'Atmosphere automation',
        'Security and surveillance'
      ],
      image: '/images/oursolutions/smart-club.jpg',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const benefits = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Energy Efficiency',
      description: 'Reduce energy consumption by up to 40% with intelligent automation'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Enhanced Security',
      description: 'Advanced security systems with real-time monitoring and alerts'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Increased Productivity',
      description: 'Optimize environments for better focus and efficiency'
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: 'Seamless Integration',
      description: 'Connect all systems through a unified smart platform'
    }
  ];

  const services = [
      {
        icon: <Lightbulb className="w-8 h-8" />,
        title: 'Smart Lights',
        description: 'Intelligent lighting solutions with mood settings and automation'
      },
      {
        icon: <Cpu className="w-8 h-8" />,
        title: 'Home Automation',
        description: 'Complete home automation with seamless device integration'
      },
      {
        icon: <PanelsTopLeft className="w-8 h-8" />,
        title: 'Motorised Curtains',
        description: 'Automated curtain systems with light and temperature sensors'
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: 'Smart Security',
        description: 'Advanced security systems with real-time monitoring'
      },
      {
        icon: <Volume2 className="w-8 h-8" />,
        title: 'Audio / Video Setup with Calibration',
        description: 'Integrated entertainment systems with professional calibration'
      },
      {
        icon: <Building className="w-8 h-8" />,
        title: 'Smart Bed (Zero Gravity)',
        description: 'Advanced smart bed with zero gravity positioning'
      },
      {
        icon: <Briefcase className="w-8 h-8" />,
        title: '24×7 Monitoring',
        description: 'Round-the-clock monitoring and support services'
      }
    ];

  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-blue-500 font-semibold tracking-widest uppercase text-sm">Our Solutions</span>
          <h2 className="text-5xl font-bold text-white mt-4 mb-6">
            Intelligent Spaces for Every Need
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            We specialize in creating smart environments tailored for homes, offices, buildings, hotels, and clubs, 
            delivering cutting-edge automation solutions that transform how you live, work, and play.
          </p>
        </motion.div>

        {/* Solutions Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {solutions.map((solution) => (
            <motion.button
              key={solution.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSolution(solution.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeSolution === solution.id
                  ? 'bg-gradient-to-r text-white shadow-lg'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              } ${solution.color}`}
            >
              <span className="flex items-center gap-2">
                {solution.icon}
                {solution.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Active Solution Display */}
        <AnimatePresence mode="wait">
          {solutions.filter(s => s.id === activeSolution).map((solution) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
            >
              {/* Left - Content */}
              <div className="space-y-6">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${solution.color}`}>
                  {solution.icon}
                </div>
                
                <h3 className="text-4xl font-bold text-white mb-4">{solution.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">{solution.description}</p>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
                  {solution.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${solution.color}`} />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right - Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden border border-white/10">
                  <img 
                    src={solution.image} 
                    alt={solution.title}
                    className="w-full h-full object-fit"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${solution.color} opacity-20`} />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Benefits Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="text-center h-full hover:bg-white/15 transition-all duration-300">
                        <div className="text-blue-400 mb-4 flex justify-center">
                          {service.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                          {service.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {service.description}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Space?
              </h3>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Let's discuss how our smart solutions can be tailored to your specific needs and requirements.
              </p>
              <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SmartSolutions;
