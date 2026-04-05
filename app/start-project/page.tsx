"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ProjectFormData, defaultFormData } from "./components/types";
import { Step1, Step2 } from "./components/Steps12";
import { Step3, SuccessState } from "./components/Steps3Success";

// ─── Step Indicator ───────────────────────────────────────────────────────────

const STEPS = [
  { n: 1, label: "معلوماتك", en: "Your Info" },
  { n: 2, label: "مشروعك", en: "Your Project" },
  { n: 3, label: "التواصل", en: "Contact" },
];

function StepIndicator({ current }: { current: number }) {
  const pct = ((current - 1) / (STEPS.length - 1)) * 100;
  return (
    <div className="sticky top-0 z-30 bg-[#00050A]/90 backdrop-blur-lg border-b border-white/5 px-4 py-4">
      <div className="max-w-2xl mx-auto">
        {/* Labels */}
        <div className="flex justify-between mb-3 px-1">
          {STEPS.map(s => (
            <div key={s.n} className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${s.n === current ? "opacity-100" : s.n < current ? "opacity-60" : "opacity-25"}`}>
              <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${s.n < current ? "bg-[#00E5FF] border-[#00E5FF] text-black" : s.n === current ? "border-[#00E5FF] text-[#00E5FF]" : "border-white/20 text-white/30"}`}>
                {s.n < current ? "✓" : s.n}
              </div>
              <span className={`text-[10px] font-mono tracking-wider ${s.n === current ? "text-[#00E5FF]" : "text-white/30"}`} dir="rtl">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full bg-[#00E5FF] rounded-full"
            animate={{ width: `${pct}%` }} transition={{ duration: 0.4, ease: "easeInOut" }} />
        </div>

        {/* Step counter */}
        <p className="text-right text-white/30 text-[10px] font-mono mt-1.5">
          Step {current} of {STEPS.length}
        </p>
      </div>
    </div>
  );
}

// ─── Background Glows ─────────────────────────────────────────────────────────

function Glows() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00E5FF]/[0.05] blur-[120px] rounded-full translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7B61FF]/[0.04] blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4" />
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}

// ─── Slide Variants ───────────────────────────────────────────────────────────

const slide = {
  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function StartProjectPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<ProjectFormData>(defaultFormData);
  const [successRefId, setSuccessRefId] = useState<string | null>(null);

  const update = useCallback((patch: Partial<ProjectFormData>) => {
    setFormData(prev => ({ ...prev, ...patch }));
  }, []);

  const goTo = (n: number) => { setDirection(n > step ? 1 : -1); setStep(n); };

  if (successRefId) {
    return (
      <div className="min-h-screen bg-[#00050A] flex flex-col">
        <Glows />
        {/* Minimal header for success state */}
        <header className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/5">
          <Link href="/" className="text-[#00E5FF] font-mono text-sm tracking-widest">VORTEX ←</Link>
        </header>
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-lg">
            <SuccessState referenceId={successRefId} contactMethod={formData.contactMethod} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00050A]">
      <Glows />

      {/* ── Fixed header ── */}
      <header className="sticky top-0 z-40 bg-[#00050A]/90 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 sm:px-8 h-14 max-w-6xl mx-auto">
          <Link href="/"
            className="flex items-center gap-2 text-white/50 hover:text-[#00E5FF] transition-colors text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-mono tracking-widest">VORTEX</span>
          </Link>
          <span className="font-mono text-[#00E5FF] text-xs tracking-widest uppercase">[ Start Project ]</span>
        </div>
      </header>

      {/* ── Step indicator ── */}
      <StepIndicator current={step} />

      {/* ── Form body ── */}
      <main className="relative z-10 px-4 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Hero text — only step 1 */}
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="mb-14 text-center"
              >
                <p className="text-[#00E5FF] font-mono text-xs tracking-[0.3em] mb-4 uppercase">[ Start Your Project ]</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4" dir="rtl">
                  ابدأ مشروعك<br />
                  <span className="text-[#00E5FF]">معانا</span>
                </h1>
                <p className="text-white/45 text-lg" dir="rtl">
                  3 خطوات فقط — ونجاوبك في أقل من 24 ساعة
                </p>

                {/* Trust badges */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {[
                    { label: "< 24h response", icon: "⚡" },
                    { label: "100% مجاني", icon: "✅" },
                    { label: "بلا التزام", icon: "🤝" },
                  ].map(b => (
                    <span key={b.label} className="px-4 py-2 rounded-full border border-[#00E5FF]/20 text-white/50 text-xs font-mono">
                      {b.icon} {b.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wizard card */}
          <div className="rounded-3xl border border-[#00E5FF]/12 bg-[#00E5FF]/[0.025] backdrop-blur-xl p-6 sm:p-10 relative">
            {/* Corner glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00E5FF]/8 blur-[80px] rounded-full pointer-events-none" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.26, ease: "easeInOut" }}
              >
                {step === 1 && (
                  <Step1 data={formData} update={update} onValidated={() => goTo(2)} />
                )}
                {step === 2 && (
                  <Step2 data={formData} update={update} onNext={() => goTo(3)} onBack={() => goTo(1)} />
                )}
                {step === 3 && (
                  <Step3 data={formData} update={update} onBack={() => goTo(2)}
                    onSuccess={refId => setSuccessRefId(refId)} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer note */}
          <p className="text-center text-white/20 text-xs mt-8 font-mono" dir="rtl">
            بياناتك آمنة — ما كنشاركوهاش مع أي طرف ثالث
          </p>
        </div>
      </main>
    </div>
  );
}
