"use client";

import React, { useEffect } from 'react';
import { useUserStore } from '../../store/userStore';
import { LogOut, User as UserIcon } from 'lucide-react';
import { ProfileCard, TeamCard, RegistrationCard, EventCard, LeaderboardPreview } from '../../components/dashboard/Cards';
import Link from 'next/link';

export default function DashboardPage() {
  const { fetchDashboardData, loading, user, team, registration, ticket } = useUserStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-[#7C3AED]/30 border-t-[#7C3AED] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Target Nav Setup */}
      <nav className="w-full bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black text-white tracking-tight">Hack<span className="text-[#7C3AED]">⚡</span>Flow</span>
            <span className="bg-white/10 text-gray-300 text-xs font-bold px-2 py-0.5 rounded ml-2">DASHBOARD</span>
          </Link>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/50 flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-[#7C3AED]" />
              </div>
              <span className="font-semibold text-sm hidden sm:block text-gray-200">{user?.name}</span>
            </div>
            <div className="w-px h-6 bg-white/10"></div>
            <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <h1 className="text-3xl font-extrabold mb-8 tracking-tight">Participant Overview</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Grid Arrays */}
          <div className="lg:col-span-5 space-y-8">
            <ProfileCard user={user} />
            <TeamCard team={team} />
          </div>
          
          {/* Right Grid Architecture */}
          <div className="lg:col-span-7 space-y-8">
            <RegistrationCard registration={registration} ticket={ticket} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <EventCard />
                <LeaderboardPreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
