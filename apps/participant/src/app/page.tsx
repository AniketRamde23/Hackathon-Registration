import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero, About, EventDetails, PrizePool, RegistrationDetails, RulesGuidelines, ScheduleVynedam } from '../components/landing/VynedamSections';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 font-sans selection:bg-[#22D3EE]/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <EventDetails />
        <PrizePool />
        <RegistrationDetails />
        <RulesGuidelines />
        <ScheduleVynedam />
      </main>
      <Footer />
    </div>
  );
}
