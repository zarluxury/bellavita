'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { apiHeaders } from '@/lib/apiHeaders';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: apiHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Thank you for subscribing! Check your email for confirmation.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-purple-900 to-pink-900"></div>
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6"
          >
            <Mail className="w-10 h-10 text-white" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Stay Updated with Smart Living
          </h2>
          
          {/* Subtext */}
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Subscribe to get the latest updates, exclusive offers, and smart home ideas delivered to your inbox
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-gray-200">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Latest Smart Home Tech</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Exclusive Offers</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Design Inspiration</span>
            </div>
          </div>
        </motion.div>

        {/* Subscription Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              {/* Input with icon */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-32 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  disabled={status === 'loading'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Status Messages */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                status === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-200' 
                  : 'bg-red-500/20 border border-red-500/30 text-red-200'
              }`}
            >
              {status === 'success' ? (
                <CheckCircle className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span className="text-sm">{message}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Join 10,000+ smart home enthusiasts</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-gray-400 text-xs mt-2">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -top-10 -left-10 w-20 h-20 bg-linear-to-br from-blue-400 to-purple-600 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute -bottom-10 -right-10 w-32 h-32 bg-linear-to-br from-purple-400 to-pink-600 rounded-full opacity-20 blur-xl"
        />
      </div>
    </section>
  );
};

export default Newsletter;
