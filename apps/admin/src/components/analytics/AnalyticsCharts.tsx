"use client";

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export const AnalyticsCharts = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const trendData = [
    { name: 'Mon', regs: 40 }, { name: 'Tue', regs: 65 }, { name: 'Wed', regs: 120 },
    { name: 'Thu', regs: 290 }, { name: 'Fri', regs: 450 }, { name: 'Sat', regs: 380 }, { name: 'Sun', regs: 147 }
  ];

  const collegeData = [
    { name: 'VIT', count: 450 }, { name: 'SRM', count: 320 }, { name: 'IITM', count: 180 },
    { name: 'MIT', count: 150 }, { name: 'BITS', count: 110 }
  ];

  const pieData = [
    { name: 'Success', value: 845, color: '#22c55e' },
    { name: 'Pending', value: 647, color: '#f59e0b' },
    { name: 'Cancelled', value: 124, color: '#ef4444' }
  ];

  const TooltipStyle = { backgroundColor: '#0B0F19', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' };

  if (!mounted) return <div className="h-40 animate-pulse bg-white/5 rounded-2xl w-full"></div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Line Chart Component */}
      <div className="lg:col-span-2 bg-gradient-to-br from-white/5 to-[#0B0F19] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#7C3AED]/20 blur-[80px] rounded-full z-0 mix-blend-screen opacity-50"></div>
        <h3 className="text-white font-bold text-xl mb-8 relative z-10 tracking-tight">Registration Pipeline Flux (7 Days)</h3>
        <div className="h-[300px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
              <Tooltip contentStyle={TooltipStyle} itemStyle={{ color: '#fff' }} cursor={{ fill: 'rgba(255,255,255,0.02)', stroke: 'rgba(255,255,255,0.05)', strokeWidth: 2 }} />
              <Line type="monotone" dataKey="regs" stroke="url(#colorUv)" strokeWidth={4} dot={{ r: 5, fill: '#0B0F19', stroke: '#22D3EE', strokeWidth: 2 }} activeDot={{ r: 8, fill: '#22D3EE', stroke: '#fff', strokeWidth: 2 }} animationDuration={2000} />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-6">
        {/* Pie Status Aggregation */}
        <div className="bg-gradient-to-br from-white/5 to-[#0B0F19] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col items-center justify-between h-[220px]">
          <h3 className="text-white font-bold text-lg mb-2 self-start tracking-tight">Transaction Status Node</h3>
          <div className="h-[150px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none" animationDuration={1500}>
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={TooltipStyle} itemStyle={{ color: '#fff', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Node Demographics */}
        <div className="bg-gradient-to-br from-white/5 to-[#0B0F19] border border-white/10 rounded-3xl p-6 shadow-xl h-[220px] flex flex-col justify-between">
          <h3 className="text-white font-bold text-lg mb-2 tracking-tight">Geo-Demographic Hubs</h3>
          <div className="h-[140px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collegeData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} width={40} fontWeight="bold" />
                <Tooltip contentStyle={TooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="count" fill="#7C3AED" radius={[0, 4, 4, 0]} barSize={12} animationDuration={1500}>
                  {collegeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#7C3AED' : '#22D3EE'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
