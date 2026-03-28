import "./globals.css";
import Link from 'next/link';
import { LogOut, Home, History, Trophy } from 'lucide-react';

export const metadata = { title: "Judge Panel | HackFlow" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#05080F] text-white antialiased min-h-screen flex flex-col selection:bg-[#7C3AED]/30 selection:text-cyan-300">
        
        {/* Desktop Header Frame */}
        <header className="hidden md:flex h-16 bg-[#0B0F19]/90 backdrop-blur-md border-b border-white/10 items-center justify-between px-8 sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <span className="text-2xl font-black text-white tracking-tight">Hack<span className="text-[#7C3AED]">Flow</span> <span className="text-gray-500 font-bold text-xs uppercase tracking-widest ml-2 border border-gray-600 rounded px-2 py-0.5">EVAL HUB</span></span>
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            <nav className="flex items-center gap-6">
               <Link href="/" className="text-gray-300 hover:text-white text-sm font-bold flex items-center gap-2 transition-colors"><Home className="w-4 h-4"/> Target Hub</Link>
               <Link href="/history" className="text-gray-300 hover:text-white text-sm font-bold flex items-center gap-2 transition-colors"><History className="w-4 h-4"/> Execution Logs</Link>
               <Link href="/leaderboard" className="text-[#22D3EE] hover:text-cyan-300 text-sm font-bold flex items-center gap-2 transition-colors"><Trophy className="w-4 h-4"/> Global Vectors</Link>
            </nav>
          </div>
          <div className="flex items-center gap-5">
             <div className="text-right">
                <p className="text-sm font-black leading-tight">J. Anderson</p>
                <p className="text-[#7C3AED] text-[10px] font-black uppercase tracking-[0.2em] mt-0.5">Senior Evaluator</p>
             </div>
             <button className="w-10 h-10 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] flex items-center justify-center hover:bg-red-500 text-red-500 hover:text-white transition-all group shadow-md cursor-pointer">
               <LogOut className="w-4 h-4" />
             </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col md:overflow-hidden relative pb-16 md:pb-0">
          {children}
        </main>

        {/* Mobile Viewport Render Tabs */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#0B0F19]/90 backdrop-blur-md border-t border-white/10 flex items-center justify-around z-50">
           <Link href="/" className="flex flex-col items-center text-gray-400 hover:text-white p-2">
             <Home className="w-5 h-5 mb-1" /><span className="text-[10px] font-bold uppercase tracking-widest">Evaluate</span>
           </Link>
           <Link href="/history" className="flex flex-col items-center text-gray-400 hover:text-white p-2">
             <History className="w-5 h-5 mb-1" /><span className="text-[10px] font-bold uppercase tracking-widest">History</span>
           </Link>
           <button className="flex flex-col items-center text-gray-400 hover:text-red-500 p-2">
             <LogOut className="w-5 h-5 mb-1" /><span className="text-[10px] font-bold uppercase tracking-widest">Eject</span>
           </button>
        </nav>
      </body>
    </html>
  );
}
