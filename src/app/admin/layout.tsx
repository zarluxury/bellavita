'use client';

import Link from 'next/link';
import { Package, Mail, BarChart3, LogOut, FileText, MessageSquare } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { apiHeaders } from '@/lib/apiHeaders';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE', headers: apiHeaders() });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/admin/login');
    }
  };

  const getLinkStyle = (href: string) => {
    const isActive = pathname === href;
    return `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`;
  };

  return (
    // Changed to h-screen to prevent the whole layout from expanding
    <div className="h-screen bg-black text-white flex overflow-hidden">
      
      {/* Sidebar - Fixed Height */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-full">
        {/* Top Header Section */}
        <div className="p-6 border-b border-gray-800 shrink-0">
          <h1 className="text-2xl font-bold text-white leading-tight">Bellavita Admin</h1>
          <p className="text-gray-400 text-xs mt-1">Management Dashboard</p>
        </div>
        
        {/* Navigation - Scrollable if items are too many */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link href="/admin" className={getLinkStyle('/admin')}>
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/products" className={getLinkStyle('/admin/products')}>
                <Package className="w-5 h-5" />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/newsletter" className={getLinkStyle('/admin/newsletter')}>
                <Mail className="w-5 h-5" />
                <span>Newsletter</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/contact-forms" className={getLinkStyle('/admin/contact-forms')}>
                <FileText className="w-5 h-5" />
                <span>Leads</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/get-in-touch" className={getLinkStyle('/admin/get-in-touch')}>
                <MessageSquare className="w-5 h-5" />
                <span>Get In Touch</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Bottom Section - ALWAYS FIXED AT BOTTOM */}
        <div className="p-4 border-t border-gray-800 shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white w-full justify-center font-medium cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="bg-gray-900 border-b border-gray-800 px-8 py-4 shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Admin Panel</h2>
            <div className="text-sm text-gray-400 hidden md:block">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </header>
        
        {/* This main area will scroll while sidebar and header stay fixed */}
        <main className="flex-1 overflow-auto p-8 bg-[#0a0a0a]">
          {children}
        </main>
      </div>
    </div>
  );
}