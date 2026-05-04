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

      {/* Passion Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-linear-to-r from-blue-900/30 to-purple-900/30 rounded-3xl p-12 border border-blue-500/20">
            <p className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-relaxed">
              "Automation is not just a business for Bellavita — it's a passion"
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              We love to leave a signature feel or a unique touch in every home
            </p>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default Vision;
