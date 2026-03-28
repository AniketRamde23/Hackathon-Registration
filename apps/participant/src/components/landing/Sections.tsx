import React from 'react';
import { Calendar, Shield, Trophy, Users, Clock, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[#0B0F19] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <Calendar className="w-4 h-4 text-[#22D3EE]" />
          <span className="text-sm font-medium text-gray-300">October 24-26, 2026 • Tech Convention Center</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight">
          The Ultimate <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#22D3EE]">Hackathon Platform</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Register • Compete • Win
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#7C3AED] to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto text-center shadow-[0_0_30px_rgba(124,58,237,0.3)]">
            Register Now
          </Link>
          <a href="#schedule" className="px-8 py-4 rounded-lg bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-colors backdrop-blur-sm w-full sm:w-auto text-center">
            View Schedule
          </a>
        </div>
      </div>
    </section>
  );
};

export const About = () => {
  const stats = [
    { label: "Participants", value: "500+" },
    { label: "Projects Built", value: "50+" },
    { label: "Total Prizes", value: "₹1L+" }
  ];

  const features = [
    { icon: Users, title: "Easy Registration", desc: "Seamless onboarding and instant team assembly" },
    { icon: Shield, title: "Secure Payments", desc: "Razorpay powered lightning fast transactions" },
    { icon: Trophy, title: "Real-time Judging", desc: "Live score tracking and automated leaderboards" }
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About HackFlow</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">We're bringing together the brightest minds to solve real-world problems over 48 hours of intense coding, collaboration, and innovation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#22D3EE]/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="w-7 h-7 text-[#22D3EE]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center p-10 rounded-3xl bg-gradient-to-r from-[#7C3AED]/10 to-[#22D3EE]/10 border border-white/10 backdrop-blur-sm">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-5xl font-extrabold text-white mb-2">{s.value}</div>
              <div className="text-[#22D3EE] font-medium tracking-wide uppercase text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const PastEvents = () => {
  return (
    <section className="py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[2023, 2024, 2025].map((year) => (
            <div key={year} className="group overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
              <div className="h-48 bg-gray-800 relative w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] to-transparent z-10"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-40 group-hover:scale-110 transition-transform duration-500"></div>
              </div>
              <div className="p-6 relative z-20 -mt-12 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white mb-2">HackFlow Global {year}</h3>
                <p className="text-gray-400">See what our stellar community built last year.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Prizes = () => {
  return (
    <section id="prizes" className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-20 text-center">Prizes & Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center transform hover:-translate-y-2 transition-all order-2 md:order-1">
            <h3 className="text-2xl font-bold text-gray-300 mb-2">2nd Place</h3>
            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-500 mb-8">₹50,000</div>
            <ul className="text-gray-400 space-y-4 text-sm font-medium">
              <li>Xbox Series S</li>
              <li>1 Year GitHub Pro</li>
              <li>Premium Swag Kit</li>
            </ul>
          </div>

          <div className="p-10 rounded-3xl bg-gradient-to-b from-[#7C3AED]/20 to-[#0B0F19] border border-[#7C3AED]/50 backdrop-blur-lg text-center transform hover:-translate-y-4 transition-all relative order-1 md:order-2 md:-mt-12 shadow-[0_0_80px_rgba(124,58,237,0.15)]">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
              GRAND CHAMPION
            </div>
            <div className="w-20 h-20 mx-auto rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mb-6">
              <Trophy className="w-10 h-10 text-yellow-400" />
            </div>
            <h3 className="text-3xl font-bold text-yellow-400 mb-2">1st Place</h3>
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 mb-8">₹1,00,000</div>
            <ul className="text-gray-200 space-y-4 font-medium">
              <li>MacBook Pro M3</li>
              <li>Pre-seed Funding Overage</li>
              <li>Premium Hardware Kit</li>
              <li>Vercel Pro (1 Year)</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center transform hover:-translate-y-2 transition-all order-3">
            <h3 className="text-2xl font-bold text-amber-600 mb-2">3rd Place</h3>
            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-amber-700 mb-8">₹25,000</div>
            <ul className="text-gray-400 space-y-4 text-sm font-medium">
              <li>Mechanical Keyboard</li>
              <li>1 Year GitHub Pro</li>
              <li>Standard Swag Kit</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export const Schedule = () => {
  const events = [
    { time: "Day 1 - 09:00 AM", title: "Registration & Breakfast", desc: "Check-in using your QR code and grab some food." },
    { time: "Day 1 - 10:30 AM", title: "Opening Ceremony", desc: "Introductory keynote and hackathon rules breakdown." },
    { time: "Day 1 - 12:00 PM", title: "Hacking Begins!", desc: "Get to your stations and start building." },
    { time: "Day 2 - 04:00 PM", title: "Submissions Close", desc: "Final source code freeze and presentation prep." },
    { time: "Day 2 - 06:00 PM", title: "Prize Distribution", desc: "Closing ceremony, winner announcements & afterparty." }
  ];

  return (
    <section id="schedule" className="py-24 bg-black/20 border-t border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">Event Schedule</h2>
        <div className="space-y-6">
          {events.map((e, i) => (
            <div key={i} className="flex gap-6 md:gap-8 items-start relative pb-6">
              {i !== events.length - 1 && <div className="absolute top-12 left-6 bottom-[-24px] w-px bg-white/10 hidden md:block"></div>}
              <div className="w-12 h-12 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED] flex items-center justify-center shrink-0 z-10 hidden md:flex">
                <Clock className="w-5 h-5 text-[#22D3EE]" />
              </div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 w-full hover:bg-white/10 transition-colors">
                <div className="text-[#22D3EE] font-medium text-sm mb-3 uppercase tracking-wider">{e.time}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{e.title}</h3>
                <p className="text-gray-400 leading-relaxed">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Sponsors = () => {
  return (
    <section className="py-32 relative overflow-hidden">
       {/* Background glow drop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#7C3AED]/10 blur-[120px] rounded-full point-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">Backed by the Best</h2>
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {['Vercel', 'DigitalOcean', 'Supabase', 'Stripe', 'Figma'].map((s, i) => (
             <div key={i} className="w-48 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 font-bold text-xl hover:bg-white/10 hover:text-white transition-all cursor-crosshair">
               {s}
             </div>
          ))}
        </div>
        <Link href="/sponsor" className="inline-block px-8 py-4 rounded-xl font-semibold bg-white/5 border border-[#22D3EE]/50 text-[#22D3EE] hover:bg-[#22D3EE]/10 transition-colors backdrop-blur-sm">
          Become a Sponsor
        </Link>
      </div>
    </section>
  );
};

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-black/40 border-t border-white/5 backdrop-blur-md">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Who can participate?", a: "Any enrolled college student across the globe can register and participate in HackFlow. You must be at least 18 years old to claim cash prizes." },
            { q: "How much does it cost?", a: "The registration fee is ₹1 per team, which completely covers your premium catering, swags, server credits, and on-site lodging access." },
            { q: "What is the team size limit?", a: "Teams can be up to 4 members. You can also participate solo if you wish!" },
            { q: "Do I retain ownership of my code?", a: "Yes! 100% of the Intellectual Property remains yours. The hackathon organizers claim absolutely zero equity or rights to your projects." },
            { q: "Will there be internet provided?", a: "Yes, unrestricted gigabit Wi-Fi will be available redundantly throughout the entire venue." },
            { q: "How are projects judged?", a: "Our expert panel scores based strictly upon Innovation, Technical Complexity, UI/UX, Presentation, and Overall Impact." }
          ].map((faq, i) => (
             <details key={i} className="group bg-[#0B0F19] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
               <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-gray-200 hover:text-[#22D3EE] list-none">
                 <span className="text-lg">{faq.q}</span>
                 <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-open:rotate-180 transition-transform duration-300 shadow-inner">
                   <ChevronDown className="w-5 h-5" />
                 </span>
               </summary>
               <div className="px-6 pb-6 text-gray-400 bg-white/[0.02] pt-4 leading-relaxed border-t border-white/5">
                 {faq.a}
               </div>
             </details>
          ))}
        </div>
      </div>
    </section>
  );
};
