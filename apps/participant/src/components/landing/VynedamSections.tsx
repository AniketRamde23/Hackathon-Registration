import React from 'react';
import { Calendar, Shield, Trophy, Users, Clock, AlertTriangle, BookOpen, Sparkles, MapPin, DollarSign, Target } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[#0B0F19]">
         {/* Beautiful Dynamic Gradients */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#003B73]/30 via-[#1D809F]/10 to-transparent rounded-full blur-[120px] opacity-70"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#7C3AED]/20 to-transparent rounded-full blur-[100px] opacity-50"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#22D3EE]" />
          <span className="text-sm font-bold tracking-widest uppercase text-gray-300">Driven by Vision, Designed by Data</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 text-white leading-tight drop-shadow-2xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#22D3EE] to-purple-500 uppercase tracking-widest">VYNEDAM</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
          The ultimate convergence of data, vision, and execution. Gear up for an unprecedented hackathon experience.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/register" className="px-10 py-5 rounded-xl bg-gradient-to-r from-[#003B73] to-[#1D809F] border border-blue-400/30 text-white font-bold text-lg hover:scale-105 transition-all w-full sm:w-auto text-center shadow-[0_0_40px_rgba(29,128,159,0.4)] tracking-wide">
            Register for Event
          </Link>
          <a href="#event-details" className="px-10 py-5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm w-full sm:w-auto text-center tracking-wide">
            Event Details
          </a>
        </div>
      </div>
    </section>
  );
};

export const About = () => {
  return (
    <section id="about" className="py-24 relative z-10 border-t border-white/5 bg-gradient-to-b from-[#0B0F19] to-[#0D1321]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">About VYNEDAM</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#22D3EE] to-[#7C3AED] mx-auto rounded-full mb-8"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            VYNEDAM isn't just a hackathon—it's a high-velocity innovation theater where the brightest minds assemble to dissect problems using raw data and execute brilliant visionary solutions. 
            <br/><br/>
            Whether you are a seasoned architect or a rising developer, VYNEDAM provides the optimal ecosystem to test your boundaries, meet industry leaders, and build something that truly matters.
          </p>
        </div>
      </div>
    </section>
  );
};

export const EventDetails = () => {
  return (
    <section id="event-details" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center tracking-tight">Event Blueprint</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#22D3EE]/50 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
              <Calendar className="w-7 h-7 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Dates & Timeline</h3>
            <p className="text-gray-400 font-medium">Coming Soon — Lock your calendars for an intense 48-hour sprint.</p>
          </div>
          
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#7C3AED]/50 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
              <MapPin className="w-7 h-7 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Venue</h3>
            <p className="text-gray-400 font-medium">To be formally announced. Fully catered physical location with high-speed fiber internet.</p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-green-500/50 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
              <DollarSign className="w-7 h-7 text-green-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Registration Fees</h3>
            <p className="text-gray-400 font-medium">₹1 per team. Covers total platform access, lodging, networking, and premium event swags.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const PrizePool = () => {
  return (
    <section id="prizes" className="py-32 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-8 text-center tracking-tight">VYNEDAM Prize Pool</h2>
        <p className="text-center text-gray-400 text-lg max-w-2xl mx-auto mb-20 font-medium">Compete against the absolute best to secure your position on the leaderboard and claim massive cash bounties.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          
          {/* 2nd Place */}
          <div className="p-8 rounded-[2rem] bg-gradient-to-b from-gray-800 to-[#0B0F19] border border-gray-600 backdrop-blur-xl text-center transform hover:-translate-y-4 transition-all duration-300 order-2 md:order-1 relative shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-500/10 flex items-center justify-center mb-4">
              <h3 className="text-3xl font-black text-gray-300">2nd</h3>
            </div>
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400 mb-6 drop-shadow-md">₹20,000</div>
            <div className="h-px w-1/2 mx-auto bg-gray-600 mb-6"></div>
            <ul className="text-gray-400 space-y-3 font-medium">
              <li>Silver Medal Authenticity</li>
              <li>Premium Swag Package</li>
              <li>Digital Certificates</li>
            </ul>
          </div>

          {/* 1st Place */}
          <div className="p-10 rounded-[2.5rem] bg-gradient-to-b from-yellow-900/40 via-[#1a1505] to-[#0B0F19] border border-yellow-500/50 backdrop-blur-2xl text-center transform hover:-translate-y-6 transition-all duration-500 relative order-1 md:order-2 md:-mt-16 shadow-[0_0_100px_rgba(234,179,8,0.15)] z-20">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-full max-w-[200px]">
               <div className="bg-gradient-to-r from-yellow-400 to-amber-600 text-black px-6 py-2 rounded-xl text-lg font-black tracking-widest shadow-[0_10px_30px_rgba(234,179,8,0.4)] uppercase">
                 Grand Prize
               </div>
             </div>
            <div className="w-24 h-24 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center mb-6 mt-4 border border-yellow-500/30">
              <Trophy className="w-12 h-12 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-500 uppercase tracking-widest mb-3">1st Place</h3>
            <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 mb-8 drop-shadow-2xl">₹40,000</div>
            <div className="h-px w-2/3 mx-auto bg-yellow-500/30 mb-8"></div>
            <ul className="text-gray-200 space-y-4 font-bold text-lg">
              <li className="flex items-center justify-center gap-2"><Sparkles className="w-4 h-4 text-yellow-500"/> Gold Champion Trophy</li>
              <li>Direct Mentorship Access</li>
              <li>VIP Development Kits</li>
            </ul>
          </div>

          {/* 3rd Place */}
          <div className="p-8 rounded-[2rem] bg-gradient-to-b from-amber-900/30 to-[#0B0F19] border border-amber-700/50 backdrop-blur-xl text-center transform hover:-translate-y-4 transition-all duration-300 order-3 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-700/10 flex items-center justify-center mb-4">
              <h3 className="text-3xl font-black text-amber-600">3rd</h3>
            </div>
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-amber-700 mb-6 drop-shadow-md">₹15,000</div>
            <div className="h-px w-1/2 mx-auto bg-amber-800/50 mb-6"></div>
            <ul className="text-gray-400 space-y-3 font-medium">
              <li>Bronze Medal Authenticity</li>
              <li>Standard Swag Tiers</li>
              <li>Digital Certificates</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export const RegistrationDetails = () => {
  return (
    <section id="registration" className="py-24 relative overflow-hidden bg-[#003B73]/5 border-t border-b border-[#22D3EE]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Target className="w-16 h-16 text-[#22D3EE] mx-auto mb-6 opacity-80" />
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Ready to Secure Your Squad?</h2>
        <p className="text-xl text-gray-300 mb-10 font-medium">Assemble your 1-4 member team, pass the payment gateway, and instantly claim your digital ticket to VYNEDAM.</p>
        <Link href="/register" className="inline-block px-12 py-5 rounded-2xl bg-gradient-to-r from-[#22D3EE] to-blue-600 text-white font-black text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(34,211,238,0.4)] tracking-widest uppercase">
          Enter The Registration Portal
        </Link>
      </div>
    </section>
  );
};

export const RulesGuidelines = () => {
  return (
    <section id="rules" className="py-24 relative border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-white mb-16 text-center tracking-tight">Rules & Guidelines</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/[0.07] transition-colors">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><Shield className="text-[#22D3EE]"/> Code of Conduct</h3>
            <ul className="space-y-4 text-gray-300 font-medium list-disc pl-5">
              <li>All project source code strictly must be developed entirely during the 48-hour event window.</li>
              <li>Templates and open-source libraries are permitted, provided you possess the legal rights/licenses.</li>
              <li>Plagiarism will result in an immediate irrevocable ban from the premises.</li>
              <li>Respect fellow developers and the physical hardware ecosystem.</li>
            </ul>
          </div>
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/[0.07] transition-colors">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><BookOpen className="text-purple-400"/> Judging Criteria</h3>
            <ul className="space-y-4 text-gray-300 font-medium list-disc pl-5">
              <li><strong>Innovation:</strong> Is the approach fundamentally novel?</li>
              <li><strong>Execution:</strong> Does the binary function without massive runtime errors?</li>
              <li><strong>UX/UI:</strong> Is the interface dynamically scalable and visually robust?</li>
              <li><strong>Viability:</strong> Does this solve a real-world data tracking problem?</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ScheduleVynedam = () => {
  const events = [
    { time: "Day 1 - Morning", title: "Gates Open & Team Allocation", desc: "Digital verification via unique QR tokens at the entry desk." },
    { time: "Day 1 - Noon", title: "Keynote & Hacking Commences", desc: "The timer begins. API keys are formally distributed to team leads." },
    { time: "Day 2 - Evening", title: "Final Commits & Judging", desc: "Source control gets locked. Prepare your pitch presentations." },
    { time: "Day 2 - Night", title: "Awards Ceremony", desc: "Winners are crowned and grand prizes are distributed." }
  ];

  return (
    <section id="schedule" className="py-24 bg-black/30 border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-white mb-16 text-center tracking-tight">Target Schedule</h2>
        <div className="space-y-6">
          {events.map((e, i) => (
            <div key={i} className="flex gap-6 md:gap-8 items-start relative pb-6">
              {i !== events.length - 1 && <div className="absolute top-12 left-6 bottom-[-24px] w-px bg-white/10 hidden md:block border-dashed"></div>}
              <div className="w-12 h-12 rounded-full bg-[#1D809F]/20 border border-[#1D809F] flex items-center justify-center shrink-0 z-10 hidden md:flex">
                <Clock className="w-5 h-5 text-[#22D3EE]" />
              </div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 w-full hover:border-[#1D809F]/50 transition-colors">
                <div className="text-[#22D3EE] font-black text-sm mb-3 uppercase tracking-widest">{e.time}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{e.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
