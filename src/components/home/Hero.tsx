'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const automationOptions = ['Apartment', 'Villa / Bungalow', 'Office', 'Hotel','Building','Club','Other'];
const projectTypeOptions = ['New Building', 'Renovation', 'Existing Property'];
const serviceOptions = [
  { id: 'safety', label: 'Safety & Security Control' },
  { id: 'theatre', label: 'Home Theatre System' },
  { id: 'lighting', label: 'Smart Lighting' },
  { id: 'curtains', label: 'Motorised Curtains' },
  { id: 'climate', label: 'Climate Control' },
  { id: 'audio', label: 'Multi-room Audio' },
];

const Hero: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    automationFor: 'Apartment',
    projectType: 'New Building',
    contactNumber: '',
    city: '',
    details: '',
    services: [] as string[],
  });

  const handleServiceToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter(s => s !== id)
        : [...prev.services, id],
    }));
  };

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    try {
      const response = await fetch('/api/contact-forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          automationFor: formData.automationFor,
          projectType: formData.projectType,
          contactNumber: formData.contactNumber,
          city: formData.city,
          details: formData.details,
          services: formData.services,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          automationFor: 'Apartment',
          projectType: 'New Building',
          contactNumber: '',
          city: '',
          details: '',
          services: [],
        });
        setTimeout(() => setSubmitStatus('idle'), 4000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 4000);
      }
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left - Heading + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            >
              Let's Make Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Space Smarter</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl font-light mb-6 text-gray-300"
            >
              Together.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-gray-400 text-lg mb-10 max-w-lg"
            >
              We would love to hear from you anytime. Tell us about your project and we'll craft the perfect smart solution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <Link href="/contact">
                <Button size="lg" className="px-10 py-4 text-lg">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Automation For + Project Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Automation For</label>
                    <div className="relative">
                      <select
                        value={formData.automationFor}
                        onChange={(e) => setFormData({ ...formData, automationFor: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all cursor-pointer"
                      >
                        {automationOptions.map(opt => (
                          <option key={opt} value={opt} className="bg-gray-900 text-white">{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Project Type</label>
                    <div className="relative">
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all cursor-pointer"
                      >
                        {projectTypeOptions.map(opt => (
                          <option key={opt} value={opt} className="bg-gray-900 text-white">{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 3: Services Checkboxes */}
                <div>
                  <label className="block text-sm text-gray-300 mb-3 font-medium">Services Interested In (Optional)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {serviceOptions.map((service) => (
                      <label
                        key={service.id}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
                          formData.services.includes(service.id)
                            ? 'border-blue-500/50 bg-blue-500/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                          formData.services.includes(service.id)
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-500'
                        }`}>
                          {formData.services.includes(service.id) && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={formData.services.includes(service.id)}
                          onChange={() => handleServiceToggle(service.id)}
                        />
                        <span className="text-sm text-gray-300">{service.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Row 4: Contact Number + City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Contact Number</label>
                    <input
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      placeholder="+91 ..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      placeholder="Your city"
                      required
                    />
                  </div>
                </div>

                {/* Row 5: Details */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2 font-medium">Details</label>
                  <textarea
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
                    placeholder="Tell us more about your project..."
                  />
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-gray-500 leading-relaxed">
                  By submitting this form, you agree that we may use your information for marketing purposes and to send you announcements.
                </p>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitStatus === 'submitting'}
                  className="w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'submitting' ? 'Submitting...' : submitStatus === 'success' ? 'Submitted Successfully!' : submitStatus === 'error' ? 'Something went wrong. Try again.' : 'Submit'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
