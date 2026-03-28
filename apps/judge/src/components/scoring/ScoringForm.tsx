"use client";
import React, { useState, useEffect } from 'react';
import { ScoreSlider } from './ScoreSlider';
import { ShieldAlert, SendHorizonal, AlertTriangle, Users, BookOpen } from 'lucide-react';

export const ScoringForm = ({ team }: { team: any }) => {
  const [scores, setScores] = useState({ inn: 0, tech: 0, ui: 0, pres: 0, imp: 0 });
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (team.status === 'scored') {
       setScores({ inn: 18, tech: 19, ui: 16, pres: 15, imp: 19 });
       setSubmitted(true);
    } else {
       setScores({ inn: 0, tech: 0, ui: 0, pres: 0, imp: 0 });
       setComments('');
       setSubmitted(false);
    }
  }, [team.id, team.status]);

  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const isValid = Object.values(scores).every(val => val > 0);

  const handleSubmit = () => {
    if (confirm(`Authorize final locked payload of ${total}/100 for ${team.name}?`)) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-20 relative z-10 animate-fade-in">
      <div className="bg-[#0B0F19]/80 backdrop-blur-md border border-[rgba(255,255,255,0.05)] rounded-[2.5rem] p-6 sm:p-10 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] bg-[#22D3EE]/10 blur-[90px] rounded-full z-0 pointer-events-none mix-blend-screen"></div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-6">
           <div>
             <h2 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#22D3EE] tracking-tight leading-none mb-5 drop-shadow-md">{team.name}</h2>
             <div className="flex flex-wrap items-center gap-5 text-sm font-bold text-gray-400">
               <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl shadow-inner border border-white/5"><Users className="w-4 h-4 text-[#7C3AED]"/> {team.members} Target Nodes</span>
               <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl shadow-inner border border-white/5"><BookOpen className="w-4 h-4 text-[#22D3EE]"/> {team.project || 'Unverified Execution Target'}</span>
             </div>
           </div>
           
           {submitted && (
              <div className="bg-[rgba(20,83,45,0.5)] border border-[rgba(34,197,94,0.3)] text-green-400 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(34,197,94,0.2)] flex items-center gap-3">
                <ShieldAlert className="w-4 h-4" /> Locked Hash ✓
              </div>
           )}
        </div>
      </div>

      {!submitted && (
        <div className="mb-8 bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.2)] rounded-3xl p-6 flex items-start gap-4 shadow-lg text-amber-500 backdrop-blur-sm">
          <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
          <p className="text-sm font-semibold leading-relaxed">Require strict pitch execution rendering before locking parameters. Ensure hardware checks are completed targeting <span className="font-black tracking-wide text-amber-400">{team.name}</span> context mapping.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
         <ScoreSlider label="Innovation Index" icon="🚀" value={scores.inn} onChange={(v) => setScores(s => ({...s, inn: v}))} disabled={submitted} />
         <ScoreSlider label="Technical Complexity" icon="⚙️" value={scores.tech} onChange={(v) => setScores(s => ({...s, tech: v}))} disabled={submitted} />
         <ScoreSlider label="UX Topology (UI/UX)" icon="🎨" value={scores.ui} onChange={(v) => setScores(s => ({...s, ui: v}))} disabled={submitted} />
         <ScoreSlider label="Pitch / Presentation" icon="🎤" value={scores.pres} onChange={(v) => setScores(s => ({...s, pres: v}))} disabled={submitted} />
         <div className="md:col-span-2">
           <ScoreSlider label="Global Impact Bounds" icon="🌍" value={scores.imp} onChange={(v) => setScores(s => ({...s, imp: v}))} disabled={submitted} />
         </div>
      </div>

      <div className="bg-[#0B0F19]/50 backdrop-blur-md border border-[rgba(255,255,255,0.05)] rounded-[2.5rem] p-6 sm:p-10 mb-8 shadow-xl">
         <h4 className="text-white font-black uppercase tracking-widest text-xs mb-5 flex items-center gap-3"><ShieldAlert className="w-4 h-4 text-[#7C3AED]" /> Administrator Logic Remarks</h4>
         <textarea 
           disabled={submitted}
           value={comments} 
           onChange={e => setComments(e.target.value)}
           placeholder="Record logical reasoning parsing your metric deductions... (Optional)"
           className="w-full h-36 bg-[#05080F] text-gray-300 p-5 rounded-3xl border border-white/5 outline-none focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/20 transition-all resize-none shadow-inner text-sm disabled:opacity-50"
         ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between bg-[#05080F]/90 p-8 sm:p-10 border border-t-[#7C3AED]/30 border-x-transparent border-b-transparent rounded-t-[3rem] sticky bottom-0 shadow-[0_-20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl -mx-4 sm:mx-0 z-50">
         <div className="text-center sm:text-left mb-8 sm:mb-0">
           <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Total Aggregated Score Node</p>
           <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#22D3EE] font-mono flex items-baseline gap-3 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              {total} <span className="text-2xl text-gray-600">/ 100</span>
           </div>
         </div>
         
         <button 
           disabled={!isValid || submitted} 
           onClick={handleSubmit}
           className="w-full sm:w-auto px-12 py-6 rounded-[2rem] bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white font-black uppercase tracking-[0.2em] text-sm transition-all disabled:opacity-20 disabled:grayscale flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] hover:-translate-y-2 transform"
         >
           {submitted ? 'Scoring Target Sealed ✓' : 'Execute Validation Lock'} <SendHorizonal className="w-6 h-6" />
         </button>
      </div>
    </div>
  );
};
