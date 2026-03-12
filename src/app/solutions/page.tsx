'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Lightbulb, 
  Cpu, 
  PanelsTopLeft, 
  Shield, 
  Volume2, 
  Building, 
  Briefcase, 
  Hotel, 
  Clock,
  Home,
  Zap,
  Smartphone
} from 'lucide-react';

const SolutionsPage: React.FC = () => {
  const solutions = [
    {
      id: 'smart-homes',
      icon: <Home className="w-12 h-12" />,
      title: 'Smart Homes',
      description: 'Smart homes allow control of lighting, appliances, security systems and entertainment systems through a single interface.',
      features: [
        'Unified control platform',
        'Voice assistant integration',
        'Mobile app control',
        'Automated scheduling',
        'Energy monitoring'
      ],
      image: '/images/smart-home.jpg'
    },
    {
      id: 'smart-hotels',
      icon: <Hotel className="w-12 h-12" />,
      title: 'Smart Hotels',
      description: 'Smart hotels improve guest experience through personalized room automation and security.',
      features: [
        'Guest room automation',
        'Keyless entry systems',
        'Climate control',
        'Lighting scenes',
        'Energy management'
      ],
      image: '/images/smart-hotel.jpg'
    },
    {
      id: 'smart-offices',
      icon: <Briefcase className="w-12 h-12" />,
      title: 'Smart Offices',
      description: 'Smart offices improve workplace efficiency and automation while enhancing comfort and security.',
      features: [
        'Meeting room automation',
        'Access control systems',
        'Lighting optimization',
        'Climate management',
        'Productivity tracking'
      ],
      image: '/images/smart-office.jpg'
    },
    {
      id: 'smart-buildings',
      icon: <Building className="w-12 h-12" />,
      title: 'Smart Buildings',
      description: 'Smart buildings integrate lighting, heating and monitoring systems into a centralized automation system.',
      features: [
        'Building management system',
        'HVAC automation',
        'Security integration',
        'Energy optimization',
        'Predictive maintenance'
      ],
      image: '/images/smart-building.jpg'
    }
  ];

  const benefits = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Single App Control',
      description: 'Manage everything from one intuitive mobile application'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Energy Efficient',
      description: 'Reduce energy consumption with intelligent automation'
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Increased Comfort',
      description: 'Create the perfect environment for every moment'
    }
  ];

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Smart <span className="text-blue-400">Solutions</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive range of smart home and automation solutions 
              designed to transform your living and working spaces.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <div className="text-blue-400 mb-4 flex justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300">
                    {benefit.description}
                  </p>
                </Card>
              ))}
            </div>
          </motion.div>

          <div className="space-y-20">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                id={solution.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex items-center mb-4">
                    <div className="text-blue-400 mr-4">
                      {solution.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-white">
                      {solution.title}
                    </h2>
                  </div>
                  
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button>
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Transform Your Space?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Get in touch with our experts to design the perfect automation solution 
                for your home or business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  Get Free Consultation
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                  View Portfolio
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SolutionsPage;
