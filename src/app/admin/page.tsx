'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, 
  Mail, 
  Package, 
  TrendingUp, 
  Calendar, 
  DollarSign,
  Activity,
  Eye,
  ArrowRight,
  FileText,
  MessageSquare
} from 'lucide-react';
import { apiHeaders } from '@/lib/apiHeaders';

interface DashboardStats {
  totalSubscriptions: number;
  totalProducts: number;
  recentSubscriptions: number;
  totalContactForms: number;
  totalGetInTouch: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSubscriptions: 0,
    totalProducts: 0,
    recentSubscriptions: 0,
    totalContactForms: 0,
    totalGetInTouch: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch newsletter subscriptions
      const newsletterResponse = await fetch('/api/newsletter', { headers: apiHeaders() });
      const newsletterData = await newsletterResponse.json();

      // Fetch products
      const productsResponse = await fetch('/api/all-products', { headers: apiHeaders() });
      const productsData = await productsResponse.json();

      // Fetch contact forms
      let contactFormsCount = 0;
      try {
        const contactFormsResponse = await fetch('/api/contact-forms', { headers: apiHeaders() });
        const contactFormsData = await contactFormsResponse.json();
        contactFormsCount = contactFormsData.count || 0;
      } catch {
        contactFormsCount = 0;
      }

      // Fetch get in touch
      let getInTouchCount = 0;
      try {
        const getInTouchResponse = await fetch('/api/get-in-touch', { headers: apiHeaders() });
        const getInTouchData = await getInTouchResponse.json();
        getInTouchCount = getInTouchData.count || 0;
      } catch {
        getInTouchCount = 0;
      }

      setStats({
        totalSubscriptions: newsletterData.count || 0,
        totalProducts: productsData.data?.length || 0,
        recentSubscriptions: newsletterData.data?.slice(0, 7).length || 0,
        totalContactForms: contactFormsCount,
        totalGetInTouch: getInTouchCount
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Newsletter Subscriptions',
      value: stats.totalSubscriptions,
      change: '+12%',
      changeType: 'positive' as const,
      icon: Mail,
      color: 'blue',
      link: '/admin/newsletter'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      change: '+5%',
      changeType: 'positive' as const,
      icon: Package,
      color: 'green',
      link: '/admin/products'
    },
    {
      title: 'Recent Signups',
      value: stats.recentSubscriptions,
      change: '+8%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'purple',
      link: '/admin/newsletter'
    },
    {
      title: 'Contact Form Submissions',
      value: stats.totalContactForms,
      change: '+15%',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'cyan',
      link: '/admin/contact-forms'
    },
    {
      title: 'Get In Touch Submissions',
      value: stats.totalGetInTouch,
      change: '+10%',
      changeType: 'positive' as const,
      icon: MessageSquare,
      color: 'orange',
      link: '/admin/get-in-touch'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'Create a new product listing',
      icon: Package,
      link: '/admin/products',
      color: 'blue'
    },
    {
      title: 'View Subscriptions',
      description: 'Manage newsletter subscribers',
      icon: Mail,
      link: '/admin/newsletter',
      color: 'green'
    },
    {
      title: 'Analytics',
      description: 'View detailed analytics',
      icon: TrendingUp,
      link: '#',
      color: 'purple'
    },
    {
      title: 'View Contact Forms',
      description: 'Manage form submissions',
      icon: FileText,
      link: '/admin/contact-forms',
      color: 'cyan'
    },
    {
      title: 'Get In Touch',
      description: 'View contact page inquiries',
      icon: MessageSquare,
      link: '/admin/get-in-touch',
      color: 'orange'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome to Bellavita Admin Dashboard</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-600/20 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm mb-4">{stat.title}</p>
            <Link 
              href={stat.link}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1"
            >
              View Details
              <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.title}
              href={action.link}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all hover:scale-105 group"
            >
              <div className={`w-12 h-12 bg-${action.color}-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className={`w-6 h-6 text-${action.color}-400`} />
              </div>
              <h3 className="text-white font-semibold mb-2">{action.title}</h3>
              <p className="text-gray-400 text-sm">{action.description}</p>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">New newsletter subscription</span>
              <span className="text-gray-500 ml-auto">2 min ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300">Product updated</span>
              <span className="text-gray-500 ml-auto">1 hour ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-gray-300">New product added</span>
              <span className="text-gray-500 ml-auto">3 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-400" />
            System Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Database</span>
              <span className="text-green-400 text-sm">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">API</span>
              <span className="text-green-400 text-sm">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Storage</span>
              <span className="text-green-400 text-sm">Healthy</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
