"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Trophy, RefreshCcw, Search, Users, Loader2 } from 'lucide-react';
import { io } from 'socket.io-client';

export default function LeaderboardPage() {
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData = [
      { rank: 1, teamId: 't1', teamName: 'Vercel Voyagers', members: 4, averageScore: 98.5, judgeCount: 5 },
      { rank: 2, teamId: 't2', teamName: 'Alpha Coders', members: 3, averageScore: 96.2, judgeCount: 5 },
      { rank: 3, teamId: 't3', teamName: 'Byte Target', members: 4, averageScore: 92.0, judgeCount: 4 },
      { rank: 4, teamId: 't4', teamName: 'Neon Hackers', members: 2, averageScore: 88.4, judgeCount: 4 },
      { rank: 5, teamId: 't5', teamName: 'Cyber Punks', members: 4, averageScore: 81.1, judgeCount: 3 },
      { rank: 6, teamId: 't6', teamName: 'Next.js Locals', members: 1, averageScore: 75.3, judgeCount: 2 }
    ];
    
    setTimeout(() => {
      setScores(mockData);
      setLoading(false);
    }, 1200);

    // Initializing Secure Socket Hook mappings over backend architecture explicitly 
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000');
    socket.emit('join:room', 'leaderboard');
    
    socket.on('score:updated', (data) => {
      console.log('Live score aggregated output mapping received:', data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pt-24 pb-12 overflow-x-hidden">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-4 tracking-tight">
              <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl flex items-center justify-center shrink-0">
                <Trophy className="w-8 h-8 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,1)]" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Global Leaderboard</span>
            </h1>
            <p className="text-gray-400 font-medium tracking-wide">Live rankings aggressively parsing judge scoring arrays in real-time.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" placeholder="Trace syntax by Name" className="w-full bg-[#0B0F19] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#7C3AED] outline-none transition-shadow shadow-inner" />
            </div>
            <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-bold hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <RefreshCcw className="w-4 h-4" /> Fetch Data
            </button>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative animate-fade-in">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/50 to-transparent"></div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/10 text-xs uppercase tracking-widest text-[#22D3EE] font-black">
                  <th className="px-8 py-6 w-24 text-center">Rank</th>
                  <th className="px-8 py-6">Target Syntax Alias</th>
                  <th className="px-8 py-6 text-center">Loadout</th>
                  <th className="px-8 py-6 text-right w-40">Compiled Output</th>
                  <th className="px-8 py-6 text-center w-40 hidden md:table-cell">Evaluations</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-gray-500">
                       <Loader2 className="w-10 h-10 text-[#7C3AED] animate-spin mx-auto mb-6" />
                       <span className="font-bold tracking-widest uppercase">Synchronizing aggregate arrays...</span>
                    </td>
                  </tr>
                ) : (
                  scores.map((team, index) => {
                    const isTop1 = index === 0;
                    const isTop3 = index < 3;
                    
                    return (
                      <tr key={team.teamId} className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group cursor-default ${isTop1 ? 'bg-gradient-to-r from-yellow-500/5 to-transparent' : ''}`}>
                        <td className="px-8 py-6 text-center">
                          {index === 0 ? <span className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-500 font-black flex items-center justify-center mx-auto text-lg border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.2)]">1</span> : 
                           index === 1 ? <span className="w-10 h-10 rounded-xl bg-gray-400/20 text-gray-300 font-black flex items-center justify-center mx-auto text-lg border border-gray-400/30">2</span> : 
                           index === 2 ? <span className="w-10 h-10 rounded-xl bg-amber-700/20 text-amber-600 font-black flex items-center justify-center mx-auto text-lg border border-amber-800/30">3</span> : 
                           <span className="text-gray-500 font-bold text-lg">{index + 1}</span>}
                        </td>
                        <td className="px-8 py-6">
                          <div className={`font-black text-lg ${isTop3 ? 'text-white' : 'text-gray-400'} group-hover:text-white transition-colors`}>{team.teamName}</div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className="inline-flex items-center gap-2 text-gray-400 text-sm font-bold bg-[#0B0F19] px-3 py-1.5 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors">
                            <Users className="w-4 h-4 text-[#7C3AED]"/> {team.members} / 4
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className={`font-mono text-3xl font-black tracking-tighter ${isTop1 ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]' : isTop3 ? 'text-white' : 'text-[#22D3EE]'}`}>{team.averageScore.toFixed(1)}</span>
                        </td>
                        <td className="px-8 py-6 text-center hidden md:table-cell">
                          <span className="text-xs font-black px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-500 uppercase tracking-widest">
                            {team.judgeCount} / 5
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
