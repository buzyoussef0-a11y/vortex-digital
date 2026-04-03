"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MessageCircle, Send, CheckCircle2, ClipboardCopy } from "lucide-react";
import { BarChart2 } from "lucide-react";
import {
  ProjectFormData, BUDGETS, CONTACT_METHODS, SERVICE_LABELS, TIMELINE_CARDS,
} from "./types";
import { submitProjectForm } from "@/app/actions/contact";
import { inputCls, labelCls, qNumCls } from "./Steps12";

// ─── Mini bar chart ────────────────────────────────────────────────────────────

function BarGraph({ pct }: { pct: number }) {
  const bars = [25, 50, 75, 100];
  return (
    <div className="flex items-end gap-0.5 h-6">
      {bars.map(b => (
        <div key={b} className="w-2 rounded-sm transition-all"
          style={{ height: `${b}%`, backgroundColor: b <= pct ? "#00E5FF" : "rgba(0,229,255,0.15)" }} />
      ))}
    </div>
  );
}

// ─── Order Summary ────────────────────────────────────────────────────────────

function OrderSummary({ data, onEdit }: { data: ProjectFormData; onEdit: () => void }) {
  const budget = BUDGETS.find(b => b.id === data.budget);
  const timeline = TIMELINE_CARDS.find(t => t.id === data.timeline);
  return (
    <div className="rounded-2xl border border-[#00E5FF]/20 bg-[#00E5FF]/4 p-6">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[#00E5FF] font-mono text-xs tracking-widest">[ ملخص طلبك ]</span>
        <button type="button" onClick={onEdit}
          className="text-white/40 hover:text-[#00E5FF] text-xs transition-colors">← تعديل</button>
      </div>
      <div className="space-y-3 text-sm" dir="rtl">
        {data.name && (
          <div className="flex justify-between gap-4">
            <span className="text-white/40 shrink-0">الاسم</span>
            <span className="text-white text-right">{data.name}</span>
          </div>
        )}
        {data.services.length > 0 && (
          <div className="flex justify-between gap-4">
            <span className="text-white/40 shrink-0">الخدمات</span>
            <span className="text-white text-right">{data.services.map(s => SERVICE_LABELS[s] || s).join("، ")}</span>
          </div>
        )}
        {data.websiteType && (
          <div className="flex justify-between gap-4">
            <span className="text-white/40 shrink-0">نوع الموقع</span>
            <span className="text-white text-right">{data.websiteType}</span>
          </div>
        )}
        {timeline && (
          <div className="flex justify-between gap-4">
            <span className="text-white/40 shrink-0">الجدول</span>
            <span className="text-white text-right">{timeline.icon} {timeline.label}</span>
          </div>
        )}
        {data.problems.length > 0 && (
          <div className="flex justify-between gap-4">
            <span className="text-white/40 shrink-0">المشاكل</span>
            <span className="text-white text-right leading-relaxed">{data.problems.join("، ")}</span>
          </div>
        )}
        {data.files.length > 0 && (
          <div className="flex justify-between gap-4">
            <span className="text-white/40 shrink-0">الملفات</span>
            <span className="text-white">{data.files.length} ملف</span>
          </div>
        )}
      </div>
      {budget && (
        <div className="mt-5 pt-5 border-t border-[#00E5FF]/15">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-base">{budget.label}</span>
            {budget.pct > 0 ? <BarGraph pct={budget.pct} /> : <MessageCircle size={18} className="text-[#00E5FF]" />}
          </div>
          <p className="text-white/40 text-xs mt-1" dir="rtl">{budget.desc}</p>
        </div>
      )}
    </div>
  );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────

interface Step3Props {
  data: ProjectFormData;
  update: (p: Partial<ProjectFormData>) => void;
  onBack: () => void;
  onSuccess: (refId: string) => void;
}

export function Step3({ data, update, onBack, onSuccess }: Step3Props) {
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!data.budget) { setError("اختر ميزانيتك التقريبية"); return; }
    setError(null);
    setSubmitting(true);
    setProgress(0);
    const ticker = setInterval(() => setProgress(p => Math.min(p + 10, 88)), 160);
    try {
      const res = await submitProjectForm({
        step1: { name: data.name, email: data.email, phone: data.phone, role: data.role, city: data.city },
        step2: {
          services: data.services, websiteType: data.websiteType,
          currentSituation: data.currentSituation, problems: data.problems,
          timeline: data.timeline, inspiration: data.inspiration,
          fileNames: data.files.map(f => f.name), notes: data.notes,
        },
        step3: { budget: data.budget, contactMethod: data.contactMethod },
      });
      clearInterval(ticker);
      if (res.success && res.referenceId) {
        setProgress(100);
        setTimeout(() => onSuccess(res.referenceId!), 400);
      } else {
        setError(res.message || "حدث خطأ — حاول مرة أخرى");
        setSubmitting(false);
      }
    } catch {
      clearInterval(ticker);
      setError("حدث خطأ في الشبكة — حاول مرة أخرى");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Step title */}
      <div dir="rtl">
        <span className="text-[#00E5FF] font-mono text-xs tracking-widest">[ 03 ]</span>
        <h2 className="text-4xl font-bold text-white mt-1">الميزانية</h2>
        <p className="text-white/50 mt-1">الخطوة الأخيرة — نجاوبك في أقل من 24 ساعة</p>
      </div>

      {/* Q1 Budget */}
      <div>
        <p className={qNumCls}>Q9 —</p>
        <label className={labelCls} dir="rtl">شنو هو ميزانيتك التقريبية؟</label>
        {error && <p className="text-red-400 text-sm mt-1" dir="rtl">{error}</p>}
        <div className="grid grid-cols-1 gap-3 mt-3">
          {BUDGETS.map(b => {
            const sel = data.budget === b.id;
            return (
              <motion.button key={b.id} type="button" onClick={() => { update({ budget: b.id }); setError(null); }}
                whileHover={{ scale: 1.01 }} animate={{ scale: sel ? 1.01 : 1 }}
                className={`relative p-5 rounded-xl border text-left transition-all ${sel
                  ? "border-[#00E5FF]/60 bg-[#00E5FF]/8 shadow-[0_0_20px_rgba(0,229,255,0.10)]"
                  : "border-[#00E5FF]/15 bg-[#00E5FF]/3 hover:border-[#00E5FF]/30"}`}
              >
                {sel && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#00E5FF] flex items-center justify-center">
                    <Check size={11} className="text-black" />
                  </div>
                )}
                {b.badge && (
                  <span className="absolute top-3 left-3 text-[9px] font-mono bg-[#00E5FF] text-black px-2 py-0.5 rounded-full">{b.badge}</span>
                )}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-white font-bold text-base">{b.label}</p>
                    <p className="text-white/40 text-sm mt-0.5" dir="rtl">{b.desc}</p>
                  </div>
                  {b.pct > 0 ? <BarGraph pct={b.pct} /> : <MessageCircle size={20} className="text-[#00E5FF] shrink-0 mt-1" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Q2 Contact method */}
      <div>
        <p className={qNumCls}>Q10 —</p>
        <label className={labelCls} dir="rtl">كيفاش تحب نتواصلو معاك؟</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {CONTACT_METHODS.map(m => {
            const sel = data.contactMethod === m.id;
            return (
              <button key={m.id} type="button" onClick={() => update({ contactMethod: m.id })}
                className={`px-5 py-3 rounded-full text-base border transition-all ${sel
                  ? "bg-[#00E5FF] border-[#00E5FF] text-black font-bold"
                  : "border-[#00E5FF]/20 text-white/60 hover:border-[#00E5FF]/40"}`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Order summary */}
      <OrderSummary data={data} onEdit={() => onBack()} />

      {/* Navigation */}
      <div className="space-y-3">
        <motion.button type="button" onClick={handleSubmit} disabled={submitting}
          whileHover={{ scale: submitting ? 1 : 1.01, boxShadow: submitting ? "none" : "0 0 50px rgba(0,229,255,0.2)" }}
          whileTap={{ scale: 0.99 }}
          className="w-full h-16 bg-[#00E5FF] text-black font-bold text-base rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          dir="rtl"
        >
          {submitting ? (
            <>
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              جاري الإرسال...
            </>
          ) : (
            <>
              <Send size={18} />
              إرسال الطلب ✦ Submit Project
            </>
          )}
        </motion.button>

        {/* Progress bar */}
        <AnimatePresence>
          {submitting && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-0.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div className="h-full bg-[#00E5FF] rounded-full"
                animate={{ width: `${progress}%` }} transition={{ duration: 0.2 }} />
            </motion.div>
          )}
        </AnimatePresence>

        <button type="button" onClick={onBack}
          className="w-full h-12 rounded-xl border border-[#00E5FF]/30 text-[#00E5FF] font-semibold hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all text-sm"
          dir="rtl">← رجوع</button>
      </div>
    </div>
  );
}

// ─── Success State ────────────────────────────────────────────────────────────

interface SuccessStateProps { referenceId: string; contactMethod: string }

export function SuccessState({ referenceId, contactMethod }: SuccessStateProps) {
  const [copied, setCopied] = useState(false);
  const copyRef = () => {
    navigator.clipboard.writeText(referenceId).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  const contactLabel = { whatsapp: "WhatsApp", email: "Email", call: "هاتف" }[contactMethod] ?? "WhatsApp";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 px-4 relative overflow-hidden">
      {/* Confetti */}
      {[...Array(28)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ top: "40%", left: "50%", backgroundColor: i % 3 === 0 ? "#00E5FF" : i % 3 === 1 ? "#ffffff" : "#FFE600" }}
          animate={{ x: (Math.random() - 0.5) * 400, y: (Math.random() - 0.5) * 300, opacity: [1, 1, 0], scale: [0, 1.2, 0] }}
          transition={{ duration: 1.2 + Math.random() * 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Check circle with draw animation */}
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }}
        className="w-24 h-24 rounded-full border-2 border-[#00E5FF]/50 bg-[#00E5FF]/10 flex items-center justify-center mx-auto mb-8"
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <CheckCircle2 size={48} className="text-[#00E5FF]" />
        </motion.div>
      </motion.div>

      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="text-3xl md:text-4xl font-bold text-white mb-3" dir="rtl">
        وصل الطلب ديالك! 🚀
      </motion.h2>

      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="text-white/50 text-lg mb-10" dir="rtl">
        غادي نتواصلو معاك على <span className="text-[#00E5FF]">{contactLabel}</span> في أقل من 24 ساعة
      </motion.p>

      {/* Reference ID */}
      <motion.button type="button" onClick={copyRef}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="mx-auto mb-10 flex items-center gap-3 bg-[#00E5FF]/8 border border-[#00E5FF]/20 rounded-2xl px-8 py-5 hover:bg-[#00E5FF]/12 transition-all group"
      >
        <div className="text-left">
          <p className="text-white/40 text-xs font-mono mb-1">رقم مرجعي — Reference ID</p>
          <p className="text-[#00E5FF] font-mono font-bold text-2xl tracking-widest">{referenceId}</p>
        </div>
        <div className="text-white/30 group-hover:text-[#00E5FF] transition-colors">
          {copied ? <Check size={20} className="text-green-400" /> : <ClipboardCopy size={20} />}
        </div>
      </motion.button>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/"
          className="px-8 py-3.5 border border-[#00E5FF]/30 text-[#00E5FF] rounded-xl text-sm hover:bg-[#00E5FF]/10 transition-all" dir="rtl">
          ← عود للصفحة الرئيسية
        </a>
        <a href="/#portfolio"
          className="px-8 py-3.5 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm hover:bg-white/10 transition-all" dir="rtl">
          استعرض مشاريعنا →
        </a>
      </motion.div>
    </motion.div>
  );
}
