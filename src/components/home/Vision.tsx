import React from 'react';
import { motion } from 'framer-motion';

const Vision: React.FC = () => {

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
            To transform everyday living into intelligent, intuitive experiences by creating homes that think, adapt, and elevate the way India lives.
          </p>
        </motion.div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            To design and deliver seamless smart home solutions that blend cutting-edge technology with elegant design, making intelligent living effortless, reliable, and accessible for modern Indian homes.
          </p>
        </motion.div>


      </div>
    </section>
  );
};

export default Vision;
