'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Image as ImageIcon, Save, X, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

interface Category {
  id: string;
  slug: string;
  title: string;
  folder: string;
  productCount?: number;
}

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form states
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categorySlug: '', // Changed from 'category' to 'categorySlug'
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data.categories || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/all-products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data.map((product: any) => ({
          id: product.id,
          name: product.name,
          description: product.description || '',
          image: product.imageUrl || '',
          category: product.category // Keep the slug, and find category by slug in display
        })));
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Debug: Log input changes
    console.log('Form input changed:', { name, value });
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.categorySlug) {
      setError('Name and category are required');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('description', formData.description);
      formPayload.append('categorySlug', formData.categorySlug);
      
      // Debug: Log form data
      console.log('Form data being submitted:', {
        name: formData.name,
        description: formData.description,
        categorySlug: formData.categorySlug,
        imageFile: imageFile?.name
      });
      
      if (imageFile) {
        formPayload.append('image', imageFile);
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.data.message || 'Product saved successfully!');
        resetForm();
        fetchProducts(); // Refresh products list
      } else {
        setError(data.error?.error || 'Failed to save product');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', categorySlug: '' });
    setImageFile(null);
    setImagePreview('');
    setIsAddingProduct(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      categorySlug: product.category,
    });
    setImagePreview(product.image);
    setIsAddingProduct(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Product deleted successfully');
        fetchProducts();
      } else {
        setError('Failed to delete product');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Product Management</h1>
            <p className="text-gray-400">Manage your smart home products and images</p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/addproduct"
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Simple Form
            </Link>
            <button
              onClick={() => setIsAddingProduct(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>

        {/* Alerts */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-200">{error}</span>
              <button onClick={() => setError(null)} className="ml-auto">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
          
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-lg flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-200">{success}</span>
              <button onClick={() => setSuccess(null)} className="ml-auto">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add/Edit Product Form */}
        <AnimatePresence>
          {(isAddingProduct || editingProduct) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-8 bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                      placeholder="Enter product name"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      name="categorySlug"
                      value={formData.categorySlug}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.slug}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="Enter product description"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Product Image
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Choose Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      {imageFile && (
                        <span className="text-sm text-gray-400">
                          {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      )}
                    </div>
                    
                    {(imagePreview || editingProduct?.image) && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-400 mb-2">Image Preview:</p>
                        <div className="relative w-48 h-48 bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src={imagePreview || editingProduct?.image || ''}
                            alt="Product preview"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {uploading ? 'Uploading...' : (editingProduct ? 'Update Product' : 'Add Product')}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products List */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">
              Products ({products.length})
            </h2>
          </div>
          
          {products.length === 0 ? (
            <div className="p-12 text-center">
              <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-4">No products found</p>
              <button
                onClick={() => setIsAddingProduct(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Add Your First Product
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="shrink-0 h-12 w-12">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={48}
                                height={48}
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="h-12 w-12 bg-gray-700 rounded-lg flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900/50 text-blue-300">
                          {categories.find(cat => cat.slug === product.category)?.title || product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300 max-w-xs truncate">
                          {product.description || 'No description'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
