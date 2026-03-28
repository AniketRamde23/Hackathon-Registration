'use client';

import React, { useState, useEffect } from 'react';
import { Users, Banknote, Clock, TrendingUp } from 'lucide-react';
import api from '../../lib/api';

export const AnalyticsCards = () => {
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    revenue: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/registrations');
        const data = res.data.data || [];
        
        const total = data.length;
        const paid = data.filter((r: any) => r.paymentStatus === 'success').length;
        const pending = data.filter((r: any) => r.paymentStatus === 'pending').length;
        const revenue = paid * 499; // Standard mathematical Base ticket mapping
        const completionRate = total > 0 ? ((paid / total) * 100).toFixed(1) : 0;

        setStats({
          total,
          paid,
          pending,
          revenue,
          completionRate: Number(completionRate)
        });
      } catch (err) {
        console.error('Failed to sync live Analytics Metrics', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const kpis = [
    { title: 'Total Registrations', value: loading ? '...' : stats.total.toString(), change: 'Live DB Mapping Synchronized', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20 shadow-blue-500/10' },
    { title: 'Paid Tickets', value: loading ? '...' : stats.paid.toString(), change: `${stats.completionRate}% completion rate`, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20 shadow-green-500/10' },
    { title: 'Pending Payments', value: loading ? '...' : stats.pending.toString(), change: 'Gateway tracking queues', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20 shadow-amber-500/10' },
    { title: 'Gross Revenue', value: loading ? '...' : `₹${stats.revenue.toLocaleString()}`, change: 'INR Total Collected', icon: Banknote, color: 'text-[#22D3EE]', bg: 'bg-[#22D3EE]/10 border-[#22D3EE]/20 shadow-[#22D3EE]/10' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((k) => (
        <div key={k.title} className="bg-gradient-to-br from-white/5 to-[#0B0F19] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1">
          <div className="flex justify-between items-start mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg ${k.bg}`}>
              <k.icon className={`w-7 h-7 ${k.color}`} />
            </div>
          </div>
          <div>
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">{k.title}</h3>
            <p className="text-white font-black text-4xl tracking-tight mb-2 flex items-baseline gap-2">
               {k.value}
            </p>
            <p className="text-xs text-gray-400 font-semibold">{k.change}</p>
          </div>
          
          <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-[30px] opacity-20 ${k.bg.split(' ')[0]}`}></div>
        </div>
      ))}
    </div>
  );
};
