import React from 'react';
import { QRScanner } from '../../../components/scanner/QRScanner';

export const metadata = { title: 'QR Scanner Gateway | HackFlow Admin' };

export default function ScannerPage() {
  return (
    <div className="animate-fade-in w-full h-full flex flex-col max-w-[1200px] mx-auto pb-12 items-center justify-center min-h-[80vh]">
      <div className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#22D3EE] tracking-tight mb-3">Live Scanner Array Gate</h1>
        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">Target physical cameras towards compiled attendee hash payloads.</p>
      </div>

      <div className="w-full flex items-center justify-center px-4">
         <QRScanner />
      </div>
    </div>
  );
}
