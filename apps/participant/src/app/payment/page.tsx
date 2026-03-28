"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentSummary } from '../../components/payment/PaymentSummary';

import { Navbar } from '../../components/layout/Navbar';
import { AuthProvider, useAuth } from '../../context/AuthContext';

const PaymentFlow = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initiatePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Set the requested default Razorpay checkout link
      window.open('https://razorpay.me/@aniketramde', '_blank');
      
      // Simulate payment processing flow locally so the user can continue
      setTimeout(() => {
        router.push('/ticket');
      }, 3000);
      
    } catch (err: any) {
      setError(err.message || 'Payment pipeline failed to open properly.');
      setLoading(false);
    } 
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pt-24 pb-12 overflow-x-hidden">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 font-medium text-center shadow-lg animate-fade-in">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-16 h-16 border-4 border-[#7C3AED]/30 border-t-[#7C3AED] rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-bold text-white">Invoking Razorpay Gateway...</h3>
            <p className="text-gray-400 mt-2">Please do not refresh the page.</p>
          </div>
        ) : (
          <PaymentSummary 
            user={user} 
            teamData={{ name: 'Alpha Coders' }} 
            onPay={initiatePayment} 
          />
        )}
      </div>
    </div>
  );
};

export default function PaymentPage() {
  return (
    <AuthProvider>
      <PaymentFlow />
    </AuthProvider>
  );
}
