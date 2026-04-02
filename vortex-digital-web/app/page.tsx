import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services/TiltCards";

export default function Home() {
  return (
    <main className="relative bg-[#00050A]">
      <Navbar />
      <Hero />
      <div className="relative z-20">
        <Services />

        {/* Contact/Footer Placeholder Section */}
        <section id="contact" className="min-h-screen flex flex-col items-center justify-center p-20 border-t border-white/5 bg-[#000810]">
          <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-10 text-center">
            Ready to <span className="text-gradient">Automate</span>?
          </h2>
          <p className="max-w-xl text-center text-zinc-400 text-lg mb-12">
            Join the elite circle of businesses leveraging the vortex of AI. Our transformation process is exclusive and results-driven.
          </p>
          <button className="px-12 py-5 rounded-full glass border border-[#00E5FF]/30 text-[#00E5FF] font-bold uppercase tracking-widest hover:bg-[#00E5FF] hover:text-black transition-all">
            Initiate Contact
          </button>
        </section>

        <footer className="py-10 px-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-zinc-600 gap-6">
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
