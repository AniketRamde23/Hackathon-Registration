import React, { useState } from 'react';
import { Users, User, Loader2, CheckCircle } from 'lucide-react';

export const Step3Team = ({ onNext, updateData }: { onNext: () => void, updateData: (d: any) => void }) => {
  const [teamName, setTeamName] = useState('');
  const [teamSize, setTeamSize] = useState(1);
  const [memberDetails, setMemberDetails] = useState([{ name: '', email: '', phone: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMemberChange = (index: number, field: string, value: string) => {
    const newMembers = [...memberDetails];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setMemberDetails(newMembers);
  }

  const handleSizeChange = (e: any) => {
    const size = parseInt(e.target.value);
    setTeamSize(size);
    const newMembers = [...memberDetails];
    while(newMembers.length < size) {
      newMembers.push({ name: '', email: '', phone: '' });
    }
    setMemberDetails(newMembers.slice(0, size));
  }

  const handleSubmit = async () => {
    if (teamName.length < 3) return setError('Team name must be at least 3 characters');
    
    // Validate members natively
    for (let i = 0; i < teamSize; i++) {
      if (!memberDetails[i].name || !memberDetails[i].email) {
        return setError(`Please enter both Name and Email exactly for Teammate ${i + 1}`);
      }
    }

    setLoading(true);
    try {
      updateData({ teamAction: 'create', teamData: { name: teamName, memberDetails } });
      onNext();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    } 
  };

  return (
    <div className="py-6 space-y-8 animate-fade-in shadow-2xl">
      {error && <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm font-medium text-center shadow-lg">{error}</div>}

      <div className="p-8 bg-white/5 border border-white/10 rounded-3xl animate-fade-in shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        
        <div className="flex items-center gap-4 mb-8">
           <div className="w-14 h-14 bg-[#7C3AED]/20 text-[#7C3AED] rounded-2xl flex items-center justify-center border border-[#7C3AED]/30">
             <Users className="w-8 h-8" />
           </div>
           <div>
             <h2 className="text-2xl font-bold text-white tracking-tight">Team Configuration</h2>
             <p className="text-gray-400 text-sm font-medium">Build your structural squad.</p>
           </div>
        </div>

        <label className="block text-sm font-semibold text-[#22D3EE] mb-3 uppercase tracking-widest">Target Team Hacker Name</label>
        <input value={teamName} onChange={e => setTeamName(e.target.value)} className="w-full bg-[#0B0F19]/80 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-[#7C3AED] outline-none mb-6 text-xl tracking-wide transition-all shadow-inner" placeholder="e.g. The Cyber Ninjas" />
        
        <label className="block text-sm font-semibold text-[#22D3EE] mb-3 mt-8 uppercase tracking-widest">Total Hackathon Members</label>
        <select value={teamSize} onChange={handleSizeChange} className="w-full bg-[#0B0F19]/80 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-[#7C3AED] outline-none mb-6 text-lg appearance-none cursor-pointer shadow-inner">
          <option value="1">1 Member (Deploying Solo)</option>
          <option value="2">2 Members</option>
          <option value="3">3 Members</option>
          <option value="4">4 Members</option>
        </select>
        
        <div className="space-y-6 mt-8">
          {memberDetails.map((member, idx) => (
             <div key={idx} className="p-6 bg-gradient-to-br from-[#0B0F19] to-transparent border border-white/5 rounded-2xl relative shadow-md hover:border-white/10 transition-colors">
               <h4 className="text-[#22D3EE] font-bold mb-5 font-mono flex items-center gap-2"><User className="w-4 h-4"/> Hacker Slot 0{idx + 1}</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input value={member.name} onChange={e => handleMemberChange(idx, 'name', e.target.value)} placeholder="Full Name" className="w-full bg-[#0B0F19] border border-white/5 rounded-lg px-4 py-3 text-white focus:border-[#7C3AED]/50 focus:ring-1 focus:ring-[#7C3AED] outline-none transition-all placeholder:text-gray-600" />
                 <input value={member.email} type="email" onChange={e => handleMemberChange(idx, 'email', e.target.value)} placeholder="Email Address" className="w-full bg-[#0B0F19] border border-white/5 rounded-lg px-4 py-3 text-white focus:border-[#7C3AED]/50 focus:ring-1 focus:ring-[#7C3AED] outline-none transition-all placeholder:text-gray-600" />
                 <input value={member.phone || ''} onChange={e => handleMemberChange(idx, 'phone', e.target.value)} placeholder="Phone Number (Optional)" className="w-full bg-[#0B0F19] border border-white/5 rounded-lg px-4 py-3 text-white focus:border-[#7C3AED]/50 focus:ring-1 focus:ring-[#7C3AED] outline-none transition-all md:col-span-2 placeholder:text-gray-600" />
               </div>
             </div>
          ))}
        </div>

        <button onClick={handleSubmit} disabled={loading} className="w-full py-5 mt-10 rounded-xl bg-gradient-to-r from-[#7C3AED] to-purple-600 text-white font-black tracking-widest text-lg hover:opacity-90 transition-all disabled:opacity-50 flex justify-center items-center gap-3 shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(124,58,237,0.4)] uppercase">
          {loading ? <Loader2 className="animate-spin w-6 h-6" /> : (
             <>
               Lock Roster & Proceed <CheckCircle className="w-5 h-5"/>
             </>
          )}
        </button>
      </div>
    </div>
  );
};
