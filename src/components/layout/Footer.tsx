import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Instagram, Facebook, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-4">Bellavita Smart Home</h3>
            <p className="text-gray-400 mb-6 italic">
              "Bellavita - that thinks for your home."
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">6500+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">300+</div>
                <div className="text-sm text-gray-400">Active Clients</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">25+</div>
                <div className="text-sm text-gray-400">Team Advisors</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">2018</div>
                <div className="text-sm text-gray-400">Since</div>
              </div>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/solutions" className="text-gray-400 hover:text-white transition-colors">Solutions</Link></li>
              <li><Link href="/locations" className="text-gray-400 hover:text-white transition-colors">Locations</Link></li>
              <li><Link href="/franchise" className="text-gray-400 hover:text-white transition-colors">Franchise</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-gray-400 text-sm">
                  8/62 Sahyog Society<br />
                  Old Anand Nagar<br />
                  Santacruz East<br />
                  Mumbai 400055
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-400" />
                <span className="text-gray-400 text-sm">info@bellavita.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-400" />
                <span className="text-gray-400 text-sm">+91 22 1234 5678</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm"
        >
          <p>&copy; 2024 Bellavita Smart Homes. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
