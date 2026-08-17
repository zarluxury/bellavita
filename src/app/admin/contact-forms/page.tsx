'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, Download, Trash2, Eye, RefreshCw, ChevronDown, X, Phone, Mail, MapPin, Building, User, Clock } from 'lucide-react';
import { apiHeaders } from '@/lib/apiHeaders';

interface ContactForm {
  id: string;
  name: string;
  email: string;
  automation_for: string;
  project_type: string;
  contact_number: string;
  city: string;
  details: string | null;
  services: string[];
  ip: string;
  user_agent: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  contacted: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  'in-progress': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  completed: 'bg-green-500/20 text-green-300 border-green-500/30',
};

const statusOptions = ['new', 'contacted', 'in-progress', 'completed'];

const serviceLabels: Record<string, string> = {
  safety: 'Safety & Security',
  theatre: 'Home Theatre',
  lighting: 'Smart Lighting',
  curtains: 'Motorised Curtains',
  climate: 'Climate Control',
  audio: 'Multi-room Audio',
};

export default function ContactFormsAdmin() {
  const [forms, setForms] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedForm, setSelectedForm] = useState<ContactForm | null>(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const url = statusFilter !== 'all' ? `/api/contact-forms?status=${statusFilter}` : '/api/contact-forms';
      const response = await fetch(url, { headers: apiHeaders() });

      if (!response.ok) throw new Error('Failed to fetch forms');

      const data = await response.json();
      if (data.success) {
        setForms(data.data);
      } else {
        setError(data.error || 'Failed to load forms');
      }
    } catch (err) {
      setError('Error loading forms');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) fetchForms();
  }, [statusFilter]);

  const filteredForms = forms.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.contact_number.includes(searchTerm)
  );

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/contact-forms', {
        method: 'PATCH',
        headers: apiHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        setForms(prev => prev.map(f => f.id === id ? { ...f, status: newStatus } : f));
        if (selectedForm?.id === id) {
          setSelectedForm(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const response = await fetch(`/api/contact-forms?id=${id}`, { method: 'DELETE', headers: apiHeaders() });
      if (response.ok) {
        setForms(prev => prev.filter(f => f.id !== id));
        if (selectedForm?.id === id) setSelectedForm(null);
      }
    } catch (err) {
      console.error('Error deleting form:', err);
    }
  };

  const handleExport = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'City', 'Automation For', 'Project Type', 'Services', 'Details', 'Status', 'Date'],
      ...filteredForms.map(f => [
        f.name,
        f.email,
        f.contact_number,
        f.city,
        f.automation_for,
        f.project_type,
        f.services?.map(s => serviceLabels[s] || s).join('; ') || '',
        (f.details || '').replace(/,/g, ';'),
        f.status,
        new Date(f.created_at).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-forms-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    total: forms.length,
    new: forms.filter(f => f.status === 'new').length,
    contacted: forms.filter(f => f.status === 'contacted').length,
    inProgress: forms.filter(f => f.status === 'in-progress').length,
    completed: forms.filter(f => f.status === 'completed').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
        <p className="text-red-200">{error}</p>
        <button onClick={fetchForms} className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <FileText className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Contact Forms</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button onClick={fetchForms} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: 'Total', count: stats.total, color: 'gray' },
            { label: 'New', count: stats.new, color: 'blue' },
            { label: 'Contacted', count: stats.contacted, color: 'yellow' },
            { label: 'In Progress', count: stats.inProgress, color: 'purple' },
            { label: 'Completed', count: stats.completed, color: 'green' },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{stat.count}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, city, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer pr-10"
            >
              <option value="all">All Status</option>
              {statusOptions.map(opt => (
                <option key={opt} value={opt} className="bg-gray-900">{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        {filteredForms.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              {searchTerm ? 'No forms found matching your search.' : 'No contact form submissions yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Contact</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Project</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredForms.map((form, index) => (
                  <motion.tr
                    key={form.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{form.name}</div>
                          <div className="text-gray-500 text-sm">{form.city}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300 text-sm">{form.email}</div>
                      <div className="text-gray-500 text-sm">{form.contact_number}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300 text-sm">{form.automation_for}</div>
                      <div className="text-gray-500 text-sm">{form.project_type}</div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={form.status}
                        onChange={(e) => handleStatusChange(form.id, e.target.value)}
                        className={`px-3 py-1 rounded-full border text-sm appearance-none cursor-pointer focus:outline-none ${statusColors[form.status] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}
                      >
                        {statusOptions.map(opt => (
                          <option key={opt} value={opt} className="bg-gray-900">{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {new Date(form.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedForm(form)}
                          className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 p-2 rounded-lg transition-colors cursor-pointer"
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(form.id)}
                          className="bg-red-600/20 hover:bg-red-600/30 text-red-400 p-2 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedForm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Submission Details</h2>
                <button onClick={() => setSelectedForm(null)} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-sm">Name</span>
                    </div>
                    <p className="text-white font-medium">{selectedForm.name}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-sm">Email</span>
                    </div>
                    <p className="text-white font-medium">{selectedForm.email}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-sm">Phone</span>
                    </div>
                    <p className="text-white font-medium">{selectedForm.contact_number}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-sm">City</span>
                    </div>
                    <p className="text-white font-medium">{selectedForm.city}</p>
                  </div>
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-sm">Automation For</span>
                    </div>
                    <p className="text-white font-medium">{selectedForm.automation_for}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-sm">Project Type</span>
                    </div>
                    <p className="text-white font-medium">{selectedForm.project_type}</p>
                  </div>
                </div>

                {/* Services */}
                {selectedForm.services && selectedForm.services.length > 0 && (
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <span className="text-gray-400 text-sm block mb-3">Services Interested In</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedForm.services.map((service) => (
                        <span key={service} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-sm">
                          {serviceLabels[service] || service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Details */}
                {selectedForm.details && (
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <span className="text-gray-400 text-sm block mb-2">Details</span>
                    <p className="text-gray-300 leading-relaxed">{selectedForm.details}</p>
                  </div>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 text-sm">
                      Submitted: {new Date(selectedForm.created_at).toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm">
                      IP: {selectedForm.ip || 'Unknown'}
                    </span>
                  </div>
                  <select
                    value={selectedForm.status}
                    onChange={(e) => handleStatusChange(selectedForm.id, e.target.value)}
                    className={`px-3 py-1.5 rounded-full border text-sm appearance-none cursor-pointer focus:outline-none ${statusColors[selectedForm.status] || ''}`}
                  >
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt} className="bg-gray-900">{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
