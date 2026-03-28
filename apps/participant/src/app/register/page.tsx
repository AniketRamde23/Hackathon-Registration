"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Step1Login } from '../../components/registration/Step1Login';
import { Step2Profile } from '../../components/registration/Step2Profile';
import { Step3Team } from '../../components/registration/Step3Team';
import { Step4Review } from '../../components/registration/Step4Review';
import { Navbar } from '../../components/layout/Navbar';
import { AuthProvider } from '../../context/AuthContext'; 

export default function RegisterWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get('/api/settings');
        setIsOpen(res.data.isOpen);
      } catch (err) {
        setIsOpen(true); // Fallback open
      }
    };
    fetchStatus();
  }, []);

  const updateFormData = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0B0F19] text-white pt-24 pb-12 overflow-x-hidden">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] filter drop-shadow-[0_0_30px_rgba(124,58,237,0.3)]">
              HackFlow Registration Hub
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium">Follow the wizard pathway to lock exactly your data structures safely.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-12 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Ambient Background Gradient for Card */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/10 blur-[150px] rounded-full point-events-none z-0 mix-blend-screen"></div>

            <div className="relative z-10">
              {isOpen === false ? (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in relative z-50">
                  <div className="w-24 h-24 mb-6 rounded-full bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.2)]">
                    <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">HackFlow Pipeline Locked</h2>
                  <p className="text-red-400 font-bold uppercase tracking-[0.2em] mb-8">Registrations Are Currently Offline</p>
                  <p className="text-gray-400 max-w-lg text-lg">
                    The System Administration terminal has natively clamped the entry hooks. Please await direct signals declaring the portal active.
                  </p>
                </div>
              ) : (
                <>
                  <ProgressBar currentStep={currentStep} />
                  
                  <div className="mt-12 transition-all duration-300">
                    {currentStep === 1 && <Step1Login onNext={() => setCurrentStep(2)} />}
                    {currentStep === 2 && <Step2Profile onNext={() => setCurrentStep(3)} updateData={updateFormData} initialData={formData} />}
                    {currentStep === 3 && <Step3Team onNext={() => setCurrentStep(4)} updateData={updateFormData} />}
                    {currentStep === 4 && <Step4Review formData={formData} setStep={setCurrentStep} />}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
