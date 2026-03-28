import React from "react";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { Bell, User } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col md:ml-64 relative w-full h-full overflow-y-auto bg-[#070B14]">
        <header className="h-20 flex items-center justify-end px-6 sm:px-10 bg-[#0B0F19]/90 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-6 sm:gap-8">
            <button className="relative text-gray-400 hover:text-white transition-colors group">
              <Bell className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0B0F19]"></span>
            </button>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-white leading-tight group-hover:text-[#22D3EE] transition-colors">Superuser Administrator</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mt-0.5">Control Tower</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#003B73] to-[#1D809F] p-0.5 shadow-lg">
                <div className="w-full h-full rounded-full bg-[#0B0F19] flex items-center justify-center">
                   <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
