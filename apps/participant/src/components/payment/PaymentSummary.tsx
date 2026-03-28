import React, { useState, useEffect } from 'react';
import { CreditCard, ShieldCheck, Clock, Loader2 } from 'lucide-react';

export const PaymentSummary = ({ 
  user, 
  teamData, 
  onPay 
}: { 
  user: any, 
  teamData: any, 
  onPay: () => void 
}) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60 - 15 * 60);
  
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden animate-fade-in">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7C3AED]/10 blur-[100px] rounded-full point-events-none z-0 mix-blend-screen"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-12">
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Checkout Details</h2>
            <p className="text-gray-400">Review your ticket data before processing the gateway.</p>
          </div>

          <div className="bg-[#0B0F19] rounded-2xl p-6 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Registration Payload</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Event Name</span>
                <span className="text-white font-medium">HackFlow Hackathon 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Participant</span>
                <span className="text-white font-medium">{user?.displayName || 'Developer Auth'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Registered Team</span>
                <span className="text-[#22D3EE] font-medium">{teamData?.name || 'Solo Array'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500">
            <Clock className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">Complete payment within <span className="font-bold tracking-wider">{formatTime(timeLeft)}</span> to prevent link expiry.</span>
          </div>
        </div>

        <div className="w-full md:w-[380px] shrink-0 bg-gradient-to-b from-white/5 to-[#0B0F19] rounded-2xl p-6 border border-white/10 flex flex-col justify-between shadow-lg">
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Payment Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Registration Base Fee</span>
                <span className="text-white">₹1.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">GST (0% Student Rebate)</span>
                <span className="text-white">₹0.00</span>
              </div>
              <div className="h-px w-full bg-white/10 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">Total Amount</span>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#22D3EE]">₹1</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <button 
              onClick={onPay} 
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white font-bold text-lg hover:opacity-90 transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Pay Now
            </button>
            <div className="flex justify-center items-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>Secured locally via 256-bit Razorpay AES Hooks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
