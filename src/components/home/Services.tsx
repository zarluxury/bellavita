import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Cpu, 
  PanelsTopLeft, 
  Shield, 
  Volume2, 
  Building, 
  Briefcase, 
  Hotel, 
  Clock 
} from 'lucide-react';
import Card from '../ui/Card';

const Services: React.FC = () => {
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
    <section className="py-20 bg-linear-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We offer comprehensive smart home and automation solutions tailored to your 
            specific needs and preferences.
          </p>
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Complete Solution Provider
            </h3>
            <p className="text-white/90 text-lg mb-6">
              From consultation to installation and maintenance, we handle everything 
              to ensure your smart home works perfectly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <span className="text-white font-medium">Free Consultation</span>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <span className="text-white font-medium">Expert Installation</span>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <span className="text-white font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
