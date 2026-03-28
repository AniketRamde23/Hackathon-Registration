"use client";
import React, { useState } from 'react';
import { Search, Hash, Users, CheckCircle } from 'lucide-react';

export const TeamList = ({ selectedTeam, onSelect }: { selectedTeam: any, onSelect: (t: any) => void }) => {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const [teams] = useState([
    { id: 'T21', name: 'Vercel Voyagers', project: 'Global Edge Sync Platform', members: 4, status: 'scored', score: 98.5 },
    { id: 'T44', name: 'Alpha Coders', project: 'AI Medical Inference Engine', members: 3, status: 'pending', score: null },
    { id: 'T15', name: 'Cyber Punks', project: 'WebGL Audio Visualization Node', members: 4, status: 'pending', score: null },
    { id: 'T08', name: 'Solo Target Hub', project: 'Undefined', members: 1, status: 'scored', score: 72.0 },
    { id: 'T99', name: 'Byte Target', project: 'Distributed Vector DB', members: 4, status: 'pending', score: null },
    { id: 'T32', name: 'Zeta Function', project: 'Quantum Computing Simulators', members: 2, status: 'pending', score: null }
  ]);

  const filtered = teams.filter(t => {
    if (filter === 'SCORED' && t.status !== 'scored') return false;
    if (filter === 'PENDING' && t.status !== 'pending') return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full w-full bg-[#05080F]">
      <div className="p-6 md:p-8 border-b border-white/10 sticky top-0 bg-[#0B0F19]/80 backdrop-blur-xl z-20">
        <h2 className="text-2xl font-black text-white tracking-tight mb-5 flex justify-between items-center">
          Target Clusters
          <span className="text-[10px] bg-[#7C3AED]/10 text-[#7C3AED] px-3 py-1 rounded-xl border border-[#7C3AED]/30 shadow-inner uppercase font-bold tracking-[0.2em]">{teams.length} Synced Nodes</span>
        </h2>
        
        <div className="relative mb-5">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
           <input type="text" placeholder="Trace syntax tracking vector payload..." value={search} onChange={e => setSearch(e.target.value)}
             className="w-full bg-[#05080F] border border-white/5 shadow-inner rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#7C3AED] outline-none transition-shadow" 
           />
        </div>
        
        <div className="flex gap-2">
           <button onClick={() => setFilter('ALL')} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${filter === 'ALL' ? 'bg-[#7C3AED] border-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'bg-transparent border-white/5 text-gray-500 hover:text-white hover:bg-white/5'}`}>Root Map</button>
           <button onClick={() => setFilter('PENDING')} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${filter === 'PENDING' ? 'bg-amber-500 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-transparent border-white/5 text-gray-500 hover:text-white hover:bg-white/5'}`}>Hold</button>
           <button onClick={() => setFilter('SCORED')} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${filter === 'SCORED' ? 'bg-green-500 border-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-transparent border-white/5 text-gray-500 hover:text-white hover:bg-white/5'}`}>Locked</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 pb-24">
        {filtered.map(team => (
           <button key={team.id} onClick={() => onSelect(team)} className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${selectedTeam?.id === team.id ? 'bg-[rgba(124,58,237,0.1)] border-[#7C3AED] shadow-[0_0_30px_rgba(124,58,237,0.15)] scale-[1.02]' : 'bg-[#0B0F19] border border-white/5 hover:border-white/20 hover:bg-white/5'}`}>
             
             {selectedTeam?.id === team.id && <div className="absolute top-0 left-0 w-1.5 h-full bg-[#7C3AED]"></div>}

             <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg text-white tracking-tight">{team.name}</span>
                {team.status === 'scored' ? (
                  <span className="text-[9px] font-black uppercase text-green-400 bg-[rgba(20,83,45,0.5)] px-2.5 py-1 rounded-[6px] border border-[rgba(34,197,94,0.3)] tracking-widest flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Locked Mode</span>
                ) : (
                  <span className="text-[9px] font-black uppercase text-gray-500 bg-gray-800 px-2.5 py-1 rounded-[6px] border border-gray-700 tracking-widest bg-opacity-50">Empty Array</span>
                )}
             </div>
             
             <p className="text-xs text-[#22D3EE] font-bold mb-4 line-clamp-1 italic">{team.project}</p>
             
             <div className="flex items-center gap-5">
                <span className="flex items-center gap-2 text-xs font-black text-gray-500 tracking-wider"><Users className="w-4 h-4 text-gray-400"/> {team.members}</span>
                <span className="flex items-center gap-2 text-xs font-black text-gray-500 tracking-wider"><Hash className="w-4 h-4 text-[#7C3AED]"/> Node #{team.id}</span>
             </div>
           </button>
        ))}
        {filtered.length === 0 && (
           <div className="text-center py-10">
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No targets matched layout syntax filters.</p>
           </div>
        )}
      </div>
    </div>
  );
};
