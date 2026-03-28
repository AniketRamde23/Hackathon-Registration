import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-[#0B0F19] border-t border-white/10 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <img src="/logo.png" alt="Vynedam Logo" className="w-8 h-8 object-contain" />
            <span className="text-2xl font-black text-white tracking-widest uppercase">VYNEDAM</span>
          </div>
          <p className="text-[#22D3EE] font-bold text-sm tracking-widest uppercase">DRIVEN BY VISION, DESIGNED BY DATA</p>
          <div className="mt-6 text-gray-400 space-y-2 text-sm font-medium">
            <p>Email: contact@vynedam.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: Central Tech Hub, District 9</p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mt-8 md:mt-0">
          <Link href="/register" className="text-gray-400 hover:text-white transition-colors">Register</Link>
          <Link href="/payment" className="text-gray-400 hover:text-white transition-colors">Payment Terms</Link>
          <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Rules</Link>
        </div>

        <div className="text-gray-500 text-sm mt-12 md:mt-0 md:text-right w-full md:w-auto">
          &copy; {new Date().getFullYear()} VYNEDAM. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
