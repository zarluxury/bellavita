'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import Card from '../ui/Card';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Seema Savarkar',
      location: 'Pune',
      content: 'I had always dreamt of an automated home. Bellavita made it possible with their affordable pricing and seamless service.',
      rating: 5
    },
    {
      name: 'Architect',
      location: 'Mumbai',
      content: 'Bellavita simplified automation integration by offering a single solution instead of multiple vendors.',
      rating: 5
    },
    {
      name: 'Anubhav Manoharan',
      location: 'Bengaluru',
      content: 'I wanted a fully automated home for my family\'s safety. Bellavita delivered exactly what I envisioned.',
      rating: 5
    },
    {
      name: 'Lipika Sinha',
      location: 'Gujarat',
      content: 'My first home automation experience with Bellavita was exceptional.',
      rating: 5
    },
    {
      name: 'Mikhail Ningombam',
      location: 'Delhi',
      content: 'Automating my office with Bellavita was one of the best decisions for my business.',
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear what our satisfied customers have to say about their Bellavita experience.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            <button
              onClick={prevTestimonial}
              className="absolute left-0 z-10 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
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
                <Card className="text-center p-8 md:p-12">
                  <div className="text-blue-400 mb-6 flex justify-center">
                    <Quote size={48} />
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-xl text-gray-300 leading-relaxed mb-8 italic">
                    "{testimonials[currentIndex].content}"
                  </p>

                  <div className="border-t border-gray-700 pt-6">
                    <h4 className="text-xl font-semibold text-white mb-1">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-400">
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 z-10 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
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
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">98%</div>
              <div className="text-gray-400">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">5★</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">1000+</div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
