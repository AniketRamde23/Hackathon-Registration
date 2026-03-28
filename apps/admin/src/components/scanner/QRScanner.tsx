"use client";

import React, { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { CheckCircle, XCircle, AlertTriangle, ScanLine, Loader2, Volume2, AudioLines } from 'lucide-react';

export const QRScanner = () => {
  const [scanResult, setScanResult] = useState<any>(null);
  const [status, setStatus] = useState<'IDLE' | 'SUCCESS' | 'INVALID' | 'DUPLICATE' | 'LOADING'>('IDLE');
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Auto Reset Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status !== 'IDLE' && status !== 'LOADING') {
      timer = setTimeout(() => {
        setScanResult(null);
        setStatus('IDLE');
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [status]);

  const playBeep = (type: 'success' | 'error' | 'duplicate') => {
    if (!audioEnabled || typeof window === 'undefined') return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'success') {
         osc.frequency.setValueAtTime(800, ctx.currentTime);
         osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
         gain.gain.setValueAtTime(0.5, ctx.currentTime);
         gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
         osc.start();
         osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'error') {
         osc.type = 'sawtooth';
         osc.frequency.setValueAtTime(200, ctx.currentTime);
         osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
         gain.gain.setValueAtTime(0.5, ctx.currentTime);
         gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
         osc.start();
         osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'duplicate') {
         osc.type = 'square';
         osc.frequency.setValueAtTime(400, ctx.currentTime);
         osc.frequency.setValueAtTime(600, ctx.currentTime + 0.1);
         gain.gain.setValueAtTime(0.3, ctx.currentTime);
         gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
         osc.start();
         osc.stop(ctx.currentTime + 0.2);
      }
    } catch (e) {
      console.log('AudioContext rejected.');
    }
  };

  const handleDecode = async (result: string) => {
    if (status !== 'IDLE') return; // Debounce mechanism
    setStatus('LOADING');
    
    // Simulate API Call Parsing Check
    setTimeout(() => {
      if (result.includes('HACKFLOW-')) {
         if (result.includes('DUPE')) {
           setScanResult({ time: new Date().toLocaleTimeString() });
           setStatus('DUPLICATE');
           playBeep('duplicate');
         } else {
           setScanResult({ 
             name: 'Alex Developer', 
             college: 'Global Tech Institute', 
             team: 'Alpha Coders Target',
             time: new Date().toLocaleTimeString() 
           });
           setStatus('SUCCESS');
           playBeep('success');
         }
      } else {
         setStatus('INVALID');
         playBeep('error');
      }
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col relative pb-6 backdrop-blur-md">
      
      <div className={`absolute inset-0 z-0 opacity-20 blur-[130px] transition-colors duration-700 rounded-full
        ${status === 'SUCCESS' ? 'bg-green-500' : status === 'INVALID' ? 'bg-red-500' : status === 'DUPLICATE' ? 'bg-amber-500' : 'bg-[#7C3AED]'}
      `}></div>
      
      <div className="p-6 border-b border-white/10 flex justify-between items-center relative z-10 bg-[#0B0F19]/50 shadow-sm">
        <h2 className="text-white font-bold text-lg flex items-center gap-3 tracking-tight">
          <ScanLine className="w-6 h-6 text-[#22D3EE]" /> Runtime Scanner Bridge
        </h2>
        
        <button onClick={() => setAudioEnabled(!audioEnabled)} className={`p-2.5 rounded-xl transition-colors border shadow-inner ${audioEnabled ? 'bg-[rgba(124,58,237,0.2)] border-[rgba(124,58,237,0.5)] text-[#22D3EE]' : 'bg-gray-800 border-gray-700 text-gray-500 hover:text-white'}`}>
           {audioEnabled ? <AudioLines className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      <div className="p-8 md:p-12 relative z-10 flex flex-col items-center">
        {/* Camera Reticle UI Wrapper */}
        <div className="relative w-full aspect-square max-w-[450px] bg-[#05080F] rounded-[2.5rem] overflow-hidden border-8 border-[#0B0F19] shadow-[0_0_50px_rgba(0,0,0,0.8)] mx-auto group">
          
          <div className="absolute inset-0 z-10 pointer-events-none p-6">
            <div className={`absolute top-0 left-0 w-20 h-20 border-t-[6px] border-l-[6px] rounded-tl-[2rem] transition-colors duration-500
              ${status === 'SUCCESS' ? 'border-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]' : status === 'INVALID' ? 'border-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]' : status === 'DUPLICATE' ? 'border-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]' : 'border-[#7C3AED] drop-shadow-[0_0_15px_rgba(124,58,237,0.8)]'}
            `}></div>
            <div className={`absolute top-0 right-0 w-20 h-20 border-t-[6px] border-r-[6px] rounded-tr-[2rem] transition-colors duration-500
              ${status === 'SUCCESS' ? 'border-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]' : status === 'INVALID' ? 'border-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]' : status === 'DUPLICATE' ? 'border-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]' : 'border-[#7C3AED] drop-shadow-[0_0_15px_rgba(124,58,237,0.8)]'}
            `}></div>
            <div className={`absolute bottom-0 left-0 w-20 h-20 border-b-[6px] border-l-[6px] rounded-bl-[2rem] transition-colors duration-500
              ${status === 'SUCCESS' ? 'border-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]' : status === 'INVALID' ? 'border-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]' : status === 'DUPLICATE' ? 'border-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]' : 'border-[#7C3AED] drop-shadow-[0_0_15px_rgba(124,58,237,0.8)]'}
            `}></div>
            <div className={`absolute bottom-0 right-0 w-20 h-20 border-b-[6px] border-r-[6px] rounded-br-[2rem] transition-colors duration-500
              ${status === 'SUCCESS' ? 'border-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]' : status === 'INVALID' ? 'border-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]' : status === 'DUPLICATE' ? 'border-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]' : 'border-[#7C3AED] drop-shadow-[0_0_15px_rgba(124,58,237,0.8)]'}
            `}></div>

            {status === 'IDLE' && (
              <div className="absolute w-full h-[3px] bg-[#22D3EE] blur-[1px] shadow-[0_0_30px_#22D3EE] animate-scanline pointer-events-none mix-blend-screen opacity-80 left-0"></div>
            )}
          </div>
          
          <div className={`absolute inset-0 transition-all duration-300 ${status === 'IDLE' || status === 'LOADING' ? 'opacity-100 scale-100' : 'opacity-30 blur-md scale-105'}`}>
             <Scanner
               onResult={(text, result) => handleDecode(text)}
               onError={(e) => console.log('Camera Mount Warning:', e)}
               options={{ delayBetweenScanAttempts: 1000 }}
               styles={{ container: { width: '100%', height: '100%' }, video: { objectFit: 'cover' } }}
             />
          </div>

          {status === 'LOADING' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
              <Loader2 className="w-16 h-16 text-[#22D3EE] animate-spin mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
              <p className="text-white font-black tracking-[0.3em] uppercase text-sm animate-pulse">Computing Hash...</p>
            </div>
          )}
          
          {status === 'SUCCESS' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[rgba(34,197,94,0.2)] backdrop-blur-md border-[10px] border-green-500 animate-fade-in p-6 text-center shadow-inner">
              <CheckCircle className="w-24 h-24 text-green-400 mb-6 drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
              <h3 className="text-3xl font-black text-white tracking-tight leading-tight">ENTRY GRANTED</h3>
              <p className="text-green-300 font-bold uppercase tracking-[0.2em] text-sm mt-3 border border-green-400/30 px-4 py-1.5 bg-[rgba(20,83,45,0.5)] rounded-xl shadow-lg">{scanResult?.time}</p>
            </div>
          )}

          {status === 'INVALID' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[rgba(239,68,68,0.2)] backdrop-blur-md border-[10px] border-red-500 animate-fade-in p-6 text-center shadow-inner">
              <XCircle className="w-24 h-24 text-red-500 mb-6 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
              <h3 className="text-3xl font-black text-white tracking-tight leading-tight">INVALID HASH</h3>
              <p className="text-red-300 font-bold uppercase tracking-[0.2em] text-sm mt-3 bg-[rgba(127,29,29,0.5)] px-4 py-1.5 rounded-xl border border-red-500/30 shadow-lg">Gateway Denied</p>
            </div>
          )}

          {status === 'DUPLICATE' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[rgba(245,158,11,0.2)] backdrop-blur-md border-[10px] border-amber-500 animate-fade-in p-6 text-center shadow-inner">
              <AlertTriangle className="w-24 h-24 text-amber-500 mb-6 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
              <h3 className="text-2xl font-black text-white tracking-tight leading-tight px-4">DUPLICATE ENTRY</h3>
              <p className="text-amber-300 font-bold uppercase tracking-[0.2em] text-xs mt-3 bg-[rgba(120,53,15,0.5)] px-4 py-1.5 rounded-xl border border-amber-500/30 shadow-lg">Lockout Maintained</p>
            </div>
          )}
        </div>

        {/* Scan Status Display Board */}
        <div className="mt-10 w-full max-w-[500px]">
          {status === 'SUCCESS' ? (
            <div className="bg-[#0B0F19] border border-[rgba(34,197,94,0.3)] rounded-3xl p-8 shadow-2xl animate-fade-in text-center relative overflow-hidden ring-1 ring-green-500/50">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
              <h4 className="text-white font-black text-3xl tracking-tight mb-2">{scanResult?.name}</h4>
              <p className="text-green-400 font-black text-lg uppercase tracking-widest mb-4 bg-green-500/10 inline-block px-4 py-1 rounded-lg border border-green-500/20">{scanResult?.team}</p>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em]">{scanResult?.college}</p>
            </div>
          ) : status === 'IDLE' ? (
            <div className="bg-[#0B0F19]/80 border border-white/5 rounded-3xl p-8 shadow-md text-center">
              <p className="text-gray-400 text-sm font-black uppercase tracking-[0.2em] animate-pulse">Mounting Video Payload Streams...</p>
            </div>
          ) : null}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scanline {
          0% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}} />
    </div>
  );
};
