"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, CheckCircle, XCircle, ClockIcon, MoreVertical, MapPin, QrCode, Users } from 'lucide-react';
import api from '../../lib/api';

export const RegistrationsTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm('CRITICAL WARNING: Executing this command will permanently obliterate this User, their Team Architecture, and their Registration Profile from the Global MongoDB Cluster. Proceed with absolute certainty?')) return;
    
    try {
      await api.delete(`/admin/registrations/${id}`);
      setData(data.filter(r => r._id !== id));
      setSelectedUser(null);
    } catch (err) {
      console.error('Failed to trace and trash registration indices', err);
    }
  };

  useEffect(() => {
    const fetchLiveRegistrations = async () => {
      try {
        const res = await api.get('/admin/registrations');
        setData(res.data.data);
      } catch (err) {
        console.error('Failed to sync Admin data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveRegistrations();
  }, []);

  return (
    <div className="w-full">
      {/* Filtering Aggregation Node */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-[#0B0F19] border border-white/10 p-5 rounded-3xl shadow-xl">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input type="text" placeholder="Trace mapping contexts (Name, Email)..." className="w-full bg-[#0B0F19] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:ring-2 focus:ring-[#7C3AED] outline-none transition-shadow shadow-inner" />
        </div>
        
        <div className="flex flex-wrap gap-4 w-full md:w-auto mt-2 md:mt-0">
          <select className="bg-[#0B0F19] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-gray-300 outline-none appearance-none cursor-pointer focus:ring-2 hover:bg-white/5 transition-colors">
            <option>All Tracked Statuses</option>
            <option>Paid Checkouts Completed</option>
            <option>Pending Auth Vectors</option>
            <option>Cancelled / Trashed</option>
          </select>
          <select className="bg-[#0B0F19] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-gray-300 outline-none appearance-none cursor-pointer focus:ring-2 hover:bg-white/5 transition-colors">
            <option>Global Hubs Target</option>
            <option>VIT Hub</option>
            <option>SRM Hub</option>
            <option>IITM Hub</option>
          </select>
          <button className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm shadow-md whitespace-nowrap">
            <Filter className="w-4 h-4" /> Filters Array
          </button>
          <button className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm shadow-lg shadow-[rgba(124,58,237,0.2)] whitespace-nowrap">
            <Download className="w-4 h-4" /> Export DB CSV
          </button>
        </div>
      </div>

      {/* Advanced Responsive Table Mapping Component */}
      <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(124,58,237,0.5)] to-transparent"></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#0B0F19]/90 backdrop-blur-md border-b border-white/10 text-[11px] uppercase tracking-[0.25em] text-[#22D3EE] font-black">
                <th className="px-6 py-6 w-16 text-center">#</th>
                <th className="px-6 py-6">Identity Source</th>
                <th className="px-6 py-6">Email Context Bind</th>
                <th className="px-6 py-6">Host Hub Domain</th>
                <th className="px-6 py-6 text-center">Group Target</th>
                <th className="px-6 py-6 text-center">Teammate Count</th>
                <th className="px-6 py-6 text-center">Checkout Node</th>
                <th className="px-6 py-6 text-center">Tactic Auth</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-32 text-center text-gray-500 font-bold uppercase tracking-widest bg-[#0B0F19]/30">
                     <span className="w-10 h-10 border-4 border-[rgba(124,58,237,0.3)] border-t-[#22D3EE] rounded-full animate-spin mx-auto mb-6 block drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"></span>
                     Parsing Table Node API Endpoints...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                   <td colSpan={8} className="px-6 py-32 text-center text-gray-500 font-black uppercase tracking-widest">
                     No Active Records Detected in Node Arrays.
                   </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={row._id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => setSelectedUser(row)}>
                    <td className="px-6 py-6 text-center">
                       <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-400 font-bold text-xs group-hover:bg-[rgba(124,58,237,0.1)] group-hover:text-[#7C3AED] group-hover:border-[rgba(124,58,237,0.3)] transition-colors mx-auto">{index + 1}</span>
                    </td>
                    <td className="px-6 py-6"><span className="text-white font-bold text-sm track-tight group-hover:text-cyan-300 transition-colors capitalize">{row.userId?.name || 'Null User'}</span></td>
                    <td className="px-6 py-6"><span className="text-gray-400 text-sm font-medium bg-[#0B0F19] px-3 py-1.5 rounded-md border border-white/5">{row.userId?.email || 'N/A'}</span></td>
                    <td className="px-6 py-6"><span className="text-gray-300 font-bold text-sm tracking-wide capitalize">{row.userId?.college || 'Undefined'}</span></td>
                    <td className="px-6 py-6 text-center"><span className="text-[#22D3EE] font-bold text-sm tracking-widest uppercase bg-[#22D3EE]/10 px-3 py-1.5 rounded-lg border border-[#22D3EE]/20 shadow-inner">{row.teamId?.name || 'SOLO'}</span></td>
                    <td className="px-6 py-6 text-center">
                       <span className="text-gray-400 font-bold bg-[#0B0F19] px-4 py-2 rounded-xl border border-white/10 shadow-inner">
                         {row.teamId?.memberDetails?.length || 1}
                       </span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      {row.paymentStatus === 'success' && <span className="inline-flex flex-col items-center justify-center gap-1.5 px-4 py-2 text-green-400 text-[10px] font-black uppercase tracking-[0.2em]"><CheckCircle className="w-4 h-4 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]"/> Paid</span>}
                      {row.paymentStatus === 'pending' && <span className="inline-flex flex-col items-center justify-center gap-1.5 px-4 py-2 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em]"><ClockIcon className="w-4 h-4 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]"/> Hold</span>}
                      {row.paymentStatus === 'cancelled' && <span className="inline-flex flex-col items-center justify-center gap-1.5 px-4 py-2 text-red-500 text-[10px] font-black uppercase tracking-[0.2em]"><XCircle className="w-4 h-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"/> Error</span>}
                    </td>
                    <td className="px-6 py-6 text-center">
                      <button className="p-2.5 rounded-xl hover:bg-[#7C3AED] shadow-md border hover:border-[#6D28D9] border-white/10 text-gray-500 hover:text-white transition-all bg-[#0B0F19]" onClick={(e) => { e.stopPropagation(); setSelectedUser(row); }}>
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Target Inspector Overview Panel / Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#05080F]/90 backdrop-blur-md animate-fade-in" onClick={() => setSelectedUser(null)}>
          <div className="bg-[#0B0F19] border border-white/10 rounded-[2rem] w-full max-w-4xl overflow-hidden shadow-2xl relative transition-transform transform scale-100 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
             <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[rgba(124,58,237,0.2)] blur-[130px] rounded-full z-0 pointer-events-none"></div>
             
             <div className="flex justify-between items-center p-8 border-b border-white/10 relative z-10 bg-white/5">
               <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">Profile Data Target Inspector</h3>
               <button className="text-gray-500 hover:text-red-400 hover:bg-[rgba(239,68,68,0.1)] p-2 rounded-full transition-colors" onClick={() => setSelectedUser(null)}><XCircle className="w-7 h-7" /></button>
             </div>

             <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
               <div className="space-y-6">
                 <div>
                   <p className="text-[#22D3EE] text-xs font-black uppercase tracking-[0.2em] mb-2">Participant ID Identity Mapping</p>
                   <p className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight capitalize">{selectedUser.userId?.name}</p>
                 </div>
                 <div className="bg-[#0B0F19] border border-white/5 p-4 rounded-2xl shadow-inner">
                   <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Secure Routing Protocol (Email)</p>
                   <p className="text-gray-300 font-bold tracking-wide">{selectedUser.userId?.email}</p>
                 </div>
                 <div className="flex items-center gap-5 p-5 bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-transparent rounded-2xl border-l-2 border-[#7C3AED]">
                   <div className="w-12 h-12 bg-[#0B0F19] border border-[rgba(124,58,237,0.3)] rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                     <MapPin className="w-6 h-6 text-[#7C3AED]" />
                   </div>
                   <div>
                     <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Base Target Geolocation Hub</p>
                     <p className="text-white font-black text-xl tracking-tight leading-none uppercase">{selectedUser.userId?.college}</p>
                   </div>
                 </div>

                 {/* TEAM MEMBERS INJECTED DOM */}
                 <div className="bg-[#0B0F19] border border-[#22D3EE]/20 p-5 rounded-2xl shadow-[0_0_15px_rgba(34,211,238,0.1)] mt-6">
                   <p className="text-[#22D3EE] text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                     <Users className="w-4 h-4"/> Associated Team Architecture
                   </p>
                   {selectedUser.teamId?.memberDetails && selectedUser.teamId.memberDetails.length > 0 ? (
                     <div className="space-y-3 mt-4">
                       {selectedUser.teamId.memberDetails.map((m: any, i: number) => (
                         <div key={i} className="flex flex-col p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                           <div className="flex justify-between items-center mb-1">
                             <span className="text-white text-sm font-bold capitalize">{m.name}</span>
                             <span className="text-[#7C3AED] text-xs font-black tracking-widest uppercase">Target 0{i+1}</span>
                           </div>
                           <span className="text-gray-500 text-xs font-mono">{m.email}</span>
                           {m.phone && <span className="text-gray-400 text-xs mt-1">+91 {m.phone}</span>}
                         </div>
                       ))}
                     </div>
                   ) : (
                     <div className="py-4 text-center">
                       <span className="text-gray-500 text-sm font-bold italic tracking-wider">Solo Hacker Record (No Array)</span>
                     </div>
                   )}
                 </div>

               </div>

               <div className="bg-[#0B0F19]/50 rounded-3xl p-8 border border-white/10 shadow-xl flex flex-col items-center justify-center text-center h-fit sticky top-10">
                 <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-6 flex items-center justify-center gap-3">
                   <QrCode className="w-5 h-5 text-[#22D3EE]" /> Active Pass Node Rendering
                 </h4>
                 {selectedUser.paymentStatus === 'success' ? (
                   <div>
                      <div className="bg-white p-3 rounded-2xl border-4 border-[#0B0F19] inline-block mb-6 shadow-2xl relative group cursor-pointer hover:scale-105 transition-transform">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=HACKFLOW-${selectedUser._id}`} alt="QR" className="w-40 h-40 mix-blend-multiply" />
                      </div>
                      <p className="text-green-400 font-mono text-[10px] font-bold tracking-[0.2em] shadow-inner py-2 px-4 bg-[rgba(20,83,45,0.5)] border border-[rgba(34,197,94,0.2)] rounded-xl uppercase">Hash UID: {selectedUser._id}</p>
                   </div>
                 ) : (
                   <div className="w-full flex flex-col items-center justify-center border-2 border-dashed border-[rgba(239,68,68,0.3)] rounded-2xl bg-[rgba(239,68,68,0.05)] py-12 pb-14 h-full">
                     <XCircle className="w-10 h-10 text-red-500 mb-4 opacity-50 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                     <p className="text-red-400 text-sm font-black tracking-[0.2em] uppercase">Gateway Lock Active</p>
                     <p className="text-[rgba(239,68,68,0.5)] text-[10px] uppercase font-bold mt-2">Ticket pending transaction node</p>
                   </div>
                 )}
               </div>
             </div>
             
             <div className="p-8 bg-[#0B0F19] border-t border-white/10 flex justify-between items-center relative z-10 sticky bottom-0">
               <span className="text-gray-500 text-xs font-mono uppercase tracking-[0.2em]">Execution ID: #{selectedUser._id}</span>
               <div className="flex gap-4">
                 <button onClick={() => handleDelete(selectedUser._id)} className="px-6 py-3 rounded-xl bg-[rgba(239,68,68,0.1)] text-red-500 font-black text-xs tracking-[0.2em] uppercase border border-[rgba(239,68,68,0.3)] hover:bg-red-500 hover:text-white transition-colors shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                   Force Lock / Trash
                 </button>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
