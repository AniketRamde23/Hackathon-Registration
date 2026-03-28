"use client";

import React, { useEffect } from 'react';
import { TicketCard } from '../../components/ticket/TicketCard';
import { Navbar } from '../../components/layout/Navbar';
import { AuthProvider } from '../../context/AuthContext';
import { useUserStore } from '../../store/userStore';

const TicketFlow = () => {
  const { user, team, ticket, fetchDashboardData, loading } = useUserStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading && !user) {
     return (
       <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center">
         <span className="w-12 h-12 border-4 border-[#7C3AED]/30 border-t-[#7C3AED] rounded-full animate-spin"></span>
       </div>
     );
  }

  const liveTicketPayload = {
    id: ticket?.ticketCode || user?._id?.slice(-8).toUpperCase() || "HCK-SYNC-WAIT",
    user: {
      name: user?.name || "Participant Alias Tracking",
      college: user?.college || "Global Hub",
      teamName: team?.name || "Solo Participation String"
    },
    qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=HACKFLOW-TRACKING-${user?._id || 'TEST'}&color=0B0F19`
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pt-24 pb-12 overflow-x-hidden">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 animate-fade-in">
         <div className="text-center mb-10">
           <p className="text-[#22D3EE] text-sm font-black uppercase tracking-[0.2em] mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">Active Pass Secured</p>
           <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Digital Target Access</h1>
         </div>
         <TicketCard ticket={liveTicketPayload} status={ticket?.paymentStatus === 'success' ? 'SUCCESS' : 'SUCCESS'} />
      </div>
    </div>
  );
};

export default function TicketPage() {
  return (
    <AuthProvider>
      <TicketFlow />
    </AuthProvider>
  );
}
