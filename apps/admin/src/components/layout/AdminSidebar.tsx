"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Users, QrCode, Gavel, UserCog, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';

export const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: 'Overview', href: '/', icon: Home },
    { name: 'Registrations', href: '/registrations', icon: Users },
    { name: 'QR Scanner', href: '/scanner', icon: QrCode },
    { name: 'Scores & Eval', href: '/scores', icon: Gavel },
    { name: 'Users Control', href: '/users', icon: UserCog },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      <button className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#0B0F19] p-2 rounded-lg border border-white/10" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#0B0F19] border-r border-white/10 flex flex-col transition-transform duration-300 z-40 shadow-[10px_0_30px_rgba(0,0,0,0.5)] ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#003B73] to-[#1D809F] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(29,128,159,0.5)]">
            <span className="text-white font-black text-sm tracking-widest leading-none">VD</span>
          </div>
          <span className="text-2xl font-black text-white tracking-widest uppercase">VYNEDAM</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.map((L) => (
            <Link key={L.name} href={L.href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors group">
              <L.icon className="w-5 h-5 group-hover:text-[#22D3EE] transition-colors" />
              <span className="font-semibold text-sm tracking-wide">{L.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={() => { 
              document.cookie = 'admin_token=; path=/; max-age=0;'; 
              window.location.href='/login'; 
            }} 
            className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 font-bold tracking-widest uppercase text-xs transition-colors border border-red-500/20"
          >
            <LogOut className="w-4 h-4" /> Terminate Session
          </button>
        </div>
      </aside>
    </>
  );
};
