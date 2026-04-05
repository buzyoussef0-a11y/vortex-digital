"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Plus, MessageSquare } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────── */

const faqs = [
  {
    q: "How long does a typical project take?",
    qAr: "كم يستغرق المشروع عادةً؟",
    a: "Most projects are delivered in 3–5 weeks. Landing pages ship in 7–10 days. Full systems with AI automation take 3–6 weeks. You receive daily progress updates throughout — no disappearing acts.",
    aAr: "معظم المشاريع كتتسلم خلال 3 إلى 5 أسابيع. الصفحات البسيطة: 7 إلى 10 أيام. الأنظمة الكاملة مع الـ AI: 3 إلى 6 أسابيع. كتبقى محدث كل يوم بلا استثناء.",
  },
  {
    q: "What technologies do you build with?",
    qAr: "أشمن تقنيات كتخدمو بيها؟",
    a: "Front end: Next.js, React, TypeScript, Tailwind. AI layer: OpenAI, Claude, custom prompt engineering. Automation: n8n and Make for multi-step workflows. Everything is production-grade and fully documented.",
    aAr: "الواجهة: Next.js وReact وTypeScript. الذكاء الاصطناعي: OpenAI وClaude. الأتمتة: n8n وMake. كل شي بمستوى احترافي وموثق بالكامل.",
  },
  {
    q: "How does AI actually work inside my website?",
    qAr: "كيفاش يشتغل الـ AI فعلاً في موقعي؟",
    a: "The AI handles customer inquiries 24/7 in Arabic, French, or English — qualifying leads, booking appointments, sending follow-ups, and generating personalised responses. All without you lifting a finger.",
    aAr: "الـ AI يجاوب على العملاء 24/7 بالدارجة، الفرنسية، أو الإنجليزية — يصفي العملاء المحتملين، يحجز المواعيد، يرسل رسائل متابعة. كل هذا بدون ما تتدخل.",
  },
  {
    q: "Do you provide support after delivery?",
    qAr: "واش كتبقاو معايا بعد التسليم؟",
    a: "Every project includes 30 days of free post-launch support. After that, we offer monthly maintenance plans to keep your system fast, updated, and protected. We don't disappear after handover.",
    aAr: "كل مشروع معاه 30 يوم دعم مجاني بعد الإطلاق. بعد ذلك، كنقدمو خطط صيانة شهرية باش يبقى نظامك سريع، محدث، ومحمي. ماكنهربوش بعد التسليم.",
  },
  {
    q: "How do I get a quote for my project?",
    qAr: "كيفاش نعرف شحال يتكلف مشروعي؟",
    a: "Every project is scoped individually — every business has different needs. Book a free 30-min discovery call and we'll send you a clear, detailed proposal within 24 hours. No commitment, no pressure.",
    aAr: "كل مشروع كيتحدد حسب احتياجاتو — كل بيزنس مختلف. احجز مكالمة مجانية 30 دقيقة وغادي نبعتليك عرض مفصل وواضح خلال 24 ساعة. بلا التزام وبلا ضغط.",
  },
  {
    q: "Do you offer any guarantee?",
    qAr: "واش عندكم ضمان؟",
    a: "We stand behind every deliverable. If the result doesn't match the agreed specifications, we revise it at no additional cost. No excuses, no extra invoices.",
    aAr: "كنضمنو كل ما نسلموه. إلا النتيجة ما وافقتش المواصفات المتفق عليها، كنصلحوها مجانًا. بلا عذر وبلا فاتورة إضافية.",
  },
  {
    q: "How do we get started?",
    qAr: "كيفاش نبداو؟",
    a: "Click 'Start a Project' or message us on WhatsApp. We'll schedule a free 30-minute discovery session, understand your goals, and send you a full tailored proposal — usually within the same day.",
    aAr: "دوز على 'ابدأ مشروعك' أو راسلنا على واتساب. غادي نحددو جلسة اكتشاف مجانية 30 دقيقة، نفهمو هدافك، ونبعتليك عرض مفصّل — عادةً في نفس اليوم.",
  },
];

/* ─── FAQ Item ───────────────────────────────────────────── */

interface FAQItemProps {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ faq, index, isOpen, onToggle }: FAQItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      {/* Left accent strip */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 bottom-0 w-[2px] z-10 rounded-full"
            style={{
              transformOrigin: "top",
              background:
                "linear-gradient(to bottom, transparent 0%, #00E5FF 30%, #00E5FF 70%, transparent 100%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div
        animate={{
          borderColor: isOpen
            ? "rgba(0,229,255,0.3)"
            : "rgba(0,229,255,0.09)",
          boxShadow: isOpen
            ? "0 0 50px rgba(0,229,255,0.1), inset 0 0 30px rgba(0,229,255,0.03)"
            : "0 0 0px rgba(0,229,255,0)",
        }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-2xl relative"
        style={{
          background:
            "linear-gradient(145deg, rgba(0,229,255,0.03) 0%, rgba(0,5,10,0.95) 100%)",
          border: "1px solid rgba(0,229,255,0.09)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Top glow on open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(0,229,255,0.5), transparent)",
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Question row ── */}
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-4 md:gap-6 px-6 py-5 md:px-8 md:py-6 text-left group cursor-pointer"
          aria-expanded={isOpen}
        >
          {/* Index badge */}
          <span
            className="shrink-0 text-[10px] font-mono tracking-[0.2em] tabular-nums"
            style={{ color: isOpen ? "rgba(0,229,255,0.7)" : "rgba(0,229,255,0.3)" }}
          >
            [{String(index + 1).padStart(2, "0")}]
          </span>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <motion.p
              animate={{ color: isOpen ? "#ffffff" : "rgba(255,255,255,0.82)" }}
              transition={{ duration: 0.3 }}
              className="font-semibold text-[15px] md:text-base leading-snug group-hover:text-white transition-colors duration-300"
            >
              {faq.q}
            </motion.p>
            <p
              dir="rtl"
              className="text-sm mt-1 text-right font-medium leading-snug"
              style={{ color: isOpen ? "rgba(0,229,255,0.55)" : "rgba(0,229,255,0.35)" }}
            >
              {faq.qAr}
            </p>
          </div>

          {/* Expand indicator */}
          <motion.div
            animate={{
              rotate: isOpen ? 45 : 0,
              borderColor: isOpen ? "rgba(0,229,255,0.55)" : "rgba(255,255,255,0.12)",
              background: isOpen ? "rgba(0,229,255,0.1)" : "rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ border: "1px solid" }}
          >
            <Plus
              className="w-3.5 h-3.5"
              style={{ color: isOpen ? "#00E5FF" : "rgba(255,255,255,0.45)" }}
            />
          </motion.div>
        </button>

        {/* ── Answer ── */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="px-6 pb-7 md:px-8 md:pb-8 pt-0 pl-[58px] md:pl-[76px]">
                {/* Separator */}
                <div
                  className="w-full h-px mb-5"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0,229,255,0.25), rgba(0,229,255,0.05), transparent)",
                  }}
                />
                <p className="text-white/62 text-[15px] leading-[1.9]">{faq.a}</p>
                <p
                  dir="rtl"
                  className="text-[#00E5FF]/40 text-sm mt-3 text-right leading-[1.85]"
                >
                  {faq.aAr}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/* ─── Section ────────────────────────────────────────────── */

const TITLE_WORD = "QUESTIONS".split("");

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  /* Scroll spring for header */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const s = useSpring(scrollYProgress, { stiffness: 50, damping: 16, restDelta: 0.001 });

  const labelO  = useTransform(s, [0.04, 0.14], [0, 1]);
  const labelX  = useTransform(s, [0.04, 0.14], [-28, 0]);
  const line1O  = useTransform(s, [0.07, 0.18], [0, 1]);
  const line1Y  = useTransform(s, [0.07, 0.18], [40, 0]);
  const subO    = useTransform(s, [0.13, 0.22], [0, 1]);
  const counterO = useTransform(s, [0.10, 0.20], [0, 1]);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-40 px-6 md:px-20"
      style={{
        background:
          "linear-gradient(180deg, #00050A 0%, #000C18 50%, #00050A 100%)",
      }}
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/12 to-transparent pointer-events-none" />

      {/* Ambient orbs */}
      <div
        className="absolute top-1/3 -right-60 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-1/4 -left-60 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Diagonal scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(60deg, rgba(0,229,255,0.016) 0px, rgba(0,229,255,0.016) 1px, transparent 1px, transparent 80px)",
        }}
      />

      {/* Watermark "?" */}
      <div
        className="absolute right-8 md:right-20 top-1/2 -translate-y-1/2 select-none pointer-events-none font-black"
        style={{
          fontSize: "clamp(200px, 22vw, 380px)",
          color: "rgba(0,229,255,0.022)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}
      >
        ?
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Header ── */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.p
              style={{ opacity: labelO, x: labelX }}
              className="text-[#00E5FF] font-mono text-xs tracking-[0.3em] uppercase mb-4"
            >
              [ FREQUENTLY ASKED ]
            </motion.p>

            {/* "COMMON" on line 1 */}
            <motion.div
              style={{ opacity: line1O, y: line1Y }}
              className="overflow-visible"
            >
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
                Common
              </h2>
            </motion.div>

            {/* "QUESTIONS" — letter by letter */}
            <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
              {TITLE_WORD.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.65,
                    delay: 0.15 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    display: "inline-block",
                    background:
                      "linear-gradient(90deg, #ffffff 0%, #00E5FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h2>

            <motion.p
              style={{ opacity: subO }}
              dir="rtl"
              className="text-zinc-500 text-lg md:text-xl mt-4 text-right"
            >
              كل ما تحتاج تعرفه قبل ما تبدأ
            </motion.p>
          </div>

          {/* Counter */}
          <motion.div
            style={{ opacity: counterO }}
            className="shrink-0 flex flex-col items-start md:items-end gap-1 pb-2"
          >
            <span
              className="font-mono font-black leading-none"
              style={{
                fontSize: "64px",
                background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.04))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              07
            </span>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#00E5FF]/35 uppercase">
              questions
            </span>
          </motion.div>
        </div>

        {/* ── FAQ list ── */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 relative overflow-hidden rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,229,255,0.06) 0%, rgba(0,5,10,0.95) 60%, rgba(123,97,255,0.04) 100%)",
            border: "1px solid rgba(0,229,255,0.16)",
          }}
        >
          {/* Top glow line */}
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent pointer-events-none" />

          <div>
            <p className="text-white font-bold text-xl md:text-2xl mb-1">
              Still have questions?
            </p>
            <p dir="rtl" className="text-[#00E5FF]/60 text-base text-right">
              ما زال عندك استفسار؟ نتكلمو مباشرة
            </p>
          </div>

          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-3 px-7 py-3.5 rounded-full font-mono text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 group"
            style={{
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.4)",
              color: "#00E5FF",
              boxShadow: "0 0 20px rgba(0,229,255,0.12)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(0,229,255,0.14)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 32px rgba(0,229,255,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(0,229,255,0.08)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 20px rgba(0,229,255,0.12)";
            }}
          >
            <MessageSquare className="w-4 h-4" />
            Book a Free Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
