import React from 'react';
import Link from 'next/link';
import { Trophy, ArrowLeft, TrendingUp } from 'lucide-react';

export default function LeaderboardPage() {
  const leaderboard = [
    { rank: 1, team: 'Vercel Voyagers', project: 'Global Edge Sync Platform', score: 98.5 },
    { rank: 2, team: 'Neon Hackers', project: 'Neural Node Mesh', score: 94.2 },
    { rank: 3, team: 'Alpha Coders', project: 'AI Medical Inference Engine', score: 89.1 },
    { rank: 4, team: 'Byte Target', project: 'Distributed Vector DB', score: 85.0 },
    { rank: 5, team: 'Solo Target Hub', project: 'Undefined', score: 72.0 },
  ];

  return (
    <div className="max-w-[1400px] w-full mx-auto p-4 sm:p-8 mt-4 animate-fade-in relative z-10 min-h-[80vh]">
      
      <div className="mb-10 p-8 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] bg-[#22D3EE]/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
             <div className="w-14 h-14 bg-gradient-to-br from-[#22D3EE] to-[#7C3AED] rounded-[1rem] flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)]">
               <Trophy className="w-7 h-7 text-white" />
             </div>
             Global Evaluation Leaderboard
          </h1>
          <p className="text-[#22D3EE] font-bold uppercase tracking-[0.2em] text-xs mt-3 ml-1">Live Read-Only Vector Tracking Aggregated Computations</p>
        </div>
        
        <Link href="/" className="relative z-10 px-8 py-4 rounded-xl bg-[#0B0F19] text-[#7C3AED] font-black tracking-widest uppercase border border-[rgba(124,58,237,0.3)] hover:border-[#7C3AED] hover:bg-[#7C3AED]/10 transition-all flex items-center gap-3 text-xs shadow-inner hover:-translate-y-1">
           <ArrowLeft className="w-4 h-4" /> Exit to Terminal
        </Link>
      </div>

      <div className="grid grid-cols-1 mb-10 gap-4 relative z-10">
        <div className="bg-[#05080F]/90 backdrop-blur-md rounded-[2rem] border border-white/10 p-2 overflow-hidden shadow-2xl relative">
          <table className="w-full text-left border-collapse min-w-[800px]">
             <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.25em] text-gray-500 font-black">
                   <th className="px-8 py-6 w-24 text-center">Rank</th>
                   <th className="px-5 py-6 pl-10 text-white">Target Entity Identity</th>
                   <th className="px-5 py-6">Executed Project Namespace</th>
                   <th className="px-8 py-6 text-right"><TrendingUp className="w-4 h-4 inline mr-2 text-[#22D3EE]" /> Aggregated Base Score</th>
                </tr>
             </thead>
             <tbody>
                {leaderboard.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group cursor-default relative overflow-hidden">
                    {i === 0 && <td className="absolute inset-0 bg-gradient-to-r from-[rgba(234,179,8,0.05)] to-transparent pointer-events-none"></td>}
                    {i === 1 && <td className="absolute inset-0 bg-gradient-to-r from-[rgba(156,163,175,0.05)] to-transparent pointer-events-none"></td>}
                    {i === 2 && <td className="absolute inset-0 bg-gradient-to-r from-[rgba(180,83,9,0.05)] to-transparent pointer-events-none"></td>}

                    <td className="px-8 py-8 text-center relative z-10">
                       <span className={`w-12 h-12 flex items-center justify-center rounded-xl text-xl font-black mx-auto shadow-inner \${
                         i === 0 ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-110' :
                         i === 1 ? 'bg-gray-400/20 text-gray-300 border border-gray-400/50 scale-105' :
                         i === 2 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/50 scale-105' :
                         'bg-white/5 text-gray-500 border border-white/10'
                       }`}>#{row.rank}</span>
                    </td>
                    <td className="px-5 py-8 pl-10 font-black text-white text-2xl tracking-tight relative z-10 drop-shadow-md">{row.team}</td>
                    <td className="px-5 py-8 text-[#22D3EE] font-bold text-sm tracking-wide relative z-10 italic">{row.project}</td>
                    <td className="px-8 py-8 text-right font-mono text-white relative z-10">
                       <span className="text-4xl font-black tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{row.score}</span>
                       <span className="text-sm font-bold text-gray-500 ml-2">/ 100</span>
                    </td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
