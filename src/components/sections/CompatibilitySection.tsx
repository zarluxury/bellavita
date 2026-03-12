'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Wifi, Mic, Wrench } from 'lucide-react';

const CompatibilitySection: React.FC = () => {
  const features = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'Easy Installation',
      description: 'Smart devices designed for quick installation and seamless integration with modern homes.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'No Drilling. No Wiring Needed',
      description: 'Wireless solutions that eliminate complex wiring and installation hassles.'
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: 'Completely Wireless',
      description: 'Clean interiors without messy cables while maintaining powerful smart automation.'
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: 'Voice Controlled',
      description: 'Control lighting, devices and automation scenes using voice assistants.'
    }
  ];

  const compatibility = [
    'Apple HomeKit',
    'Samsung SmartThings',
    'Sonos',
    'Google Home',
    'IFTTT',
    'Amazon Alexa',
    'Zigbee 3.0',
    'Home Assistant',
    'Apple AirPlay',
    'Matter',
    'Thread'
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Bellavita Smart Homes?
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We understand that a home is every family's safe haven. That's why Bellavita transforms modern homes 
            into intelligent living spaces designed for comfort, security and convenience.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-blue-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Compatibility Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Best in Class Smart Home Devices
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Compatible With
          </p>
        </motion.div>

        {/* Compatibility Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {compatibility.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg p-4 flex items-center justify-center h-20 hover:bg-gray-100 transition-all duration-300"
            >
              <span className="text-gray-800 text-sm font-medium text-center">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompatibilitySection;
