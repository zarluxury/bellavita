import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Home, Shield, Volume2 } from 'lucide-react';
import Card from '../ui/Card';

const Vision: React.FC = () => {
  const features = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Smart Lighting',
      description: 'Intelligent lighting solutions that adapt to your lifestyle'
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Climate Control',
      description: 'Perfect temperature and humidity management throughout your home'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Advanced Security',
      description: 'State-of-the-art security systems for complete peace of mind'
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: 'Audio Integration',
      description: 'Seamless audio-visual experiences in every room'
    }
  ];

  return (
    <section className="py-20 bg-linear-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Vision
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Bellavita Smart Home is one of India's leading brands in the Smart Home Solutions space. 
            With contemporary sensibilities, best-in-class technology and a deep understanding of the modern Indian home, 
            the company provides people with spaces they are proud to own and happy to call home.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full">
                <div className="text-blue-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              One App to Control Everything
            </h3>
            <p className="text-white/90 text-lg">
              Bellavita was created with a vision to integrate globally available smart home technologies 
              and make them accessible at reasonable price points. With advanced technologies and cloud services, 
              Bellavita also transforms commercial spaces such as offices, hotels, gyms and residential buildings.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
