import React from 'react';
import { AnalyticsCards } from '../../components/analytics/AnalyticsCards';
import { AnalyticsCharts } from '../../components/analytics/AnalyticsCharts';
import { ActivityFeed } from '../../components/analytics/ActivityFeed';

import { RegistrationToggle } from '../../components/dashboard/RegistrationToggle';

export default function AdminDashboardPage() {
  return (
    <div className="animate-fade-in pb-12 w-full max-w-[1600px] mx-auto">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight mb-3">Platform Ground Control</h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">Target Status mapping pipelines directly against global database indices.</p>
        </div>
        <div className="flex gap-4 items-center">
          <RegistrationToggle />
          <button className="px-6 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm tracking-widest rounded-xl transition-colors shadow-lg shadow-[#7C3AED]/20">
            GENERATE PDF REPORT
          </button>
        </div>
      </div>

      <AnalyticsCards />
      
      <div className="w-full mt-4">
        <AnalyticsCharts />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <ActivityFeed />
        {/* Placeholder for future Judges Feed tracking or Node Metrics mapping */}
        <div className="hidden lg:flex border border-white/5 border-dashed rounded-3xl items-center justify-center bg-white/5">
           <p className="text-gray-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
             <span className="w-3 h-3 rounded-full bg-[#22D3EE] animate-pulse"></span>
             Network Mapping Standby Hub...
           </p>
        </div>
      </div>
    </div>
  );
}
