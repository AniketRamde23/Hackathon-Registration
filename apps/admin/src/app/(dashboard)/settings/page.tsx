import React from 'react';

export default function PlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in text-center p-8">
      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#7C3AED]/20 to-[#22D3EE]/20 flex items-center justify-center border border-white/10 mb-6 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
        <svg className="w-10 h-10 text-[#22D3EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h1 className="text-4xl font-black text-white tracking-tight mb-4">Module Under Construction</h1>
      <p className="text-gray-400 font-bold uppercase tracking-widest text-sm max-w-lg leading-relaxed">
        This structural Node is currently being compiled by the core engineering team. Subsystem functionalities will be fully wired in future iterations.
      </p>
    </div>
  );
}
