'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Users, Calendar, Search, Download, Trash2, ExternalLink } from 'lucide-react';

interface NewsletterSubscription {
  id: string;
  email: string;
  timestamp: string;
  ip?: string;
  user_agent?: string;
  created_at?: string;
}

interface ApiResponse {
  success: boolean;
  data: NewsletterSubscription[];
  count: number;
  source?: string;
  error?: string;
}

export default function NewsletterAdmin() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/newsletter', {
        headers: {
          // Remove authentication for development
          // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY || 'your-admin-key'}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subscriptions');
      }

      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setSubscriptions(data.data);
        console.log(`Loaded ${data.count} subscriptions from ${data.source || 'unknown'}`);
      } else {
        setError(data.error || 'Failed to load subscriptions');
      }
    } catch (err) {
      setError('Error loading subscriptions. Check console for details.');
      console.error('Admin dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sub.ip && sub.ip.includes(searchTerm))
  );

  const handleExport = () => {
    const csv = [
      ['Email', 'Date', 'IP Address', 'User Agent'],
      ...filteredSubscriptions.map(sub => [
        sub.email,
        new Date(sub.timestamp).toLocaleString(),
        sub.ip || 'Unknown',
        sub.user_agent ? sub.user_agent.substring(0, 50) + '...' : 'Unknown'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSelectAll = () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][data-subscription-id]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    
    checkboxes.forEach(cb => {
      cb.checked = !allChecked;
    });
    
    setSelectedCount(allChecked ? 0 : filteredSubscriptions.length);
  };

  const handleDeleteSelected = async () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][data-subscription-id]:checked');
    const selectedIds = Array.from(checkboxes).map(cb => cb.getAttribute('data-subscription-id'));
    
    if (selectedIds.length === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedIds.length} subscription(s)?`)) {
      // This would need a DELETE endpoint in the API
      alert('Delete functionality needs to be implemented in the API');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <span className="ml-4">Loading newsletter subscriptions...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
            <p className="text-red-200">{error}</p>
            <button
              onClick={fetchSubscriptions}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Mail className="w-8 h-8 text-blue-400" />
              <h1 className="text-3xl font-bold">Newsletter Subscriptions</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg px-4 py-2">
                <span className="text-blue-300 font-semibold">{subscriptions.length} Total</span>
              </div>
              <div className="bg-green-600/20 border border-green-500/30 rounded-lg px-4 py-2">
                <span className="text-green-300 font-semibold">{filteredSubscriptions.length} Filtered</span>
              </div>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by email or IP address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={fetchSubscriptions}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </motion.div>

        {/* Subscriptions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden"
        >
          {filteredSubscriptions.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                {searchTerm ? 'No subscriptions found matching your search.' : 'No newsletter subscriptions yet.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">IP Address</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">User Agent</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscriptions.map((subscription, index) => (
                    <motion.tr
                      key={subscription.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          data-subscription-id={subscription.id}
                          className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                            <Mail className="w-4 h-4 text-blue-400" />
                          </div>
                          <span className="text-white font-medium">{subscription.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {new Date(subscription.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {subscription.ip || (
                          <span className="text-gray-500 text-sm">Unknown</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs truncate text-gray-300 text-sm" title={subscription.user_agent}>
                          {subscription.user_agent ? (
                            subscription.user_agent.substring(0, 30) + '...'
                          ) : (
                            <span className="text-gray-500 text-sm">Unknown</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => window.open(`mailto:${subscription.email}`, '_blank')}
                          className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 p-2 rounded-lg transition-colors"
                          title="Send email"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Selected Actions */}
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-xl"
          >
            <div className="flex items-center gap-4">
              <span className="text-white">{selectedCount} selected</span>
              <button
                onClick={handleDeleteSelected}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
