"use client";
import React, { useState } from 'react';
import { TeamList } from '../components/teams/TeamList';
import { ScoringForm } from '../components/scoring/ScoringForm';

export default function JudgeDashboard() {
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] w-full max-w-[2000px] mx-auto animate-fade-in relative z-10 selection:bg-purple-900">
      {/* Left Data Render Panel */}
      <div className="w-full md:w-[400px] lg:w-[450px] border-r border-[#1a1a2e] bg-[#05080F] h-full overflow-y-auto">
        <TeamList selectedTeam={selectedTeam} onSelect={setSelectedTeam} />
      </div>

      {/* Right Metric Parsing Center */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0B0F19] to-[#04060b] p-4 sm:p-8 lg:p-12 relative shadow-inner">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/20 blur-[150px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#22D3EE]/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
        
        {selectedTeam ? (
          <ScoringForm team={selectedTeam} />
        ) : (
          <div className="h-full min-h-[60vh] flex flex-col items-center justify-center text-center relative z-10 border-2 border-dashed border-white/5 rounded-[3rem] m-2">
             <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mb-8 border border-white/10 shadow-2xl relative">
               <div className="absolute inset-0 bg-[#7C3AED]/10 blur-xl rounded-[2rem] animate-pulse"></div>
               <span className="text-4xl drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">👨‍⚖️</span>
             </div>
             <h2 className="text-3xl font-black tracking-tight mb-3 text-white">Awaiting Evaluation Payload</h2>
             <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs max-w-[400px] leading-relaxed">Mount any registered team node from the lateral mapping panel to securely enforce hardware constraints against their execution outputs.</p>
          </div>
        )}
      </div>
    </div>
  );
}
