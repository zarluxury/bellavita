'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Award, 
  Zap, 
  Globe,
  CheckCircle,
  Building
} from 'lucide-react';
import { apiHeaders } from '@/lib/apiHeaders';

const FranchisePage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    background: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const statistics = [
    {
      icon: <Building className="w-8 h-8" />,
      value: '1500 sq ft',
      label: 'Minimum Area Required'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: 'Up to 1.5cr',
      label: 'Investment Range'
    },
    {
      icon: <Target className="w-8 h-8" />,
      value: '70-85%',
      label: 'ROI Potential'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: '24 months',
      label: 'Capex Recovery'
    }
  ];

  const whyFranchise = [
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Bellavita Sales Engine',
      description: 'Best in class marketing and sales support to help you grow your business rapidly.'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Bellavita Operators',
      description: 'World class operations training and support to ensure smooth business operations.'
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: 'Continuous Innovation',
      description: 'Access to latest technology and product innovations to stay ahead of competition.'
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Proven Track Record',
      description: 'Join a successful franchise model with demonstrated success across multiple locations.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: apiHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          subject: 'Franchise Inquiry',
          ...formData
        }),
      });

      if (response.ok) {
        
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          pincode: '',
          city: '',
          state: '',
          background: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
    }finally{
      setIsSubmitted(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
              <p className="text-xl text-gray-300 mb-8">
                Your franchise inquiry has been submitted successfully. Our team will contact you within 24-48 hours.
              </p>
              <Button onClick={() => setIsSubmitted(false)}>
                Submit Another Inquiry
              </Button>
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

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
              Own a Smart Home <span className="text-blue-400">Business</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Be a Part of India's Fastest Growing Home Automation Brand
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {statistics.map((stat, index) => (
              <Card key={index} className="text-center">
                <div className="text-blue-400 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300">
                  {stat.label}
                </div>
              </Card>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Bellavita Franchise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whyFranchise.map((reason, index) => (
                <Card key={index}>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full shrink-0"></div>
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-center mb-8">Franchise Application</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-white mb-2">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                      placeholder="Enter pincode"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                      placeholder="Enter city"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                      placeholder="Enter state"
                    />
                  </div>
                </div>



                <div>
                  <label className="block text-white mb-2">Tell us about your background *</label>
                  <textarea
                    name="background"
                    value={formData.background}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                    placeholder="Describe your professional background, experience, and why you're interested in this franchise..."
                  />
                </div>

                <div className="text-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="px-12"
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FranchisePage;
