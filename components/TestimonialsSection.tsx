"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Clock, RefreshCw, Code2, Zap, HeartHandshake, Star, ArrowRight } from "lucide-react";

const GUARANTEES = [
  {
    icon: Clock,
    emoji: "⚡",
    title: "رد في أقل من 24 ساعة",
    titleEn: "< 24h Response",
    desc: "كل رسالة، كل سؤال، كل طلب — نجاوبك قبل ما يجي النهار. مش أسبوع، مش يومين — 24 ساعة كحد أقصى.",
    color: "#00E5FF",
    glow: "rgba(0,229,255,0.15)",
  },
  {
    icon: RefreshCw,
    emoji: "🔄",
    title: "تعديلات بلا حدود حتى ترضى",
    titleEn: "Unlimited Revisions",
    desc: "ماكنسلموش المشروع حتى تكون راضي 100%. مش راضي؟ نبدلو. مش عاجبك اللون؟ نغيرو. نتا الكابتن.",
    color: "#00E5FF",
    glow: "rgba(0,229,255,0.15)",
  },
  {
    icon: Shield,
    emoji: "🛡️",
    title: "إذا ما عجبكش — مانطلبوش فلوس",
    titleEn: "Money-Back Guarantee",
    desc: "واثقين في شغلنا لدرجة أننا نضمن النتيجة. إذا ما وصلناش للمواصفات المتفق عليها — الفلوس ترجع كاملة.",
    color: "#7B61FF",
    glow: "rgba(123,97,255,0.15)",
  },
  {
    icon: Code2,
    emoji: "💻",
    title: "الكود ديالك بالكامل",
    titleEn: "You Own Everything",
    desc: "مانحتفظوش بأي شيء. كل السورس كود، الدومين، الداتا — كلها ملكيتك 100% من اليوم الأول.",
    color: "#00E5FF",
    glow: "rgba(0,229,255,0.15)",
  },
  {
    icon: Zap,
    emoji: "🚀",
    title: "تسليم في الوقت المحدد",
    titleEn: "On-Time Delivery",
    desc: "نحدد تاريخ، نلتزم به. مع تحديثات أسبوعية على التقدم باش دايما تكون في الصورة.",
    color: "#00E5FF",
    glow: "rgba(0,229,255,0.15)",
  },
  {
    icon: HeartHandshake,
    emoji: "🤝",
    title: "30 يوم دعم مجاني بعد التسليم",
    titleEn: "30-Day Free Support",
    desc: "بعد ما نسلموك المشروع مانهربوش. 30 يوم دعم كامل مجاني — bugs، أسئلة، أي تعديل صغير.",
    color: "#7B61FF",
    glow: "rgba(123,97,255,0.15)",
  },
];

const STATS = [
  { value: "< 24h", label: "وقت الرد" },
  { value: "100%", label: "ملكية الكود" },
  { value: "30 يوم", label: "دعم مجاني" },
  { value: "∞", label: "تعديلات" },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 md:px-20 relative overflow-hidden bg-[#00050A]">
      {/* Background atmosphere */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)", filter: "blur(100px)" }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(123,97,255,0.05) 0%, transparent 70%)", filter: "blur(100px)" }} />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#00E5FF] font-mono text-xs tracking-[0.4em] uppercase mb-4"
          >
            [ WHY TRUST US ]
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight"
            dir="rtl"
          >
            شغلنا بيحكي —<br />
            <span className="bg-gradient-to-r from-white to-[#00E5FF] bg-clip-text text-transparent">
              وضماناتنا بتحمي
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/40 text-lg max-w-xl mx-auto"
            dir="rtl"
          >
            مابغيناش تثق فينا بكلام فقط — هاذي هي التزاماتنا الحقيقية معاك
          </motion.p>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center py-6 rounded-2xl border border-[#00E5FF]/10 bg-[#00E5FF]/[0.03]"
            >
              <div className="text-3xl md:text-4xl font-black text-[#00E5FF] mb-1">{s.value}</div>
              <div className="text-white/40 text-xs font-mono tracking-wider" dir="rtl">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Guarantee cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {GUARANTEES.map((g, i) => (
            <motion.div
              key={g.titleEn}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-7 overflow-hidden cursor-default"
              style={{
                boxShadow: "0 0 0 0 transparent",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${g.glow}`;
                (e.currentTarget as HTMLElement).style.borderColor = `${g.color}30`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              {/* Top border glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${g.color}50, transparent)` }} />

              {/* Corner glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${g.glow} 0%, transparent 70%)`, filter: "blur(20px)" }} />

              {/* Icon */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${g.color}12`, border: `1px solid ${g.color}25` }}>
                  <g.icon size={20} style={{ color: g.color }} strokeWidth={1.8} />
                </div>
                <span className="text-2xl">{g.emoji}</span>
              </div>

              {/* Content */}
              <h3 className="text-white font-bold text-base mb-2 leading-snug" dir="rtl">
                {g.title}
              </h3>
              <p className="text-[10px] font-mono tracking-widest mb-3" style={{ color: g.color }}>
                {g.titleEn}
              </p>
              <p className="text-white/40 text-sm leading-relaxed" dir="rtl">
                {g.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-6 rounded-3xl border border-[#00E5FF]/15 bg-[#00E5FF]/[0.03] px-10 py-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-[#00E5FF] text-[#00E5FF]" />
              ))}
            </div>
            <p className="text-white/60 text-sm max-w-md" dir="rtl">
              كن أول عميل لنا وانتفع بسعر تأسيسي خاص — نبنيلك مشروع احترافي ونطلب منك مراجعتك الصادقة فقط
            </p>
            <a
              href="/start-project"
              className="flex items-center gap-2 px-7 py-3 rounded-full font-mono text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.06))",
                border: "1px solid rgba(0,229,255,0.4)",
                color: "#00E5FF",
                boxShadow: "0 0 20px rgba(0,229,255,0.1)",
              }}
            >
              ابدأ مشروعك الآن
              <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
