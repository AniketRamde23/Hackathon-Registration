import React from 'react';
import Link from 'next/link';
import { History, Target, ArrowLeft } from 'lucide-react';

export default function HistoryPage() {
  const history = [
    { team: 'Vercel Voyagers', inn: 18, tech: 19, ui: 16, pres: 15, imp: 19, total: 87, time: '14:32 PM' },
    { team: 'Solo Target Hub', inn: 15, tech: 14, ui: 18, pres: 10, imp: 15, total: 72, time: '12:05 PM' },
    { team: 'Beta Frameworks', inn: 11, tech: 18, ui: 12, pres: 14, imp: 11, total: 66, time: '11:22 AM' },
  ];

  return (
    <div className="max-w-[1400px] w-full mx-auto p-4 sm:p-8 mt-4 animate-fade-in relative z-10 min-h-[80vh]">
      
      <div className="mb-10 p-8 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7C3AED]/20 blur-[90px] rounded-full pointer-events-none mix-blend-screen opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
             <div className="w-14 h-14 bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] rounded-[1rem] flex items-center justify-center shadow-lg">
               <History className="w-7 h-7 text-white" />
             </div>
             Execution Vector Target History
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mt-3 ml-1 text-[#22D3EE]/80">Securely routing validation requests caching previously saved evaluation hashes.</p>
        </div>
        
        <Link href="/" className="relative z-10 px-6 py-4 rounded-xl bg-[#0B0F19] text-[#22D3EE] font-black tracking-widest uppercase border border-white/10 hover:border-[#22D3EE]/50 transition-colors flex items-center gap-3 text-xs shadow-inner hover:-translate-y-1">
           <ArrowLeft className="w-4 h-4" /> REBOOT HUB TERMINAL
        </Link>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative">
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse min-w-[900px]">
             <thead>
                <tr className="bg-[#0B0F19]/90 border-b border-white/10 text-[10px] uppercase tracking-[0.25em] text-gray-500 font-black">
                   <th className="px-8 py-6 pl-10 text-white">Target Hash Alias</th>
                   <th className="px-5 py-6 text-center">INN</th>
                   <th className="px-5 py-6 text-center">TECH</th>
                   <th className="px-5 py-6 text-center">UI/UX</th>
                   <th className="px-5 py-6 text-center">PRES</th>
                   <th className="px-5 py-6 text-center">IMP</th>
                   <th className="px-8 py-6 text-right"><Target className="w-4 h-4 inline mr-1 text-[#7C3AED]" /> Total Compiled</th>
                   <th className="px-8 py-6 text-right pr-10">Execution Stamp</th>
                </tr>
             </thead>
             <tbody>
                {history.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-default">
                    <td className="px-8 py-7 pl-10 font-black text-white text-lg tracking-tight group-hover:text-cyan-300 transition-colors">{row.team}</td>
                    <td className="px-5 py-7 text-center font-mono text-gray-400 text-base">{row.inn}</td>
                    <td className="px-5 py-7 text-center font-mono text-gray-400 text-base">{row.tech}</td>
                    <td className="px-5 py-7 text-center font-mono text-gray-400 text-base">{row.ui}</td>
                    <td className="px-5 py-7 text-center font-mono text-gray-400 text-base">{row.pres}</td>
                    <td className="px-5 py-7 text-center font-mono text-gray-400 text-base">{row.imp}</td>
                    <td className="px-8 py-7 text-right font-mono text-[#22D3EE] font-black text-2xl drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">{row.total}</td>
                    <td className="px-8 py-7 text-right pr-10 font-mono text-xs text-gray-400 font-bold uppercase tracking-[0.15em]">{row.time}</td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
