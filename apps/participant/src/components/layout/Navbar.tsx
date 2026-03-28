import Link from 'next/link';
import { Menu } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Vynedam" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" />
            <span className="text-2xl font-black text-white tracking-[0.15em] uppercase drop-shadow-lg">VYNEDAM</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#schedule" className="text-gray-300 hover:text-white transition-colors">Schedule</a>
            <a href="#prizes" className="text-gray-300 hover:text-white transition-colors">Prizes</a>
            <a href="http://localhost:3001/login" className="text-gray-300 hover:text-[#22D3EE] font-bold transition-colors uppercase tracking-widest">Admin</a>
            <Link href="/register" className="bg-gradient-to-r from-[#7C3AED] to-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity focus:ring-2 focus:ring-[#22D3EE] outline-none">
              Register Now
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-gray-300 hover:text-white p-2 outline-none focus:ring-2 focus:ring-[#7C3AED] rounded-md" aria-label="Toggle navigation">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
