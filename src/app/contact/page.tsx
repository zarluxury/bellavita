'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle
} from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone:'',
    organization: '',
    inquiryType: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      content: '+91 81047 70438',
      description: 'Mon-Sat 9AM-7PM'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      content: 'info@bellavitasmarthome.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Office',
      content: '8/62 Sahyog Society, Old Anand Nagar',
      description: 'Santacruz East, Mumbai 400055'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      content: 'Monday - Saturday: 9AM - 7PM',
      description: 'Sunday: Closed'
    }
  ];

  const inquiryTypes = [
    'General Inquiry',
    'Product Information',
    'Technical Support',
    'Partnership',
    'Franchise',
    'Service Request',
    'Other'
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
      // Save to database
      const dbResponse = await fetch('/api/get-in-touch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          inquiryType: formData.inquiryType,
          message: formData.message,
        }),
      });

      if (dbResponse.ok) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone:'',
          organization: '',
          inquiryType: '',
          message: ''
        });
      }

      // Send email notification (non-blocking - don't await)
      fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'Contact Inquiry',
          ...formData
        }),
      }).catch(() => {
        // Email failed silently - data is already saved in DB
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
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
              <h1 className="text-4xl font-bold mb-4">Message Sent!</h1>
              <p className="text-xl text-gray-300 mb-8">
                Thank you for contacting us. Our team will get back to you within 24 hours.
              </p>
              <Button onClick={() => setIsSubmitted(false)}>
                Send Another Message
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
              Get in <span className="text-blue-400">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions about our smart home solutions? We're here to help you 
              transform your living space into an intelligent home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                
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

                  <div>
                    <label className="block text-white mb-2">Organization</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                      placeholder="Enter your organization (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Type of Inquiry *</label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="" className='text-black'>Select inquiry type</option>
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type} className='text-black'>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full flex items-center justify-center"
                    disabled={isSubmitted}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {isSubmitted ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="text-blue-400 shrink-0 mt-1">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {info.title}
                        </h3>
                        <p className="text-gray-300 mb-1">
                          {info.content}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Why Choose Bellavita?</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <p className="text-gray-300">Expert consultation and personalized solutions</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <p className="text-gray-300">5-year warranty on all products</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <p className="text-gray-300">24/7 customer support</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <p className="text-gray-300">Professional installation and maintenance</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <p className="text-gray-300">Competitive pricing and transparent quotes</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
