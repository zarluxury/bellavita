'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-bold text-white">
            Bellavita
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/" className="text-white hover:text-blue-400 transition-colors">
                HOME
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/about" className="text-white hover:text-blue-400 transition-colors">
                ABOUT US
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/products" className="text-white hover:text-blue-400 transition-colors">
                PRODUCTS
              </Link>
            </motion.div>
            
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center text-white hover:text-blue-400 hover:cursor-pointer transition-colors"
              >
                SOLUTIONS
              </motion.button>
              

            </div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/locations" className="text-white hover:text-blue-400 transition-colors">
                LOCATIONS
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/franchise" className="text-white hover:text-blue-400 transition-colors">
                FRANCHISE
              </Link>
            </motion.div>

          </div>

          <motion.div 
            className="hidden md:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/contact">
              <Button size="sm" className='cursor-pointer'>CONTACT US</Button>
            </Link>
          </motion.div>

          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 backdrop-blur-lg rounded-lg border border-white/20 mt-4"
            >
              <div className="px-4 py-6 space-y-4">
                <motion.div whileHover={{ x: 5 }}>
                  <Link href="/" className="block text-white hover:text-blue-400 transition-colors">
                    HOME
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 5 }}>
                  <Link href="/about" className="block text-white hover:text-blue-400 transition-colors">
                    ABOUT US
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 5 }}>
                  <Link href="/products" className="block text-white hover:text-blue-400 transition-colors">
                    PRODUCTS
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 5 }}>
                  <Link href="/solutions" className="block text-white hover:text-blue-400 transition-colors">
                    SOLUTIONS
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 5 }}>
                  <Link href="/locations" className="block text-white hover:text-blue-400 transition-colors">
                    LOCATIONS
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 5 }}>
                  <Link href="/franchise" className="block text-white hover:text-blue-400 transition-colors">
                    FRANCHISE
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 5 }}>
                  <Link href="/contact" className="block text-white hover:text-blue-400 transition-colors">
                    CONTACT
                  </Link>
                </motion.div>
                <div className="pt-4">
                  <Link href="/contact">
                    <Button className="w-full">Contact</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
