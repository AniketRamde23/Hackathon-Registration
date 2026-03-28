import React, { useState } from 'react';
import { User, Copy, CheckCircle, ClockIcon, XCircle, FileText, Trophy, ArrowRight, Ticket } from 'lucide-react';
import Link from 'next/link';

export const ProfileCard = ({ user }: { user: any }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all hover:bg-white/10 hover:border-white/20 shadow-lg">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] p-1 shrink-0">
          <div className="w-full h-full rounded-full bg-[#0B0F19] flex items-center justify-center overflow-hidden">
            {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <User className="w-10 h-10 text-gray-400" />}
          </div>
        </div>
        <div className="pt-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">{user?.name || 'Unknown Reference'}</h2>
          <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
          <p className="text-[#22D3EE] font-semibold text-sm mt-2">{user?.college}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 text-center sm:text-left">Technical Loadout</p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {user?.skills?.map((s: string) => (
            <span key={s} className="px-3 py-1 rounded-lg bg-white/10 text-gray-200 text-xs font-semibold border border-white/10">{s}</span>
          )) || <span className="text-gray-500 text-xs">No skills listed in array</span>}
        </div>
      </div>

      <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold text-sm transition-all hover:text-white">
        Edit Core Profile Values
      </button>
    </div>
  );
};

export const TeamCard = ({ team }: { team: any }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(team?.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!team) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center border-dashed backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-[#22D3EE]/5 transition-opacity opacity-0 group-hover:opacity-100"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2">Flying Solo Strategy Detected</h2>
          <p className="text-gray-400 text-sm mb-8">Increase your chances of executing the prompt constraints by pairing up with 3 friends!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 rounded-xl bg-[#7C3AED] text-white font-semibold text-sm hover:bg-[#6D28D9] transition-colors shadow-lg">Mount Team Layer</button>
            <button className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors">Route to Lobby</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
      <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
        <div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-1">Squad Alias Target</p>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">{team.name}</h2>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Invite Syntax</p>
          <button onClick={handleCopy} className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#0B0F19] hover:bg-white/5 transition-colors border border-white/10 group cursor-pointer active:scale-95 shadow-inner">
             <span className="text-[#22D3EE] font-mono font-bold tracking-[0.2em]">{team.inviteCode}</span>
             {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400 group-hover:text-white" />}
          </button>
        </div>
      </div>

      <div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">Member Capacity ({team.members?.length || 0}/4)</p>
        <div className="space-y-3">
          {team.members?.map((m: any, i: number) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
              <div className="w-12 h-12 rounded-full bg-[#0B0F19] border border-white/10 flex items-center justify-center text-gray-300">
                {m.avatar ? <img src={m.avatar} className="w-full h-full rounded-full" /> : <User className="w-6 h-6 opacity-50" />}
              </div>
              <div>
                <span className="font-bold text-white text-md block">{m.name}</span>
                {i === 0 && <span className="text-xs text-[#7C3AED] font-bold uppercase tracking-widest mt-0.5 block">Team Arbitrator</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RegistrationCard = ({ registration, ticket }: { registration: any, ticket: any }) => {
  const status = registration?.paymentStatus || 'pending';

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all shadow-lg pb-10">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7C3AED]/10 blur-[90px] rounded-full z-0 mix-blend-screen opacity-50"></div>
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Backend Status Hooks</h2>
        <p className="text-gray-400 text-sm mb-6">Tracking internal payment arrays and physical tickets.</p>
        
        {status === 'success' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 text-green-400 bg-green-500/10 border border-green-500/20 px-5 py-3 rounded-xl w-fit shadow-[0_0_20px_rgba(34,197,94,0.1)]">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-bold text-sm tracking-widest uppercase">Registration Locked In</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-[#0B0F19]/50 backdrop-blur-sm border border-white/10 gap-4">
              <div className="flex items-center gap-5 w-full">
                <div className="w-14 h-14 bg-gradient-to-br from-[#7C3AED]/20 to-[#22D3EE]/20 rounded-xl flex items-center justify-center border border-white/10 shrink-0">
                  <Ticket className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-lg tracking-tight">Digital Sync Generated</p>
                  <p className="text-[#22D3EE] text-sm font-mono tracking-widest">{ticket?.id || 'HCK-PENDING'}</p>
                </div>
              </div>
              <Link href="/ticket" className="w-full sm:w-auto text-center px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors border border-white/10 whitespace-nowrap">
                Show Pass
              </Link>
            </div>
          </div>
        )}

        {status === 'pending' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 text-amber-500 bg-amber-500/10 border border-amber-500/20 px-5 py-3 rounded-xl w-fit">
              <ClockIcon className="w-5 h-5" />
              <span className="font-bold text-sm tracking-widest uppercase">Payment Window Running</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-[#0B0F19]/50 border border-white/10 gap-4">
              <div className="text-center sm:text-left">
                <p className="font-bold text-white text-lg">Fire the Gateways</p>
                <p className="text-gray-400 text-sm mt-1">Transaction 1 INR resolves the API completely.</p>
              </div>
              <Link href="/payment" className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-purple-600 text-center font-bold text-sm transition-all hover:opacity-90 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:-translate-y-0.5">
                Verify Output
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const EventCard = () => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:bg-white/10 transition-colors h-full shadow-lg">
      <div>
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Event Context Variables</h2>
        <div className="space-y-6 mb-8">
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-2 text-[#7C3AED]">Dates Computed</p>
            <p className="text-white font-bold text-lg">October 24-26, 2026</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-2 text-[#7C3AED]">Geo Spatial Locale</p>
            <p className="text-white font-bold text-lg leading-tight">Terminal Hub (Center B)</p>
          </div>
        </div>
      </div>
      <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0B0F19] text-[#22D3EE] text-sm font-bold border border-white/5 hover:border-[#22D3EE]/50 transition-colors">
        <FileText className="w-4 h-4" /> Download PDF Schematics
      </button>
    </div>
  );
};

export const LeaderboardPreview = () => {
  const topTeams = [
    { rank: 1, name: 'Vercel Voyagers', score: 98.5 },
    { rank: 2, name: 'Alpha Coders', score: 96.2 },
    { rank: 3, name: 'Byte Target', score: 92.0 },
  ];

  return (
     <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden group shadow-lg h-full flex flex-col justify-between">
      <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-yellow-500/10 blur-[60px] rounded-full z-0 transition-opacity"></div>
      
      <div className="relative z-10 w-full">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-white flex flex-col gap-2">
            <Trophy className="w-8 h-8 text-yellow-500 mix-blend-screen"/> 
            Node Board Target
          </h2>
          <Link href="/leaderboard" className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-3 mt-4">
          {topTeams.map((t, i) => (
            <div key={i} className="flex justify-between items-center p-3 sm:p-4 rounded-xl bg-[#0B0F19]/50 border border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black border ${t.rank === 1 ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]' : t.rank === 2 ? 'border-gray-400/50 bg-gray-400/10 text-gray-300' : 'border-amber-700/50 bg-amber-700/10 text-amber-600'}`}>
                  {t.rank}
                </span>
                <span className="text-white font-bold max-w-[100px] sm:max-w-none truncate">{t.name}</span>
              </div>
              <span className="font-mono text-[#22D3EE] font-black text-lg">{t.score}</span>
            </div>
          ))}
        </div>
      </div>
     </div>
  );
};
