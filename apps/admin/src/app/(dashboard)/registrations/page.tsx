import React from 'react';
import { RegistrationsTable } from '../../../components/registrations/RegistrationsTable';

export const metadata = { title: 'Registrations | HackFlow Admin' };

export default function RegistrationsPage() {
  return (
    <div className="animate-fade-in pb-12 w-full max-w-[1600px] mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight mb-2">Registration Pipeline</h1>
        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">Control Arrays mapping directly to User MongoDB Models.</p>
      </div>

      <RegistrationsTable />
    </div>
  );
}
