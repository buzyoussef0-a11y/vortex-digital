"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Upload, X, FileText, Image, Film, ChevronDown, Search, Plus, Pencil } from "lucide-react";
import {
  ProjectFormData, ROLE_OPTIONS, ROLE_TO_SEGMENT, WEBSITE_TYPES, TIMELINE_CARDS,
  GENERAL_SERVICE_CARDS, GENERAL_PROBLEMS, GENERAL_SITUATION,
  DENTAL_SERVICE_CARDS, DENTAL_PROBLEMS, DENTAL_SITUATION,
  BRAND_SERVICE_CARDS, BRAND_PROBLEMS, BRAND_SITUATION,
  STARTUP_SERVICE_CARDS, STARTUP_PROBLEMS, STARTUP_SITUATION,
  SEGMENT_STEP2_HEADER, ALL_SERVICES,
} from "./types";
import * as LucideIcons from "lucide-react";

// ─── Shared Input Styles ──────────────────────────────────────────────────────

export const inputCls =
  "w-full h-14 bg-[#00E5FF]/[0.04] border border-[#00E5FF]/20 rounded-xl px-5 text-white text-base placeholder-white/30 focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_0_3px_rgba(0,229,255,0.08)] transition-all duration-200";
export const labelCls = "block text-[#00E5FF] font-mono text-xs tracking-widest mb-1";
export const subLabelCls = "text-white/50 text-sm mb-4";
export const errorCls = "text-red-400 text-sm mt-1";
export const qNumCls = "text-[#00E5FF] font-mono text-xs mb-1";


// ─── Service Row (shared) ─────────────────────────────────────────────────────

function ServiceRow({ service, sel, onToggle }: {
  service: { id: string; emoji: string; label: string; labelEn: string };
  sel: boolean;
  onToggle: () => void;
}) {
  return (
    <button type="button" onClick={onToggle}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${sel ? "bg-[#00E5FF]/10" : "hover:bg-white/[0.04]"}`}
    >
      <span className="text-lg shrink-0 w-7 text-center">{service.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium leading-tight ${sel ? "text-[#00E5FF]" : "text-white/85"}`} dir="rtl">{service.label}</p>
        <p className="text-white/30 text-[11px]">{service.labelEn}</p>
      </div>
      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${sel ? "bg-[#00E5FF] border-[#00E5FF]" : "border-white/20"}`}>
        {sel && <Check size={10} className="text-black" strokeWidth={3} />}
      </div>
    </button>
  );
}

// ─── Custom Role Input ────────────────────────────────────────────────────────

function CustomRoleInput({ onSubmit }: { onSubmit: (v: string) => void }) {
  const [val, setVal] = useState("");
  const submit = () => { const v = val.trim(); if (v) { onSubmit(v); setVal(""); } };
  return (
    <div className="flex flex-col gap-2">
      <textarea
        rows={3}
        value={val}
        onChange={e => setVal(e.target.value)}
        placeholder="مثلاً: مصمم داخلي، مدرب يوغا..."
        dir="rtl"
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white text-xs placeholder-white/25 outline-none focus:border-[#00E5FF]/40 transition-colors resize-none leading-relaxed"
      />
      <button type="button" onClick={submit}
        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono hover:bg-[#00E5FF]/20 transition-colors"
      >
        <Plus size={12} />
        تأكيد
      </button>
    </div>
  );
}

// ─── Role Dropdown ────────────────────────────────────────────────────────────

function RoleDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const selected = value?.startsWith("custom:")
    ? { emoji: "✏️", label: value.replace("custom:", ""), sub: "مهنة مخصصة" }
    : ROLE_OPTIONS.find(r => r.id === value);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const q = search.toLowerCase();
  const filtered = ROLE_OPTIONS.filter(
    r => !q || r.label.toLowerCase().includes(q) || r.sub.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
  );
  const categories = [...new Set(filtered.map(r => r.category))];

  return (
    <div ref={ref} className="relative mt-2">
      {/* Trigger */}
      <button type="button" onClick={() => setOpen(o => !o)}
        className={`w-full min-h-[56px] px-5 py-3 rounded-xl border flex items-center justify-between gap-3 transition-all duration-200 ${
          open ? "border-[#00E5FF] shadow-[0_0_0_3px_rgba(0,229,255,0.08)] bg-[#00E5FF]/[0.04]"
               : "border-[#00E5FF]/20 bg-[#00E5FF]/[0.04] hover:border-[#00E5FF]/40"}`}
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00E5FF]/15 flex items-center justify-center text-lg shrink-0">{selected.emoji}</div>
            <div className="text-left">
              <p className="text-white text-sm font-semibold leading-tight" dir="rtl">{selected.label}</p>
              {selected.sub && <p className="text-white/35 text-[11px]">{selected.sub}</p>}
            </div>
          </div>
        ) : (
          <span className="text-white/30 text-sm">اختر مهنتك / دورك...</span>
        )}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-[#00E5FF]/60 shrink-0" />
        </motion.div>
      </button>

      {/* Dropdown panel — two columns */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full mt-2 left-0 right-0 z-50 rounded-2xl border border-[#00E5FF]/20 bg-[#00060E] shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden flex"
          >
            {/* LEFT — searchable list */}
            <div className="flex-1 flex flex-col min-w-0 border-r border-white/5">
              {/* Search bar */}
              <div className="p-3 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-2 bg-white/[0.04] rounded-xl px-3 py-2 border border-white/8">
                  <Search size={13} className="text-white/40 shrink-0" />
                  <input autoFocus type="text" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="ابحث... Search..."
                    className="flex-1 bg-transparent text-white text-sm placeholder-white/30 outline-none" dir="rtl" />
                  {search && (
                    <button type="button" onClick={() => setSearch("")} className="text-white/30 hover:text-white transition-colors">
                      <X size={11} />
                    </button>
                  )}
                </div>
              </div>

              {/* Role list */}
              <div
                data-lenis-prevent
                className="overflow-y-auto p-2"
                style={{ maxHeight: "300px" }}
              >
                {categories.length === 0 ? (
                  <p className="text-white/30 text-xs text-center py-6" dir="rtl">ما لقينا نتيجة</p>
                ) : categories.map(cat => (
                  <div key={cat} className="mb-3">
                    <p className="text-white/25 text-[9px] font-mono uppercase tracking-widest px-2 py-1">{cat}</p>
                    {filtered.filter(r => r.category === cat).map(r => {
                      const sel = r.id === value;
                      return (
                        <button key={r.id} type="button"
                          onClick={() => { onChange(r.id); setOpen(false); setSearch(""); }}
                          className={`w-full flex items-center gap-2 px-2 py-2 rounded-xl text-left transition-all duration-150 ${sel ? "bg-[#00E5FF]/10" : "hover:bg-white/[0.04]"}`}
                        >
                          <span className="text-base shrink-0 w-6 text-center">{r.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-medium leading-tight truncate ${sel ? "text-[#00E5FF]" : "text-white/85"}`} dir="rtl">{r.label}</p>
                          </div>
                          {sel && (
                            <div className="w-4 h-4 rounded-full bg-[#00E5FF] flex items-center justify-center shrink-0">
                              <Check size={8} className="text-black" strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — custom role input */}
            <div className="w-[200px] shrink-0 flex flex-col p-4 gap-3 justify-start">
              <div>
                <p className="text-[#00E5FF] text-[10px] font-mono uppercase tracking-widest mb-1">ما لقيتيش مهنتك؟</p>
                <p className="text-white/30 text-[11px] leading-snug" dir="rtl">كتب مهنتك هنا وغادي نتواصلو معاك مع خدمات مناسبة ليك</p>
              </div>
              <CustomRoleInput onSubmit={customRole => { onChange(`custom:${customRole}`); setOpen(false); }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Service Dropdown ─────────────────────────────────────────────────────────

function ServiceDropdown({ selected, onChange, role }: {
  selected: string[];
  onChange: (ids: string[]) => void;
  role?: string;
}) {
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const q = search.toLowerCase();

  // Split into recommended (role match) and others
  const isRecommended = (s: typeof ALL_SERVICES[0]) =>
    role && s.roles.length > 0 && s.roles.includes(role);

  const baseFiltered = ALL_SERVICES.filter(
    s => !q || s.label.toLowerCase().includes(q) || s.labelEn.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
  );

  const recommended = !q && role ? baseFiltered.filter(isRecommended) : [];
  const others = baseFiltered.filter(s => !recommended.includes(s));

  const categories = [...new Set(others.map(s => s.category))];

  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);
  };

  const selectedLabels = selected.map(id => ALL_SERVICES.find(s => s.id === id)?.label ?? id);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full min-h-[56px] px-5 py-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all duration-200 ${
          open
            ? "border-[#00E5FF] shadow-[0_0_0_3px_rgba(0,229,255,0.08)] bg-[#00E5FF]/[0.04]"
            : "border-[#00E5FF]/20 bg-[#00E5FF]/[0.04] hover:border-[#00E5FF]/40"
        }`}
      >
        <div className="flex flex-wrap gap-1.5 flex-1">
          {selectedLabels.length === 0 ? (
            <span className="text-white/30 text-sm">اختر الخدمات اللي تبغيها...</span>
          ) : (
            selectedLabels.map((label, i) => (
              <span key={i} className="flex items-center gap-1 bg-[#00E5FF]/15 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono px-2.5 py-1 rounded-full">
                {label}
                <button type="button" onClick={e => { e.stopPropagation(); onChange(selected.filter((_, idx) => idx !== i)); }}
                  className="hover:text-white transition-colors ml-0.5">
                  <X size={10} />
                </button>
              </span>
            ))
          )}
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-[#00E5FF]/60 shrink-0" />
        </motion.div>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full mt-2 left-0 right-0 z-50 rounded-2xl border border-[#00E5FF]/20 bg-[#00060E] shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden"
          >
            {/* Search bar */}
            <div className="p-3 border-b border-white/5">
              <div className="flex items-center gap-2 bg-white/[0.04] rounded-xl px-4 py-2.5 border border-white/8">
                <Search size={14} className="text-white/40 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="ابحث عن خدمة... Search service..."
                  className="flex-1 bg-transparent text-white text-sm placeholder-white/30 outline-none"
                  dir="rtl"
                />
                {search && (
                  <button type="button" onClick={() => setSearch("")} className="text-white/30 hover:text-white transition-colors">
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Services list */}
            <div data-lenis-prevent className="max-h-[340px] overflow-y-auto overscroll-contain p-2">
              {recommended.length === 0 && categories.length === 0 ? (
                <p className="text-white/30 text-sm text-center py-6" dir="rtl">ما لقينا نتيجة</p>
              ) : (
                <>
                  {/* Recommended for this role */}
                  {recommended.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center gap-2 px-3 py-1">
                        <span className="text-[10px] font-mono text-[#00E5FF]/70 uppercase tracking-widest">⚡ مقترح لمهنتك</span>
                      </div>
                      {recommended.map(service => <ServiceRow key={service.id} service={service} sel={selected.includes(service.id)} onToggle={() => toggle(service.id)} />)}
                      {categories.length > 0 && <div className="my-2 border-t border-white/5" />}
                    </div>
                  )}
                  {/* All other services by category */}
                  {categories.map(cat => (
                    <div key={cat} className="mb-3">
                      <p className="text-white/25 text-[10px] font-mono uppercase tracking-widest px-3 py-1">{cat}</p>
                      {others.filter(s => s.category === cat).map(service => (
                        <ServiceRow key={service.id} service={service} sel={selected.includes(service.id)} onToggle={() => toggle(service.id)} />
                      ))}
                    </div>
                  ))}
                </>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

      {/* Q4 Role dropdown */}
      <div>
        <p className={qNumCls}>Q4 —</p>
        <label className={labelCls} dir="rtl">مهنتك / دورك</label>
        {errors.role && <p className={errorCls} dir="rtl">{errors.role}</p>}
        <RoleDropdown value={data.role} onChange={role => update({ role })} />
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
          dir="rtl">التالي — التواصل ←</motion.button>
      </div>

    </div>
  );
}
