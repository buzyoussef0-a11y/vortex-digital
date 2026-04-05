"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Upload, X, FileText, Image, Film } from "lucide-react";
import {
  ProjectFormData, ROLE_OPTIONS, ROLE_TO_SEGMENT, WEBSITE_TYPES, TIMELINE_CARDS,
  GENERAL_SERVICE_CARDS, GENERAL_PROBLEMS, GENERAL_SITUATION,
  DENTAL_SERVICE_CARDS, DENTAL_PROBLEMS, DENTAL_SITUATION,
  BRAND_SERVICE_CARDS, BRAND_PROBLEMS, BRAND_SITUATION,
  STARTUP_SERVICE_CARDS, STARTUP_PROBLEMS, STARTUP_SITUATION,
  SEGMENT_STEP2_HEADER,
} from "./types";
import * as LucideIcons from "lucide-react";

// ─── Shared Input Styles ──────────────────────────────────────────────────────

export const inputCls =
  "w-full h-14 bg-[#00E5FF]/[0.04] border border-[#00E5FF]/20 rounded-xl px-5 text-white text-base placeholder-white/30 focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_0_3px_rgba(0,229,255,0.08)] transition-all duration-200";
export const labelCls = "block text-[#00E5FF] font-mono text-xs tracking-widest mb-1";
export const subLabelCls = "text-white/50 text-sm mb-4";
export const errorCls = "text-red-400 text-sm mt-1";
export const qNumCls = "text-[#00E5FF] font-mono text-xs mb-1";

// ─── Step 1 ───────────────────────────────────────────────────────────────────

interface Step1Errors { name?: string; email?: string; phone?: string; role?: string }

interface Step1Props { data: ProjectFormData; update: (p: Partial<ProjectFormData>) => void; onValidated: () => void }

export function Step1({ data, update, onValidated }: Step1Props) {
  const [errors, setErrors] = useState<Step1Errors>({});

  const validate = () => {
    const e: Step1Errors = {};
    if (!data.name.trim()) e.name = "الاسم مطلوب";
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "بريد إلكتروني غير صالح";
    if (!data.phone.trim()) e.phone = "رقم الهاتف مطلوب";
    if (!data.role) e.role = "المرجو اختيار دورك";
    setErrors(e);
    if (Object.keys(e).length === 0) {
      const seg = ROLE_TO_SEGMENT[data.role] ?? "general";
      update({ segment: seg });
      onValidated();
    }
  };

  return (
    <div className="space-y-8">
      {/* Step title */}
      <div dir="rtl">
        <span className="text-[#00E5FF] font-mono text-xs tracking-widest">[ 01 ]</span>
        <h2 className="text-4xl font-bold text-white mt-1">معلوماتك</h2>
        <p className="text-white/50 mt-1">باش نقدرو نتواصلو معاك مباشرة</p>
      </div>

      {/* Q1 Name */}
      <div>
        <p className={qNumCls}>Q1 —</p>
        <label className={labelCls} dir="rtl">الاسم الكامل</label>
        <input className={inputCls} type="text" placeholder="اسمك الكامل / Your full name"
          value={data.name} onChange={e => update({ name: e.target.value })} />
        {errors.name && <p className={errorCls} dir="rtl">{errors.name}</p>}
      </div>

      {/* Q2 Email */}
      <div>
        <p className={qNumCls}>Q2 —</p>
        <label className={labelCls}>البريد الإلكتروني</label>
        <input className={inputCls} type="email" placeholder="email@example.com"
          value={data.email} onChange={e => update({ email: e.target.value })} />
        {errors.email && <p className={errorCls} dir="rtl">{errors.email}</p>}
      </div>

      {/* Q3 Phone */}
      <div>
        <p className={qNumCls}>Q3 —</p>
        <label className={labelCls} dir="rtl">الهاتف / WhatsApp</label>
        <input className={inputCls} type="tel" placeholder="+212 6XX-XXXXXX"
          value={data.phone} onChange={e => update({ phone: e.target.value })} />
        {errors.phone && <p className={errorCls} dir="rtl">{errors.phone}</p>}
        <p className="text-[#00E5FF] text-xs font-mono mt-2" dir="rtl">⚡ كنتواصلو معاك غالباً على WhatsApp</p>
      </div>

      {/* Q4 Role cards */}
      <div>
        <p className={qNumCls}>Q4 —</p>
        <label className={labelCls} dir="rtl">مهنتك / دورك</label>
        {errors.role && <p className={errorCls} dir="rtl">{errors.role}</p>}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
          {ROLE_OPTIONS.map(r => {
            const sel = data.role === r.id;
            return (
              <motion.button
                key={r.id}
                type="button"
                onClick={() => update({ role: r.id })}
                whileHover={{ scale: 1.02 }}
                animate={{ scale: sel ? 1.02 : 1 }}
                className={`relative p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 min-h-[100px] justify-center ${sel
                  ? "border-[#00E5FF]/60 bg-[#00E5FF]/10 shadow-[0_0_20px_rgba(0,229,255,0.10)]"
                  : "border-[#00E5FF]/15 bg-[#00E5FF]/3 hover:border-[#00E5FF]/30"}`}
              >
                {sel && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#00E5FF] flex items-center justify-center">
                    <Check size={9} className="text-black" />
                  </div>
                )}
                <span className="text-2xl">{r.emoji}</span>
                <p className="text-white text-xs font-semibold leading-tight" dir="rtl">{r.label}</p>
                {r.sub && <p className="text-white/40 text-[10px]">{r.sub}</p>}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Q5 City */}
      <div>
        <p className={qNumCls}>Q5 —</p>
        <label className={labelCls} dir="rtl">
          المدينة <span className="text-white/30 font-sans normal-case tracking-normal">(optional)</span>
        </label>
        <input className={inputCls} type="text" placeholder="Casablanca, Rabat, Fes, Azrou..."
          value={data.city} onChange={e => update({ city: e.target.value })} />
      </div>

      {/* CTA */}
      <motion.button
        type="button"
        onClick={validate}
        whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(0,229,255,0.18)" }}
        whileTap={{ scale: 0.99 }}
        className="w-full h-14 bg-[#00E5FF] text-black font-bold text-base rounded-xl transition-all"
        dir="rtl"
      >
        التالي — مشروعك ←
      </motion.button>
    </div>
  );
}

// ─── File Upload Zone ─────────────────────────────────────────────────────────

function FileUploadZone({ files, onAdd, onRemove }: {
  files: File[];
  onAdd: (f: File[]) => void;
  onRemove: (i: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const MAX_MB = 20, MAX_FILES = 5;

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3500); };

  const process = useCallback((list: FileList | null) => {
    if (!list) return;
    const add: File[] = [];
    Array.from(list).forEach(f => {
      if (f.size > MAX_MB * 1024 * 1024) { showToast(`"${f.name}" كبير بزاف (max ${MAX_MB}MB)`); return; }
      if (files.length + add.length >= MAX_FILES) { showToast(`Max ${MAX_FILES} files`); return; }
      add.push(f);
    });
    if (add.length) onAdd(add);
  }, [files, onAdd]);

  const getIcon = (name: string) => {
    const ext = name.split(".").pop()?.toLowerCase() ?? "";
    if (["png","jpg","jpeg","gif","webp"].includes(ext)) return <Image size={14} className="text-[#00E5FF]" />;
    if (["mp4","mov","webm"].includes(ext)) return <Film size={14} className="text-[#00E5FF]" />;
    return <FileText size={14} className="text-[#00E5FF]" />;
  };

  return (
    <div>
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-6 right-6 z-[60] bg-red-500/90 text-white text-sm px-4 py-3 rounded-xl shadow-lg">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={e => { e.preventDefault(); setIsDragging(false); process(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        animate={{ scale: isDragging ? 1.01 : 1, borderColor: isDragging ? "#00E5FF" : "rgba(0,229,255,0.25)" }}
        className="h-44 border-2 border-dashed rounded-2xl cursor-pointer flex flex-col items-center justify-center gap-2 transition-all"
        style={{ background: isDragging ? "rgba(0,229,255,0.04)" : "transparent" }}
      >
        <motion.div animate={{ y: isDragging ? 4 : 0 }}>
          <Upload size={40} className="text-[#00E5FF]/50" />
        </motion.div>
        <p className="text-white/70 text-base" dir="rtl">اسحب ملفاتك هنا</p>
        <p className="text-white/40 text-sm">أو <span className="text-[#00E5FF] underline">اختار من جهازك →</span></p>
        <p className="text-white/25 text-xs mt-1">PDF • PNG • JPG • MP4 • ZIP • Fig • AI — max {MAX_MB}MB — {MAX_FILES} ملفات</p>
        <input ref={inputRef} type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.mp4,.zip,.ai,.fig"
          className="hidden" onChange={e => process(e.target.files)} />
      </motion.div>

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#00E5FF]/5 border border-[#00E5FF]/15">
              {getIcon(f.name)}
              <span className="text-white text-sm truncate flex-1">{f.name}</span>
              <span className="text-white/30 text-xs">{(f.size / 1024 / 1024).toFixed(1)}MB</span>
              <button type="button" onClick={() => onRemove(i)} className="text-white/30 hover:text-red-400 transition-colors">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

// Dynamic icon resolver (avoids giant import list)
function DynIcon({ name, size = 24, className = "" }: { name: string; size?: number; className?: string }) {
  const Icon = (LucideIcons as Record<string, React.ElementType>)[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}

interface Step2Props { data: ProjectFormData; update: (p: Partial<ProjectFormData>) => void; onNext: () => void; onBack: () => void }

export function Step2({ data, update, onNext, onBack }: Step2Props) {
  const [shaking, setShaking] = useState(false);

  // ── Pick data arrays based on segment ──────────────────────────────────────
  const seg = data.segment || "general";

  const serviceCards =
    seg === "dental"  ? DENTAL_SERVICE_CARDS  :
    seg === "brand"   ? BRAND_SERVICE_CARDS   :
    seg === "startup" ? STARTUP_SERVICE_CARDS :
    GENERAL_SERVICE_CARDS;

  const problemPills =
    seg === "dental"  ? DENTAL_PROBLEMS  :
    seg === "brand"   ? BRAND_PROBLEMS   :
    seg === "startup" ? STARTUP_PROBLEMS :
    GENERAL_PROBLEMS;

  const situationOpts =
    seg === "dental"  ? DENTAL_SITUATION  :
    seg === "brand"   ? BRAND_SITUATION   :
    seg === "startup" ? STARTUP_SITUATION :
    GENERAL_SITUATION;

  const header = SEGMENT_STEP2_HEADER[seg] ?? SEGMENT_STEP2_HEADER["general"];

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const toggleService = (id: string) => {
    update({
      services: data.services.includes(id)
        ? data.services.filter(s => s !== id)
        : [...data.services, id],
    });
  };

  const toggleProblem = (p: string) => {
    if (data.problems.includes(p)) {
      update({ problems: data.problems.filter(x => x !== p) });
      return;
    }
    if (data.problems.length >= 3) {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
      return;
    }
    update({ problems: [...data.problems, p] });
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-10">

      {/* Step title */}
      <div dir="rtl">
        <span className="text-[#00E5FF] font-mono text-xs tracking-widest">[ 02 ]</span>
        <h2 className="text-4xl font-bold text-white mt-1">{header.title}</h2>
        <p className="text-white/50 mt-1">{header.subtitle}</p>
      </div>

      {/* Q1 — Services */}
      <div>
        <p className={qNumCls}>Q1 —</p>
        <label className={labelCls} dir="rtl">أشنو تبغي نبنيو ليك؟</label>
        <p className={subLabelCls} dir="rtl">ممكن تختار أكثر من واحد</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceCards.map(c => {
            const sel = data.services.includes(c.id);
            return (
              <motion.button key={c.id} type="button" onClick={() => toggleService(c.id)}
                whileHover={{ scale: sel ? 1.02 : 1.015 }}
                animate={{ scale: sel ? 1.02 : 1 }}
                className={`relative p-6 rounded-xl border text-left min-h-[140px] flex flex-col justify-between transition-all ${sel
                  ? "border-[#00E5FF]/60 bg-[#00E5FF]/8 shadow-[0_0_20px_rgba(0,229,255,0.12)]"
                  : "border-[#00E5FF]/15 bg-[#00E5FF]/3 hover:border-[#00E5FF]/30"}`}
              >
                {sel && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#00E5FF] flex items-center justify-center">
                    <Check size={11} className="text-black" />
                  </div>
                )}
                {c.badge && (
                  <span className="absolute top-3 left-3 text-[9px] font-mono bg-[#00E5FF] text-black px-2 py-0.5 rounded-full">{c.badge}</span>
                )}
                <div>
                  <DynIcon name={c.icon} size={28} className="text-[#00E5FF] mb-3" />
                  <p className="text-white text-lg font-bold" dir="rtl">{c.title}</p>
                  <p className="text-white/50 text-xs mt-0.5">{c.sub}</p>
                </div>
                <p className="text-white/40 text-xs mt-2" dir="rtl">{c.desc}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Q2 — Website type (show for web-related services only) */}
      <AnimatePresence>
        {data.services.some(s => ["web","dental-web","brand-web","startup-web","full","dental-full","brand-full","startup-full"].includes(s)) && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <p className={qNumCls}>Q2 —</p>
            <label className={labelCls} dir="rtl">أي نوع من المواقع تبغي؟</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              {WEBSITE_TYPES.map(wt => {
                const sel = data.websiteType === wt.id;
                return (
                  <motion.button key={wt.id} type="button" onClick={() => update({ websiteType: wt.id })}
                    whileHover={{ scale: 1.02 }} animate={{ scale: sel ? 1.02 : 1 }}
                    className={`relative p-5 rounded-xl border text-center transition-all ${sel
                      ? "border-[#00E5FF]/60 bg-[#00E5FF]/8"
                      : "border-[#00E5FF]/15 bg-[#00E5FF]/3 hover:border-[#00E5FF]/30"}`}
                  >
                    {wt.badge && <span className="block text-[9px] font-bold text-[#00E5FF] font-mono mb-2">{wt.badge}</span>}
                    <DynIcon name={wt.icon} size={24} className="text-[#00E5FF] mx-auto mb-2" />
                    <p className="text-white text-sm font-semibold" dir="rtl">{wt.label}</p>
                    <p className="text-white/40 text-xs mt-1 leading-snug" dir="rtl">{wt.desc}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Q3 — Current situation */}
      <div>
        <p className={qNumCls}>Q3 —</p>
        <label className={labelCls} dir="rtl">واش عندك موقع دابا؟</label>
        <div className="space-y-2 mt-2">
          {situationOpts.map(opt => {
            const sel = data.currentSituation === opt;
            return (
              <button key={opt} type="button" onClick={() => update({ currentSituation: opt })}
                className={`w-full text-right px-5 py-4 rounded-xl border text-sm transition-all ${sel
                  ? "border-l-4 border-l-[#00E5FF] border-[#00E5FF]/30 bg-[#00E5FF]/6 text-white font-semibold"
                  : "border-[#00E5FF]/15 text-white/50 hover:border-[#00E5FF]/30"}`}
                dir="rtl"
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Q4 — Problems */}
      <div>
        <p className={qNumCls}>Q4 —</p>
        <label className={labelCls} dir="rtl">شنو هي أكبر مشكلة كتعاني منها؟</label>
        <p className={subLabelCls} dir="rtl">اختار حتى 3 مشاكل</p>
        <motion.div className="flex flex-wrap gap-2"
          animate={{ x: shaking ? [-4, 4, -4, 4, 0] : 0 }} transition={{ duration: 0.3 }}>
          {problemPills.map(p => {
            const sel = data.problems.includes(p);
            return (
              <button key={p} type="button" onClick={() => toggleProblem(p)} dir="rtl"
                className={`px-4 py-2.5 rounded-full text-sm border transition-all duration-150 ${sel
                  ? "bg-[#00E5FF] border-[#00E5FF] text-black font-semibold"
                  : "border-[#00E5FF]/20 text-white/60 hover:border-[#00E5FF]/40"}`}
              >
                {p}
              </button>
            );
          })}
        </motion.div>
        {shaking && <p className="text-orange-400 text-xs mt-2 font-mono" dir="rtl">اختار 3 فقط ⚠️</p>}
      </div>

      {/* Q5 — Timeline */}
      <div>
        <p className={qNumCls}>Q5 —</p>
        <label className={labelCls} dir="rtl">فوقاش بغيتو يكون جاهز؟</label>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {TIMELINE_CARDS.map(t => {
            const sel = data.timeline === t.id;
            return (
              <motion.button key={t.id} type="button" onClick={() => update({ timeline: t.id })}
                whileHover={{ scale: 1.02 }}
                className={`p-5 rounded-xl border text-left transition-all ${sel
                  ? "border-[#00E5FF]/60 bg-[#00E5FF]/8 text-white"
                  : "border-[#00E5FF]/15 text-white/50 hover:border-[#00E5FF]/30"}`}
              >
                <div className="text-2xl mb-2">{t.icon}</div>
                <p className="text-white text-sm font-semibold" dir="rtl">{t.label}</p>
                <p className="text-white/40 text-xs mt-1" dir="rtl">{t.desc}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Q6 — Notes */}
      <div>
        <p className={qNumCls}>Q6 —</p>
        <label className={labelCls} dir="rtl">
          ملاحظات إضافية <span className="text-white/30 normal-case font-sans tracking-normal">(optional)</span>
        </label>
        <textarea rows={3} dir="rtl"
          className={`${inputCls} !h-auto py-4 resize-none`}
          placeholder="أي تفاصيل ما لقيتش مكانها فوق، أسئلة، أو أي حاجة تبغي تقولها..."
          value={data.notes} onChange={e => update({ notes: e.target.value })}
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button type="button" onClick={onBack}
          className="flex-1 h-14 rounded-xl border border-[#00E5FF]/40 text-[#00E5FF] font-semibold hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all"
          dir="rtl">← رجوع</button>
        <motion.button type="button" onClick={onNext}
          whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(0,229,255,0.18)" }}
          whileTap={{ scale: 0.99 }}
          className="flex-1 h-14 bg-[#00E5FF] text-black font-bold rounded-xl transition-all"
          dir="rtl">التالي — الميزانية ←</motion.button>
      </div>

    </div>
  );
}
