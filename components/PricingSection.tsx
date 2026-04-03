"use client";

import React, { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { CheckCircle2, XCircle, Zap, Star, Crown } from "lucide-react";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  priceMAD: string;
  tagline: string;
  features: PlanFeature[];
  cta: string;
  badge?: string;
  highlighted?: boolean;
  icon: React.ElementType;
}

const plans: Plan[] = [
  {
    name: "Starter",
    priceMAD: "4,999",
    tagline: "لبدايتك الصح",
    icon: Zap,
    features: [
      { text: "Custom Landing Page (5 sections)", included: true },
      { text: "Mobile-First Responsive Design", included: true },
      { text: "Contact Form Integration", included: true },
      { text: "Basic SEO Setup", included: true },
      { text: "WhatsApp Chat Button", included: true },
      { text: "Booking / Reservation System", included: false },
      { text: "AI Automation Integration", included: false },
      { text: "Multi-language (Arabic + French)", included: false },
    ],
    cta: "Get Started",
  },
  {
    name: "Premium",
    priceMAD: "12,999",
    tagline: "الأكثر طلباً",
    icon: Star,
    badge: "MOST POPULAR",
    highlighted: true,
    features: [
      { text: "Full Website (up to 10 pages)", included: true },
      { text: "Mobile-First Responsive Design", included: true },
      { text: "Online Booking / Appointment System", included: true },
      { text: "Advanced SEO + Analytics Dashboard", included: true },
      { text: "WhatsApp Integration", included: true },
      { text: "Multi-language (Arabic + French)", included: true },
      { text: "AI Chatbot (Basic)", included: true },
      { text: "Full AI Automation Suite", included: false },
    ],
    cta: "Start Project",
  },
  {
    name: "Full System",
    priceMAD: "24,999",
    tagline: "نظام رقمي كامل",
    icon: Crown,
    features: [
      { text: "Full Website (unlimited pages)", included: true },
      { text: "Custom AI Automation System", included: true },
      { text: "WhatsApp AI Bot (Arabic + French)", included: true },
      { text: "CRM & Lead Management", included: true },
      { text: "Advanced SEO + Analytics", included: true },
      { text: "24/7 Monitoring & Maintenance", included: true },
      { text: "Priority Support (2h response)", included: true },
      { text: "Monthly Growth Reports", included: true },
    ],
    cta: "Build My System",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <motion.div
      variants={cardVariants}
      style={{ willChange: "transform, opacity, filter" }}
      className={`group relative flex flex-col rounded-2xl border p-8 transition-all duration-500 ${
        plan.highlighted
          ? "border-[#00E5FF]/75 bg-[#00E5FF]/[0.12] shadow-[0_0_80px_rgba(0,229,255,0.25),0_0_160px_rgba(0,229,255,0.08)] scale-105 z-10"
          : "border-[#00E5FF]/40 bg-[#00E5FF]/[0.08] hover:border-[#00E5FF]/65 hover:shadow-[0_0_50px_rgba(0,229,255,0.22)]"
      }`}
    >
      {/* Corner ambient glow */}
      <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-all duration-700 ${
        plan.highlighted ? "bg-[#00E5FF]/12" : "bg-[#00E5FF]/5 group-hover:bg-[#00E5FF]/8"
      }`} />
      {/* Top glowing border line */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent to-transparent pointer-events-none ${
        plan.highlighted ? "w-3/4 via-[#00E5FF]/70" : "w-1/2 via-[#00E5FF]/55"
      }`} />

      {/* Most Popular badge */}
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00E5FF] text-[#00050A] text-[10px] font-black uppercase tracking-[0.3em] px-5 py-1.5 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.5)]">
          {plan.badge}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
            [ {plan.name} ]
          </p>
          <p
            className={`text-sm font-bold ${plan.highlighted ? "text-[#00E5FF]" : "text-zinc-400"}`}
            dir="rtl"
          >
            {plan.tagline}
          </p>
        </div>
        <div
          className={`p-3 rounded-xl ${
            plan.highlighted ? "bg-[#00E5FF]/15 text-[#00E5FF]" : "bg-white/5 text-zinc-500"
          }`}
        >
          <plan.icon size={22} strokeWidth={1.5} />
        </div>
      </div>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className={`text-5xl font-black ${plan.highlighted ? "text-white" : "text-white"}`}>
            {plan.priceMAD}
          </span>
          <span className="text-zinc-500 text-sm font-mono"> MAD</span>
        </div>
        <p className="text-zinc-600 text-xs mt-1 font-mono">One-time project fee</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-10 flex-grow">
        {plan.features.map((f) => (
          <li key={f.text} className="flex items-start gap-3">
            {f.included ? (
              <CheckCircle2
                size={16}
                className="text-[#00E5FF] shrink-0 mt-0.5"
                strokeWidth={2}
              />
            ) : (
              <XCircle
                size={16}
                className="text-white/15 shrink-0 mt-0.5"
                strokeWidth={2}
              />
            )}
            <span
              className={`text-sm leading-snug ${
                f.included ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className={`group w-full py-4 rounded-xl text-center text-sm font-bold uppercase tracking-widest transition-all duration-300 block ${
          plan.highlighted
            ? "bg-[#00E5FF] text-black shadow-[0_0_25px_rgba(0,229,255,0.5),0_0_60px_rgba(0,229,255,0.2)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6),0_0_80px_rgba(0,229,255,0.3)] hover:scale-[1.02]"
            : "border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/10 hover:border-[#00E5FF]/60"
        }`}
      >
        {plan.cta} →
      </a>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative py-24 px-6 md:px-20 bg-[#010D1A] overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00E5FF]/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#7B61FF]/[0.03] blur-[100px] rounded-full pointer-events-none" />
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-[#00E5FF] font-mono tracking-[0.5em] uppercase text-[10px] mb-4">
            [ INVEST IN YOUR GROWTH ]
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6">
            Pricing
          </h2>
          <p className="text-zinc-500 text-xl" dir="rtl">
            شفافية كاملة — بلا مفاجآت
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-zinc-600 text-sm mt-12 font-mono"
        >
          Not sure which plan? →{" "}
          <a href="#contact" className="text-[#00E5FF] hover:underline transition-colors">
            Book a free discovery call
          </a>{" "}
          — no commitment, no pressure.
        </motion.p>
      </div>
    </section>
  );
}
