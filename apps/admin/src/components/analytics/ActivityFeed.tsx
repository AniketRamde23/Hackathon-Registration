"use client";

import React, { useState } from 'react';
import { Clock, User } from 'lucide-react';

export const ActivityFeed = () => {
  const [feed] = useState([
    { id: 1, name: 'Alex Developer', event: 'Registered for HackFlow Gateway', time: 'Just now' },
    { id: 2, name: 'Sarah Chen', event: 'Verified payment mapping of ₹499 INR', time: '2 mins ago' },
    { id: 3, name: 'Alpha Coders', event: 'Team Array synchronized successfully', time: '5 mins ago' },
    { id: 4, name: 'Marcus Tech', event: 'Registered for HackFlow Gateway', time: '12 mins ago' },
    { id: 5, name: 'Cyber Punks', event: 'Scored 92.5 globally evaluated by Judge XYZ', time: '15 mins ago' },
  ]);

  return (
    <div className="bg-gradient-to-br from-[#0B0F19] to-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h3 className="text-white font-bold text-xl tracking-tight">System Activity Stream</h3>
        <span className="flex items-center gap-2 text-xs font-bold text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          SOCKET LIVE
        </span>
      </div>

      <div className="space-y-4">
        {feed.map((item) => (
          <div key={item.id} className="flex items-start gap-5 p-4 rounded-2xl hover:bg-white/5 transition-all outline outline-1 outline-transparent hover:outline-white/10 group shadow-inner">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-[#22D3EE]/20 border border-white/10 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-[#22D3EE]" />
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm text-gray-300 group-hover:text-white transition-colors leading-tight">
                <span className="font-bold text-white mr-1.5 text-base">{item.name}</span> 
                {item.event}
              </p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-2">
                <Clock className="w-3.5 h-3.5" /> {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-bold text-sm tracking-widest uppercase hover:bg-white/10 hover:text-white transition-colors">
        Fetch Older Logs
      </button>
    </div>
  );
};
