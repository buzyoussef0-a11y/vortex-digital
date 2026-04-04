"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Mail, MessageCircle, MapPin, Instagram, Linkedin, Twitter,
  Check, Globe, Bot, Layers, Package, Layout, Sparkles,
  ShoppingBag, Upload, X, MessageCircle as MsgCircle,
  CheckCircle2, ChevronLeft, ChevronRight, BarChart2
} from "lucide-react";
import { sendProjectForm } from "@/app/actions/contact";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectFormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  role: string;
  city: string;
  // Step 2
  services: string[];
  websiteType: string;
  currentSituation: string;
  problems: string[];
  timeline: string;
  inspiration: string;
  files: File[];
  notes: string;
  // Step 3
  budget: string;
  contactMethod: string;
}

const defaultFormData: ProjectFormData = {
  name: "", email: "", phone: "", role: "", city: "",
  services: [], websiteType: "", currentSituation: "",
  problems: [], timeline: "", inspiration: "",
  files: [], notes: "",
  budget: "", contactMethod: "whatsapp",
};

// ─── Step Indicator ────────────────────────────────────────────────────────────

const STEPS = [
  { num: 1, label: "Info" },
  { num: 2, label: "Project" },
  { num: 3, label: "Budget" },
];

const StepIndicator = ({ current }: { current: number }) => (
  <div className="flex items-center justify-center mb-8">
    {STEPS.map((step, i) => {
      const isDone = current > step.num;
      const isActive = current === step.num;
      return (
        <React.Fragment key={step.num}>
          <div className="flex flex-col items-center gap-1.5">
            <motion.div
              animate={{
                backgroundColor: isDone ? "rgba(0,229,255,0.2)" : isActive ? "#00E5FF" : "transparent",
                borderColor: isDone || isActive ? "#00E5FF" : "rgba(0,229,255,0.25)",
                boxShadow: isActive ? "0 0 20px rgba(0,229,255,0.3)" : "none",
              }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full border flex items-center justify-center"
            >
              {isDone ? (
                <Check size={14} className="text-[#00E5FF]" />
              ) : (
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: isActive ? "#000" : "rgba(255,255,255,0.3)" }}
                >
                  {step.num}
                </span>
              )}
            </motion.div>
            <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{step.label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <motion.div
              animate={{ backgroundColor: current > step.num ? "#00E5FF" : "rgba(0,229,255,0.15)" }}
              transition={{ duration: 0.4 }}
              className="h-px flex-1 mx-3 mb-5"
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// ─── Field helpers ─────────────────────────────────────────────────────────────

const inputCls = "w-full bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all text-sm";
const labelCls = "block text-zinc-500 text-[10px] uppercase tracking-widest mb-2 font-mono";
const errorCls = "text-red-400 text-[11px] mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200";

// ─── Step 1 ────────────────────────────────────────────────────────────────────

interface Step1Errors { name?: string; email?: string; phone?: string; role?: string; }

function Step1({
  data, update
}: {
  data: ProjectFormData;
  update: (patch: Partial<ProjectFormData>) => void;
}) {
  const [errors, setErrors] = useState<Step1Errors>({});

  const validate = () => {
    const e: Step1Errors = {};
    if (!data.name.trim()) e.name = "الاسم مطلوب";
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "بريد إلكتروني غير صالح";
    if (!data.phone.trim()) e.phone = "رقم الهاتف مطلوب";
    if (!data.role) e.role = "المرجو اختيار دورك";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Expose validate via a ref trick — parent calls it before proceeding
  (Step1 as any).__validate = validate;

  return (
    <div className="space-y-5">
      <div className="mb-6">
        <span className="text-[#00E5FF] font-mono text-[10px] tracking-widest">[ STEP 01 / 03 ]</span>
        <h3 className="text-xl font-bold text-white mt-1" dir="rtl">معلوماتك الشخصية</h3>
        <p className="text-white/40 text-sm mt-1" dir="rtl">باش نقدرو نتواصلو معاك</p>
      </div>

      {/* Full Name */}
      <div>
        <label className={labelCls}>Full Name / الاسم الكامل</label>
        <input type="text" className={inputCls} placeholder="اسمك الكامل / Your full name"
          value={data.name} onChange={e => update({ name: e.target.value })} />
        {errors.name && <p className={errorCls}>{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className={labelCls}>Email</label>
        <input type="email" className={inputCls} placeholder="email@example.com"
          value={data.email} onChange={e => update({ email: e.target.value })} />
        {errors.email && <p className={errorCls}>{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className={labelCls}>Phone / WhatsApp</label>
        <input type="tel" className={inputCls} placeholder="+212 6XX-XXXXXX"
          value={data.phone} onChange={e => update({ phone: e.target.value })} />
        {errors.phone && <p className={errorCls}>{errors.phone}</p>}
        <p className="text-[#00E5FF] text-[11px] mt-1.5 font-mono">كنتواصلو معاك غالباً على WhatsApp ⚡</p>
      </div>

      {/* Role */}
      <div>
        <label className={labelCls}>Your Role / دورك</label>
        <select className={inputCls + " appearance-none cursor-pointer"}
          value={data.role} onChange={e => update({ role: e.target.value })}>
          <option value="" className="bg-[#00050A]">اختر دورك / Select your role</option>
          <option value="business-owner" className="bg-[#00050A]">Business Owner / صاحب مشروع</option>
          <option value="startup-founder" className="bg-[#00050A]">Startup Founder</option>
          <option value="freelancer" className="bg-[#00050A]">Freelancer / مستقل</option>
          <option value="marketing-manager" className="bg-[#00050A]">Marketing Manager</option>
          <option value="other" className="bg-[#00050A]">Other / أخرى</option>
        </select>
        {errors.role && <p className={errorCls}>{errors.role}</p>}
      </div>

      {/* City */}
      <div>
        <label className={labelCls}>City / المدينة <span className="text-white/20">(optional)</span></label>
        <input type="text" className={inputCls} placeholder="Casablanca, Rabat, Fes..."
          value={data.city} onChange={e => update({ city: e.target.value })} />
      </div>
    </div>
  );
}

// ─── Card Selector ─────────────────────────────────────────────────────────────

interface SelectCardItem {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  badge?: string;
}

function MultiSelectCards({
  items, selected, onToggle
}: {
  items: SelectCardItem[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map(item => {
        const isSelected = selected.includes(item.id);
        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => onToggle(item.id)}
            whileHover={{ scale: 1.02 }}
            animate={{ scale: isSelected ? 1.02 : 1 }}
            className={`relative p-4 rounded-xl border text-left transition-all duration-200 ${isSelected
              ? "border-[#00E5FF]/60 bg-[#00E5FF]/8 shadow-[0_0_20px_rgba(0,229,255,0.10)]"
              : "border-[#00E5FF]/15 bg-[#00E5FF]/3 hover:border-[#00E5FF]/30"
              }`}
          >
            {isSelected && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#00E5FF] flex items-center justify-center">
                <Check size={11} className="text-black" />
              </div>
            )}
            {item.badge && (
              <span className="absolute top-2 left-2 text-[9px] font-mono bg-[#00E5FF] text-black px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
            <item.icon size={22} className="text-[#00E5FF] mb-2" />
            <p className="text-white text-sm font-semibold leading-tight">{item.title}</p>
            <p className="text-white/40 text-[11px] mt-1 leading-snug">{item.subtitle}</p>
          </motion.button>
        );
      })}
    </div>
  );
}

function RadioCards({
  items, selected, onSelect
}: {
  items: SelectCardItem[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map(item => {
        const isSelected = selected === item.id;
        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            whileHover={{ scale: 1.02 }}
            animate={{ scale: isSelected ? 1.02 : 1 }}
            className={`relative p-3 rounded-xl border text-center transition-all duration-200 ${isSelected
              ? "border-[#00E5FF]/60 bg-[#00E5FF]/8"
              : "border-[#00E5FF]/15 bg-[#00E5FF]/3 hover:border-[#00E5FF]/30"
              }`}
          >
            {isSelected && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#00E5FF] flex items-center justify-center">
                <Check size={10} className="text-black" />
              </div>
            )}
            {item.badge && (
              <span className="block text-[9px] font-mono bg-[#00E5FF]/20 text-[#00E5FF] px-1.5 py-0.5 rounded mb-2 leading-tight">
                {item.badge}
              </span>
            )}
            <item.icon size={20} className="text-[#00E5FF] mx-auto mb-2" />
            <p className="text-white text-[11px] font-semibold leading-tight">{item.title}</p>
            <p className="text-white/40 text-[10px] mt-1 leading-snug">{item.subtitle}</p>
          </motion.button>
        );
      })}
    </div>
  );
}

function PillToggle({
  options, selected, onSelect
}: {
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onSelect(opt)}
          className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${selected === opt
            ? "bg-[#00E5FF] border-[#00E5FF] text-black font-semibold"
            : "border-[#00E5FF]/20 text-white/60 hover:border-[#00E5FF]/40"
            }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── File Upload Zone ──────────────────────────────────────────────────────────

function FileUploadZone({
  files, onAdd, onRemove
}: {
  files: File[];
  onAdd: (f: File[]) => void;
  onRemove: (index: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [toastError, setToastError] = useState<string | null>(null);

  const MAX_SIZE_MB = 20;
  const MAX_FILES = 5;
  const ACCEPTED = ".pdf,.png,.jpg,.jpeg,.mp4,.zip,.ai,.fig";

  const showError = (msg: string) => {
    setToastError(msg);
    setTimeout(() => setToastError(null), 3500);
  };

  const processFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: File[] = [];
    Array.from(fileList).forEach(f => {
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        showError(`"${f.name}" كبير بزاف (max ${MAX_SIZE_MB}MB)`);
        return;
      }
      if (files.length + newFiles.length >= MAX_FILES) {
        showError(`Max ${MAX_FILES} files allowed`);
        return;
      }
      newFiles.push(f);
    });
    if (newFiles.length > 0) onAdd(newFiles);
  }, [files, onAdd]);

  return (
    <div>
      {/* Toast */}
      <AnimatePresence>
        {toastError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-red-500/90 text-white text-sm px-4 py-3 rounded-xl shadow-lg"
          >
            {toastError}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drop Zone */}
      <motion.div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={e => { e.preventDefault(); setIsDragging(false); processFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        animate={{ scale: isDragging ? 1.01 : 1, borderColor: isDragging ? "#00E5FF" : "rgba(0,229,255,0.30)" }}
        className="border border-dashed rounded-xl p-8 text-center cursor-pointer transition-all"
        style={{ background: isDragging ? "rgba(0,229,255,0.04)" : "transparent" }}
      >
        <Upload size={32} className="text-[#00E5FF] mx-auto mb-3" />
        <p className="text-white/70 text-sm">اسحب الملفات هنا أو <span className="text-[#00E5FF] underline">كليك باش تختار</span></p>
        <p className="text-white/30 text-xs mt-2">PDF, PNG, JPG, MP4, ZIP — max {MAX_SIZE_MB}MB per file</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED}
          className="hidden"
          onChange={e => processFiles(e.target.files)}
        />
      </motion.div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#00E5FF]/5 border border-[#00E5FF]/15">
              <span className="text-[#00E5FF] text-xs truncate max-w-[200px]">{f.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-white/30 text-[10px]">{(f.size / 1024 / 1024).toFixed(1)}MB</span>
                <button type="button" onClick={() => onRemove(i)}
                  className="text-white/30 hover:text-red-400 transition-colors">
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Step 2 ────────────────────────────────────────────────────────────────────

const SERVICE_CARDS: SelectCardItem[] = [
  { id: "web", icon: Globe, title: "موقع ويب / Web Design", subtitle: "Landing page, portfolio, e-commerce" },
  { id: "ai", icon: Bot, title: "أتمتة بالذكاء الاصطناعي / AI", subtitle: "WhatsApp bots, lead systems, auto-booking" },
  { id: "brand", icon: Layers, title: "هوية بصرية / Brand Identity", subtitle: "Logo, colors, brand guidelines" },
  { id: "full", icon: Package, title: "الباكاج الكامل / Full Package", subtitle: "Web + AI + Brand — everything" },
];

const WEB_TYPE_CARDS: SelectCardItem[] = [
  { id: "simple", icon: Layout, title: "موقع عادي", subtitle: "simple, fast, clean" },
  { id: "animated", icon: Sparkles, title: "موقع بانيماشن", subtitle: "immersive, like this site", badge: "مثل هاد الموقع ⚡" },
  { id: "ecommerce", icon: ShoppingBag, title: "متجر إلكتروني", subtitle: "e-commerce, products" },
];

const PROBLEM_OPTIONS = [
  "مكيجيش كليان من الإنترنت",
  "الموقع ديالي قديم ومش professional",
  "ماعنديش وقت باش نرد على كل كليان",
  "ما عنديش برصة ديجيتال واضحة",
  "كنخسر كليان لمنافسين ديالي",
  "الحجوزات والمواعيد كتاخد وقت بزاف",
  "ماعنديش أتمتة لأي حاجة",
  "بغيت نوسع بزاف وما قادرش وحدي",
];

const TIMELINE_OPTIONS = ["🚀 ASAP", "📅 شهر 1–2", "🗓️ شهر 2–3", "🌙 مرن"];
const SITUATION_OPTIONS = ["لا، هاد أول موقع ليا", "عندي موقع قديم نبغي نبدلو", "عندي موقع نبغي نحسنو"];

function Step2({
  data, update
}: {
  data: ProjectFormData;
  update: (patch: Partial<ProjectFormData>) => void;
}) {
  const [shakeProblems, setShakeProblems] = useState(false);

  const toggleService = (id: string) => {
    update({
      services: data.services.includes(id)
        ? data.services.filter(s => s !== id)
        : [...data.services, id]
    });
  };

  const toggleProblem = (p: string) => {
    if (data.problems.includes(p)) {
      update({ problems: data.problems.filter(x => x !== p) });
    } else if (data.problems.length >= 3) {
      setShakeProblems(true);
      setTimeout(() => setShakeProblems(false), 500);
    } else {
      update({ problems: [...data.problems, p] });
    }
  };

  const addFiles = (newFiles: File[]) => {
    update({ files: [...data.files, ...newFiles] });
  };
  const removeFile = (i: number) => {
    update({ files: data.files.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="space-y-7">
      <div className="mb-4">
        <span className="text-[#00E5FF] font-mono text-[10px] tracking-widest">[ STEP 02 / 03 ]</span>
        <h3 className="text-xl font-bold text-white mt-1" dir="rtl">أخبرنا على مشروعك</h3>
        <p className="text-white/40 text-sm mt-1 leading-relaxed" dir="rtl">
          الأسئلة ديالنا كتساعدنا نبنيو ليك الحل الصح من البداية
        </p>
      </div>

      {/* Q1 — Services */}
      <div>
        <label className={labelCls} dir="rtl">أشنو تبغي نبنيو ليك؟ <span className="text-white/25">(ممكن تختار أكثر من واحد)</span></label>
        <MultiSelectCards items={SERVICE_CARDS} selected={data.services} onToggle={toggleService} />
      </div>

      {/* Q2 — Website type (conditional) */}
      {data.services.includes("web") && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
          <label className={labelCls} dir="rtl">أي نوع من المواقع؟</label>
          <RadioCards items={WEB_TYPE_CARDS} selected={data.websiteType} onSelect={v => update({ websiteType: v })} />
        </motion.div>
      )}

      {/* Q3 — Current situation */}
      <div>
        <label className={labelCls} dir="rtl">واش عندك موقع دابا؟</label>
        <PillToggle options={SITUATION_OPTIONS} selected={data.currentSituation} onSelect={v => update({ currentSituation: v })} />
      </div>

      {/* Q4 — Problems */}
      <div>
        <label className={labelCls} dir="rtl">شنو هي أكبر مشكلة كتعاني منها دابا؟ <span className="text-white/25">(max 3)</span></label>
        <motion.div
          className="flex flex-wrap gap-2"
          animate={{ x: shakeProblems ? [-6, 6, -6, 6, 0] : 0 }}
          transition={{ duration: 0.4 }}
        >
          {PROBLEM_OPTIONS.map(p => (
            <button
              key={p}
              type="button"
              onClick={() => toggleProblem(p)}
              dir="rtl"
              className={`px-3 py-1.5 rounded-full text-[12px] border transition-all duration-200 ${data.problems.includes(p)
                ? "bg-[#00E5FF] border-[#00E5FF] text-black font-semibold"
                : "border-[#00E5FF]/20 text-white/60 hover:border-[#00E5FF]/40"
                }`}
            >
              {p}
            </button>
          ))}
        </motion.div>
        {shakeProblems && <p className="text-[#00E5FF] text-[11px] mt-1.5 font-mono">اختار 3 فقط ⚠</p>}
      </div>

      {/* Q5 — Timeline */}
      <div>
        <label className={labelCls} dir="rtl">فوقاش بغيتو يكون جاهز؟</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {TIMELINE_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => update({ timeline: opt })}
              dir="rtl"
              className={`p-3 rounded-xl border text-center text-xs transition-all ${data.timeline === opt
                ? "border-[#00E5FF]/60 bg-[#00E5FF]/8 text-white font-semibold"
                : "border-[#00E5FF]/15 text-white/50 hover:border-[#00E5FF]/30"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Q6 — Inspiration */}
      <div>
        <label className={labelCls} dir="rtl">
          عندك مواقع أو brands أعجبوك؟ <span className="text-white/25">(optional)</span>
        </label>
        <textarea
          rows={3}
          className={inputCls + " resize-none"}
          dir="rtl"
          placeholder={"مثلاً: apple.com، أو كتعجبني مواقع الـ dark mode بانيماشن..."}
          value={data.inspiration}
          onChange={e => update({ inspiration: e.target.value })}
        />
      </div>

      {/* Q7 — Files */}
      <div>
        <label className={labelCls} dir="rtl">عندك ملفات تخص مشروعك؟ <span className="text-white/25">(optional)</span></label>
        <p className="text-white/30 text-[11px] mb-3" dir="rtl">Logo، صور، brand guidelines، mockups، أي حاجة تساعدنا نفهم مشروعك مزيان</p>
        <FileUploadZone files={data.files} onAdd={addFiles} onRemove={removeFile} />
      </div>

      {/* Q8 — Notes */}
      <div>
        <label className={labelCls} dir="rtl">
          أي معلومة زيادة تبغي تضيفها؟ <span className="text-white/25">(optional)</span>
        </label>
        <textarea
          rows={3}
          className={inputCls + " resize-none"}
          dir="rtl"
          placeholder="أي تفاصيل ما لقيتش مكانها فوق..."
          value={data.notes}
          onChange={e => update({ notes: e.target.value })}
        />
      </div>
    </div>
  );
}

// ─── Step 3 ────────────────────────────────────────────────────────────────────

const BUDGETS = [
  { id: "lt5k", label: "< 5,000 MAD", sub: "موقع بسيط / Landing page", bars: 1 },
  { id: "5-15k", label: "5,000 – 15,000 MAD", sub: "موقع premium أو automation بسيط", bars: 2 },
  { id: "15-30k", label: "15,000 – 30,000 MAD", sub: "موقع + AI automation", bars: 3, badge: "الأكثر شيوعاً" },
  { id: "gt30k", label: "30,000 MAD+", sub: "الباكاج الكامل — web + AI + brand", bars: 4 },
  { id: "discuss", label: "نتكلمو على الميزانية", sub: "مابغيتش نحدد دابا — نتناقشو أولاً", bars: 0 },
];

const CONTACT_METHODS = [
  { id: "whatsapp", label: "📱 WhatsApp" },
  { id: "email", label: "📧 Email" },
  { id: "call", label: "📞 مكالمة هاتفية" },
];

function MiniBarChart({ bars }: { bars: number }) {
  return (
    <div className="flex items-end gap-0.5 h-5">
      {[1, 2, 3, 4].map(b => (
        <div
          key={b}
          className="w-1.5 rounded-sm transition-all"
          style={{
            height: `${b * 25}%`,
            backgroundColor: b <= bars ? "#00E5FF" : "rgba(0,229,255,0.15)",
          }}
        />
      ))}
    </div>
  );
}

const SERVICE_LABELS: Record<string, string> = {
  web: "موقع ويب", ai: "AI Automation", brand: "هوية بصرية", full: "الباكاج الكامل"
};

function Step3({
  data, update, onEdit
}: {
  data: ProjectFormData;
  update: (patch: Partial<ProjectFormData>) => void;
  onEdit: () => void;
}) {
  return (
    <div className="space-y-7">
      <div className="mb-4">
        <span className="text-[#00E5FF] font-mono text-[10px] tracking-widest">[ STEP 03 / 03 ]</span>
        <h3 className="text-xl font-bold text-white mt-1" dir="rtl">الميزانية والتأكيد</h3>
        <p className="text-white/40 text-sm mt-1" dir="rtl">
          الخطوة الأخيرة — وعدنا نجاوبك في أقل من 24 ساعة
        </p>
      </div>

      {/* Budget Selector */}
      <div>
        <label className={labelCls} dir="rtl">شنو هو ميزانيتك التقريبية؟</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {BUDGETS.map(b => (
            <motion.button
              key={b.id}
              type="button"
              onClick={() => update({ budget: b.id })}
              whileHover={{ scale: 1.01 }}
              animate={{ scale: data.budget === b.id ? 1.01 : 1 }}
              className={`relative p-4 rounded-xl border text-left transition-all duration-200 ${data.budget === b.id
                ? "border-[#00E5FF]/60 bg-[#00E5FF]/8 shadow-[0_0_20px_rgba(0,229,255,0.10)]"
                : "border-[#00E5FF]/15 bg-[#00E5FF]/3 hover:border-[#00E5FF]/30"
                } ${b.id === "discuss" ? "md:col-span-2" : ""}`}
            >
              {data.budget === b.id && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#00E5FF] flex items-center justify-center">
                  <Check size={11} className="text-black" />
                </div>
              )}
              {b.badge && (
                <span className="absolute top-2 left-2 text-[9px] font-mono bg-[#00E5FF] text-black px-2 py-0.5 rounded-full">
                  {b.badge}
                </span>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white text-sm">{b.label}</span>
                {b.bars > 0 ? <MiniBarChart bars={b.bars} /> : <MsgCircle size={18} className="text-[#00E5FF]" />}
              </div>
              <p className="text-white/40 text-xs" dir="rtl">{b.sub}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Contact Method */}
      <div>
        <label className={labelCls} dir="rtl">كيفاش تحب نتواصلو معاك؟</label>
        <div className="flex flex-wrap gap-2">
          {CONTACT_METHODS.map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => update({ contactMethod: m.id })}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${data.contactMethod === m.id
                ? "bg-[#00E5FF] border-[#00E5FF] text-black font-semibold"
                : "border-[#00E5FF]/20 text-white/60 hover:border-[#00E5FF]/40"
                }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="rounded-xl border border-[#00E5FF]/15 bg-[#00E5FF]/3 p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#00E5FF] font-mono text-[10px] tracking-widest">[ ملخص الطلب ديالك ]</span>
          <button type="button" onClick={onEdit} className="text-[#00E5FF] text-[11px] hover:underline">
            ← تعديل
          </button>
        </div>
        <div className="space-y-2 text-sm" dir="rtl">
          {data.name && <div className="flex justify-between"><span className="text-white/40">الاسم</span><span className="text-white">{data.name}</span></div>}
          {data.services.length > 0 && (
            <div className="flex justify-between">
              <span className="text-white/40">الخدمات</span>
              <span className="text-white">{data.services.map(s => SERVICE_LABELS[s] || s).join("، ")}</span>
            </div>
          )}
          {data.websiteType && <div className="flex justify-between"><span className="text-white/40">نوع الموقع</span><span className="text-white">{data.websiteType}</span></div>}
          {data.timeline && <div className="flex justify-between"><span className="text-white/40">الجدول الزمني</span><span className="text-white">{data.timeline}</span></div>}
          {data.budget && <div className="flex justify-between"><span className="text-white/40">الميزانية</span><span className="text-white">{BUDGETS.find(b => b.id === data.budget)?.label}</span></div>}
          <div className="flex justify-between">
            <span className="text-white/40">الملفات</span>
            <span className="text-white">{data.files.length > 0 ? `${data.files.length} ملف` : "لا"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Success Panel ─────────────────────────────────────────────────────────────

function SuccessPanel({
  referenceId, contactMethod
}: {
  referenceId: string;
  contactMethod: string;
}) {
  const contactLabels: Record<string, string> = {
    whatsapp: "WhatsApp", email: "Email", call: "هاتفياً"
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="text-center py-12 px-4 relative overflow-hidden"
    >
      {/* Confetti particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            backgroundColor: i % 2 === 0 ? "#00E5FF" : "#ffffff",
          }}
          animate={{
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 300,
            opacity: [1, 1, 0],
            scale: [1, 1.2, 0],
          }}
          transition={{ duration: 1 + Math.random() * 0.8, ease: "easeOut" }}
        />
      ))}

      {/* Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/30 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 size={40} className="text-[#00E5FF]" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-bold text-white mb-3"
        dir="rtl"
      >
        وصل الطلب ديالك! 🚀
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-white/50 text-sm mb-6"
        dir="rtl"
      >
        غادي نتواصلو معاك على <span className="text-[#00E5FF]">{contactLabels[contactMethod] || "WhatsApp"}</span> في أقل من 24 ساعة
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="inline-block bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-xl px-6 py-3 mb-8"
      >
        <p className="text-[10px] text-white/40 mb-1 font-mono">رقم طلبك</p>
        <p className="text-[#00E5FF] font-mono font-bold text-lg tracking-widest">{referenceId}</p>
      </motion.div>

      <motion.a
        href="#portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="inline-block px-8 py-3 border border-[#00E5FF]/30 text-[#00E5FF] rounded-xl text-sm hover:bg-[#00E5FF]/10 transition-all"
      >
        متابعة → استعرض مشاريعنا
      </motion.a>
    </motion.div>
  );
}

// ─── Main ContactSection ───────────────────────────────────────────────────────

const statsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
};
const statItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const TITLE_LETTERS = "Together".split("");
const contactItems = [
  { Icon: Mail, label: "Email us", value: "contact@vortexdigital.ma", href: "mailto:contact@vortexdigital.ma" },
  { Icon: MessageCircle, label: "WhatsApp", value: "+212 6XX-XXXXXX", href: "#" },
  { Icon: MapPin, label: "Location", value: "Morocco — Available Worldwide", href: null },
];

const ContactSection = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<ProjectFormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [successData, setSuccessData] = useState<{ referenceId: string } | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const step1Ref = useRef<any>(null);

  // ── Scroll spring ──────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const s = useSpring(scrollYProgress, { stiffness: 50, damping: 16, restDelta: 0.001 });

  // Header
  const labelO  = useTransform(s, [0.04, 0.14], [0, 1]);
  const labelX  = useTransform(s, [0.04, 0.14], [-32, 0]);
  const titleO  = useTransform(s, [0.08, 0.19], [0, 1]);
  const titleY  = useTransform(s, [0.08, 0.19], [50, 0]);
  const subO    = useTransform(s, [0.13, 0.22], [0, 1]);

  // Left col parallax
  const leftY   = useTransform(s, [0.1, 0.9], [30, -20]);

  // Right card parallax (slightly slower = depth)
  const rightY  = useTransform(s, [0.1, 0.9], [60, -10]);

  // ── Form logic ─────────────────────────────────────────────
  const update = useCallback((patch: Partial<ProjectFormData>) => {
    setFormData(prev => ({ ...prev, ...patch }));
  }, []);

  const goTo = (nextStep: number) => {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  const handleNext = () => {
    if (step === 1) {
      const validate = (Step1 as any).__validate;
      if (validate && !validate()) return;
    }
    goTo(step + 1);
  };

  const handleBack = () => goTo(step - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitProgress(0);
    const prog = setInterval(() => {
      setSubmitProgress(p => Math.min(p + 12, 90));
    }, 200);
    try {
      const result = await sendProjectForm({
        ...formData,
        filesMeta: formData.files.map(f => ({ name: f.name, size: f.size })),
      } as any);
      clearInterval(prog);
      setSubmitProgress(100);
      setTimeout(() => setSuccessData({ referenceId: result.referenceId }), 400);
    } catch {
      clearInterval(prog);
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 md:px-20 relative overflow-hidden">

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent pointer-events-none" />

      {/* Ambient orbs */}
      <div className="absolute -top-60 -right-60 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,229,255,0.055) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-60 -left-60 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)" }} />
      <div className="absolute top-[45%] left-0 right-0 h-[120px] pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.04), transparent)", filter: "blur(20px)" }} />
      <div className="absolute top-[15%] right-[-5%] w-[580px] h-[580px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,229,255,0.09) 0%, rgba(0,229,255,0.03) 40%, transparent 70%)" }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,229,255,0.13) 1px, transparent 1px)", backgroundSize: "44px 44px", opacity: 0.35, maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div className="mb-20">
          {/* Label */}
          <motion.p
            style={{ opacity: labelO, x: labelX }}
            className="text-[#00E5FF] font-mono text-xs tracking-[0.3em] uppercase mb-4"
          >
            [ START YOUR PROJECT ]
          </motion.p>

          {/* "Let's Build" */}
          <motion.div style={{ opacity: titleO, y: titleY }}>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
              Let&apos;s Build
            </h2>
          </motion.div>

          {/* "Together" — letter by letter */}
          <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
            {TITLE_LETTERS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.18 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: "inline-block",
                  background: "linear-gradient(90deg, #ffffff 0%, #00E5FF 100%)",
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
            className="text-zinc-500 text-xl md:text-2xl text-right"
          >
            خبرنا على مشروعك — ونجاوبك في أقل من 24 ساعة
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Left Column: Contact Info ── */}
          <motion.div style={{ y: leftY }} className="flex flex-col">

            {/* Intro paragraph */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="border-l-2 border-[#00E5FF]/25 pl-6 mb-12"
            >
              <p className="text-zinc-400 text-lg leading-[1.85]">
                Whether you need a premium website, an AI automation system, or a complete digital transformation — we&apos;re ready. No pressure. Just results.
              </p>
            </motion.div>

            {/* Contact items — staggered from left */}
            <div className="mb-12">
              {contactItems.map(({ Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-5 group py-6 border-b border-white/[0.05]"
                >
                  <div className="relative shrink-0 w-14 h-14">
                    <motion.div
                      className="absolute inset-0 rounded-full border border-[#00E5FF]/10 pointer-events-none"
                      style={{ scale: 1.45 }}
                      whileHover={{ scale: 1.65 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-[#00E5FF]/05 pointer-events-none"
                      style={{ scale: 1.9 }}
                      whileHover={{ scale: 2.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="w-14 h-14 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-[0_0_14px_rgba(0,229,255,0.18)] group-hover:shadow-[0_0_32px_rgba(0,229,255,0.5)] group-hover:bg-[#00E5FF]/16 transition-all duration-300">
                      <Icon size={22} />
                    </div>
                  </div>
                  <div>
                    <p className="text-white/45 text-[10px] font-mono tracking-[0.22em] uppercase mb-1.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-white text-base font-bold hover:text-[#00E5FF] transition-colors duration-200">{value}</a>
                    ) : (
                      <p className="text-white text-base font-bold">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto">
              {/* Response time badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex mb-10"
              >
                <div className="p-px rounded-full" style={{ background: "linear-gradient(90deg, rgba(0,229,255,0.45), rgba(123,97,255,0.28), rgba(0,229,255,0.18))" }}>
                  <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#00050A]">
                    <div className="relative w-2 h-2 shrink-0">
                      <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-65" />
                      <div className="relative w-2 h-2 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[#00E5FF] text-[10px] font-mono tracking-widest uppercase">
                      Response time: &lt; 24 hours
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Social icons — staggered float up */}
              <div className="flex gap-3">
                {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="w-12 h-12 rounded-xl border border-white/8 bg-white/[0.02] flex items-center justify-center text-zinc-500 hover:text-[#00E5FF] hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 hover:shadow-[0_0_20px_rgba(0,229,255,0.12)] transition-colors duration-300"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right Column: Premium CTA Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            style={{ y: rightY, willChange: "transform, opacity, filter" }}
            className="relative flex flex-col"
          >
            {/* Gradient-border wrapper */}
            <div
              className="p-px rounded-3xl h-full"
              style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.38) 0%, rgba(123,97,255,0.22) 45%, rgba(0,229,255,0.10) 100%)" }}
            >
              {/* Glass card */}
              <div
                className="relative rounded-[23px] flex flex-col h-full overflow-hidden p-8 md:p-10"
                style={{
                  background: "linear-gradient(145deg, rgba(0,229,255,0.045) 0%, rgba(0,5,10,0.94) 55%, rgba(123,97,255,0.025) 100%)",
                  backdropFilter: "blur(40px)",
                  WebkitBackdropFilter: "blur(40px)",
                  boxShadow: "0 0 90px rgba(0,229,255,0.09), 0 0 180px rgba(0,229,255,0.04), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 0 80px rgba(0,229,255,0.015)",
                }}
              >
                {/* Internal ambient glows */}
                <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />
                <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(123,97,255,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />

                {/* Horizontal shimmer line */}
                <div className="absolute left-10 right-10 h-px pointer-events-none" style={{ top: "36%", background: "linear-gradient(to right, transparent, rgba(0,229,255,0.14), transparent)" }} />

                {/* Aerospace corner marks — targeting reticle */}
                {/* top-left */}
                <div className="absolute top-4 left-4 pointer-events-none">
                  <div className="absolute top-0 left-0 w-7 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, #00E5FF, transparent)", boxShadow: "0 0 6px rgba(0,229,255,0.6)" }} />
                  <div className="absolute top-0 left-0 w-[2px] h-7 rounded-full" style={{ background: "linear-gradient(to bottom, #00E5FF, transparent)", boxShadow: "0 0 6px rgba(0,229,255,0.6)" }} />
                </div>
                {/* top-right */}
                <div className="absolute top-4 right-4 pointer-events-none">
                  <div className="absolute top-0 right-0 w-7 h-[2px] rounded-full" style={{ background: "linear-gradient(to left, #00E5FF, transparent)", boxShadow: "0 0 6px rgba(0,229,255,0.6)" }} />
                  <div className="absolute top-0 right-0 w-[2px] h-7 rounded-full" style={{ background: "linear-gradient(to bottom, #00E5FF, transparent)", boxShadow: "0 0 6px rgba(0,229,255,0.6)" }} />
                </div>
                {/* bottom-left */}
                <div className="absolute bottom-4 left-4 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-7 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, #00E5FF, transparent)", boxShadow: "0 0 6px rgba(0,229,255,0.6)" }} />
                  <div className="absolute bottom-0 left-0 w-[2px] h-7 rounded-full" style={{ background: "linear-gradient(to top, #00E5FF, transparent)", boxShadow: "0 0 6px rgba(0,229,255,0.6)" }} />
                </div>
                {/* bottom-right */}
                <div className="absolute bottom-4 right-4 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-7 h-[2px] rounded-full" style={{ background: "linear-gradient(to left, #00E5FF, transparent)", boxShadow: "0 0 6px rgba(0,229,255,0.6)" }} />
                  <div className="absolute bottom-0 right-0 w-[2px] h-7 rounded-full" style={{ background: "linear-gradient(to top, #00E5FF, transparent)", boxShadow: "0 0 6px rgba(0,229,255,0.6)" }} />
                </div>

                {/* Icon with orbital rings */}
                <div className="relative mb-8 w-20 h-20 shrink-0">
                  <div
                    className="absolute rounded-full border border-dashed border-[#00E5FF]/22 pointer-events-none"
                    style={{ inset: "-10px", animation: "contactOrbit 14s linear infinite" }}
                  />
                  <div
                    className="absolute rounded-full border border-[#00E5FF]/9 pointer-events-none"
                    style={{ inset: "-22px", animation: "contactOrbit 22s linear infinite reverse" }}
                  />
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,229,255,0.14), rgba(123,97,255,0.09))",
                      border: "1px solid rgba(0,229,255,0.28)",
                      boxShadow: "0 0 32px rgba(0,229,255,0.18), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    <span className="text-3xl" style={{ filter: "drop-shadow(0 0 14px rgba(0,229,255,0.9))" }}>🚀</span>
                  </div>
                </div>

                {/* Heading */}
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3" dir="rtl">
                  ابدأ مشروعك<br />
                  <span className="text-[#00E5FF]">في 3 خطوات</span>
                </h3>
                <p className="text-white/50 text-lg mb-8 leading-relaxed" dir="rtl">
                  خبرنا على مشروعك من خلال استمارة سريعة ومنظمة — ونجاوبك في أقل من 24 ساعة
                </p>

                {/* Stats grid */}
                <motion.div
                  className="grid grid-cols-3 gap-3 mb-10"
                  variants={statsContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    { stat: "< 24h", label: "وقت الرد" },
                    { stat: "3", label: "خطوات فقط" },
                    { stat: "100%", label: "مجاني" },
                  ].map(s => (
                    <motion.div
                      key={s.stat}
                      variants={statItem}
                      className="relative text-center py-5 px-3 rounded-xl overflow-hidden"
                      style={{
                        background: "linear-gradient(to bottom, rgba(0,229,255,0.12), rgba(0,229,255,0.03))",
                        border: "1px solid rgba(0,229,255,0.28)",
                        boxShadow: "0 0 20px rgba(0,229,255,0.08), inset 0 0 20px rgba(0,229,255,0.04)",
                      }}
                    >
                      {/* Full-width top accent bar */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF]/70 to-transparent" />
                      <p className="text-[#00E5FF] text-3xl font-black font-mono tracking-tight" style={{ textShadow: "0 0 20px rgba(0,229,255,0.6)" }}>{s.stat}</p>
                      <p className="text-white/55 text-[11px] mt-1.5 font-mono" dir="rtl">{s.label}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Steps — vertical timeline */}
                <div className="mb-10">
                  {[
                    { n: "01", label: "معلوماتك الأساسية" },
                    { n: "02", label: "تفاصيل مشروعك" },
                    { n: "03", label: "الميزانية والتواصل" },
                  ].map((s, i, arr) => (
                    <div key={s.n} className="flex items-start gap-4" dir="rtl">
                      <div className="flex flex-col items-center shrink-0">
                        <div
                          className="w-9 h-9 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold"
                          style={{
                            borderColor: "#00E5FF",
                            backgroundColor: i === arr.length - 1 ? "rgba(0,229,255,0.18)" : "rgba(0,229,255,0.07)",
                            color: "#00E5FF",
                            boxShadow: i === arr.length - 1
                              ? "0 0 22px rgba(0,229,255,0.55), inset 0 0 10px rgba(0,229,255,0.15)"
                              : "0 0 10px rgba(0,229,255,0.28)",
                            textShadow: "0 0 8px rgba(0,229,255,0.8)",
                          }}
                        >
                          {s.n}
                        </div>
                        {i < arr.length - 1 && (
                          <div className="w-[2px] h-8 mt-1 mb-1 rounded-full" style={{ background: "linear-gradient(to bottom, rgba(0,229,255,0.45), rgba(0,229,255,0.08))" }} />
                        )}
                      </div>
                      <p className="text-white/75 text-sm pt-2 pb-4 font-medium">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="mt-auto space-y-3">

                  {/* Primary — "Start Project" */}
                  <motion.a
                    href="/start-project"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    dir="rtl"
                    className="group relative flex items-center justify-center w-full h-[60px] rounded-2xl overflow-hidden font-bold text-base text-black tracking-wide"
                    style={{
                      background: "#00E5FF",
                      boxShadow: "0 0 32px rgba(0,229,255,0.48), 0 0 90px rgba(0,229,255,0.18), inset 0 1px 0 rgba(255,255,255,0.35)",
                    }}
                  >
                    {/* Shine sweep on hover */}
                    <span className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                    <span className="relative z-10">ابدأ الاستمارة ← [ Start Project ]</span>
                  </motion.a>

                  {/* Secondary — WhatsApp with gradient border */}
                  <div
                    className="p-px rounded-2xl"
                    style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.28), rgba(123,97,255,0.18), rgba(0,229,255,0.08))" }}
                  >
                    <a
                      href="#"
                      dir="rtl"
                      className="flex items-center justify-center gap-3 w-full h-[52px] rounded-[15px] text-[#00E5FF] text-sm font-medium hover:bg-[#00E5FF]/5 transition-all duration-300 bg-[#00050A]/88"
                    >
                      <span className="relative flex items-center justify-center w-2.5 h-2.5 shrink-0">
                        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-55" />
                        <span className="relative w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.85)]" />
                      </span>
                      📱 تواصل على WhatsApp بدل ذلك
                    </a>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        @keyframes contactOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
