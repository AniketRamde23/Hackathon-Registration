import React from 'react';
import { Download, Mail, Wallet } from 'lucide-react';

export const TicketCard = ({ ticket, status = 'SUCCESS' }: { ticket: any, status?: 'SUCCESS' | 'PENDING' | 'FAILED' }) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in mt-12">
      
      {status === 'SUCCESS' && (
        <div className="mb-8 mx-auto w-fit bg-green-500/10 border border-green-500/50 text-green-400 px-6 py-2 rounded-full font-bold text-sm tracking-widest shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          ✓ PAYMENT CONFIRMED
        </div>
      )}
      {status === 'PENDING' && (
        <div className="mb-8 mx-auto w-fit bg-amber-500/10 border border-amber-500/50 text-amber-500 px-6 py-2 rounded-full font-bold text-sm tracking-widest">
          ⏳ PAYMENT PROCESSING...
        </div>
      )}
      {status === 'FAILED' && (
        <div className="mb-8 mx-auto w-fit bg-red-500/10 border border-red-500/50 text-red-500 px-6 py-2 rounded-full font-bold text-sm tracking-widest">
          ❌ PAYMENT FAILED
        </div>
      )}

      <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_50px_rgba(124,58,237,0.1)] relative transition-all">
        
        <div className="flex-1 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-[#7C3AED]/20 to-[#22D3EE]/10 blur-[90px] rounded-full z-0 mix-blend-screen"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between gap-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-3xl font-black text-white tracking-tight">Hack<span className="text-[#7C3AED]">⚡</span>Flow</span>
                <p className="text-[#22D3EE] text-sm font-semibold tracking-widest mt-1 uppercase">Global Hackathon Pass</p>
              </div>
              <div className="md:text-right">
                <p className="text-white font-bold text-lg">Oct 24-26, 2026</p>
                <p className="text-gray-400 text-sm">Tech Convention Center</p>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold mb-2">Participant Designation</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">{ticket?.user?.name || 'Undefined User'}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold mb-2">Institution Code</p>
                  <p className="text-white font-medium text-lg">{ticket?.user?.college || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold mb-2">Team Sync Alias</p>
                  <p className="text-[#22D3EE] font-bold text-lg">{ticket?.user?.teamName || 'Solo'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[320px] bg-white border-t-2 md:border-t-0 md:border-l-2 border-dashed border-gray-300 relative p-8 flex flex-col items-center justify-center">
          <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#0B0F19] hidden md:block border-b border-r border-[#0B0F19]"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-[#0B0F19] hidden md:block border-t border-r border-[#0B0F19]"></div>
          
          <div className="text-center mb-6 w-full">
            <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">Official Asset</p>
            <div className="bg-white p-3 rounded-2xl border-4 border-[#0B0F19] shadow-2xl inline-block relative mx-auto group cursor-pointer transition-transform hover:scale-105">
              <img src={ticket?.qrUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=HACKFLOW-MOCK-123'} alt="Ticket QR Code" className="w-52 h-52 mix-blend-multiply" />
              {status !== 'SUCCESS' && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-red-500 font-black rotate-[-15deg] text-3xl border-4 border-red-500 px-4 py-1 rounded-xl shadow-lg">LOCKED</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-800 font-black text-lg mb-1">{ticket?.id || 'HACK-TKT-MOCK-88'}</p>
            <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase">Scan at Entry Gates</p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button disabled={status !== 'SUCCESS'} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2 disabled:opacity-50">
          <Download className="w-5 h-5" /> Download PNG Asset
        </button>
        <button disabled={status !== 'SUCCESS'} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2 disabled:opacity-50">
          <Mail className="w-5 h-5" /> Sync via Email
        </button>
        <button disabled={status !== 'SUCCESS'} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white font-bold hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-[#7C3AED]/20">
          <Wallet className="w-5 h-5" /> Add to Apple Wallet
        </button>
      </div>
    </div>
  );
};
