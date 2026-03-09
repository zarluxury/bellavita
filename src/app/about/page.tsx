'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { Users, Award, Target, Lightbulb } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Continuously pushing the boundaries of smart home technology with cutting-edge solutions.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Customer First',
      description: 'Our clients are at the heart of everything we do, ensuring complete satisfaction.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality',
      description: 'Uncompromising quality in products, installation, and service delivery.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Excellence',
      description: 'Striving for excellence in every aspect of our business operations.'
    }
  ];

  const milestones = [
    { year: '2018', title: 'Founded', description: 'Started with a vision to transform Indian homes' },
    { year: '2020', title: 'Expansion', description: 'Expanded to multiple cities across India' },
    { year: '2022', title: 'Innovation', description: 'Launched proprietary automation platform' },
    { year: '2024', title: 'Leadership', description: 'Became industry leader in smart home solutions' }
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
              About <span className="text-blue-400">Bellavita</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Bellavita Smart Home is one of India's leading brands in the Smart Home Solutions space. 
              With contemporary sensibilities, best-in-class technology and a deep understanding of the modern Indian home, 
              the company provides people with spaces they are proud to own and happy to call home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Bellavita was created with a vision to integrate globally available smart home technologies 
                and make them accessible at reasonable price points. With advanced technologies and cloud services, 
                Bellavita also transforms commercial spaces such as offices, hotels, gyms and residential buildings.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Bellavita believes smart homes and smart spaces should be accessible and affordable for everyone 
                because the future lies in automation. Our automation integrates lighting control, audio systems, 
                video systems, security and climate control under one seamless solution.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We believe that the future of living is smart, connected, and sustainable. 
                Our mission is to lead this transformation, one home at a time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <img
                src="/images/about-hero.jpg"
                alt="About Bellavita"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <div className="text-blue-400 mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <Card className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Amit Singh</h3>
                  <p className="text-blue-400 mb-2">Founder, CTO, COO</p>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <Card className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Amaan Lakhani</h3>
                  <p className="text-blue-400 mb-2">Co-Founder, CEO, CMO</p>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <Card className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Mukesh Chaudhary</h3>
                  <p className="text-blue-400 mb-2">Founder, Head Architect</p>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
