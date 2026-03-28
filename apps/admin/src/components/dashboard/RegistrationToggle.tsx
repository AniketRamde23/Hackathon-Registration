'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Power, PowerOff } from 'lucide-react';

export const RegistrationToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get('/api/settings');
        setIsOpen(res.data.isOpen);
      } catch (err) {
        console.error('Failed to sync settings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  const toggleStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/settings', { isOpen: !isOpen });
      setIsOpen(res.data.isOpen);
    } catch (err) {
      console.error('Failed to update settings', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="px-6 py-3 bg-[#0B0F19] border border-white/10 text-gray-400 font-bold text-sm tracking-widest rounded-xl shadow-lg flex items-center gap-3">
       <span className="w-4 h-4 rounded-full border-2 border-t-transparent border-gray-400 animate-spin"></span> Syncing Status...
    </div>
  );

  return (
    <button 
      onClick={toggleStatus}
      className={`px-6 py-3 font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center gap-3 border ${
        isOpen 
        ? 'bg-[rgba(34,197,94,0.1)] border-[rgba(34,197,94,0.3)] text-green-400 hover:bg-green-500 hover:text-white shadow-[0_0_15px_rgba(34,197,94,0.2)]'
        : 'bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.3)] text-red-500 hover:bg-red-500 hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]'
      }`}
    >
      {isOpen ? <Power className="w-5 h-5" /> : <PowerOff className="w-5 h-5" />}
      {isOpen ? 'Registrations LIVE (Click to STOP)' : 'Registrations PAUSED (Click to START)'}
    </button>
  );
};
