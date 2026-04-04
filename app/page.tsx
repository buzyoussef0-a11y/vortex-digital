import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services/TiltCards";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ProofBar from "@/components/ProofBar";
import FAQSection from "@/components/FAQSection";
import MeteorBackground from "@/components/MeteorBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import CustomCursor from "@/components/CustomCursor";
import AIAssistant from "@/components/AIAssistant";

export default function Home() {
  return (
    <main className="relative bg-[#00050A]">
      {/* Optimized Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {/* Large Cyan Orb — Top Left */}
        <div 
          className="absolute -top-[5%] -left-[5%] w-[50vw] h-[50vw] rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.12) 0%, transparent 70%)', 
            filter: 'blur(100px)' 
          }} 
        />
        {/* Large Purple Orb — Bottom Right */}
        <div 
          className="absolute -bottom-[5%] -right-[5%] w-[45vw] h-[45vw] rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(123, 97, 255, 0.1) 0%, transparent 70%)', 
            filter: 'blur(120px)' 
          }} 
        />
        {/* Subtle Tech Grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.5) 1px, transparent 1px)', 
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }} 
        />
      </div>

      {/* Animated meteor background — hidden under hero, visible across all other sections */}
      <MeteorBackground />

      {/* Global overlays */}
      <CustomCursor />
      <WhatsAppButton />
      <AIAssistant />

      <Navbar />
      <Hero />

      {/* Proof ticker — immediately below the fold */}
      <ProofBar />

      <div className="relative z-20">
        <Services />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <AboutSection />

        <FAQSection />

        <ContactSection />

        <footer className="py-10 px-6 md:px-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-zinc-600 gap-6 bg-[#00050A]">
          <div>© 2026 Vortex Digital. All rights reserved.</div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
