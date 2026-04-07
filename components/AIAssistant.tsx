"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Bot, Minimize2 } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────── */

interface Message {
  role: "user" | "assistant";
  text: string;
  time: string;
}

/* ─── Helpers ────────────────────────────────────────────── */

function timestamp() {
  return new Date().toLocaleTimeString("ar-MA", { hour: "2-digit", minute: "2-digit" });
}

const WELCOME: Message = {
  role: "assistant",
  text: "مرحبًا! أنا مساعد Vortex Digital الذكي 🤖\nكيف يمكنني مساعدتك اليوم؟ يمكنني الإجابة على أسئلتك حول خدماتنا، أسعارنا، أو مساعدتك في حجز استشارة مجانية.",
  time: timestamp(),
};

/* ─── AI Assistant Widget ────────────────────────────────── */

export default function AIAssistant() {
  const [visible,  setVisible]  = useState(false);
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [unread,   setUnread]   = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  /* Show after scroll */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Auto-scroll to bottom on new message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Focus input when chat opens */
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  /* ── Send message ── */
  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", text, time: timestamp() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
        || "https://n8n.srv1521649.hstgr.cloud/webhook/vortex-ai-assistant";

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: "vortex-widget" }),
      });
      const data = await res.json();
      const reply = data?.reply ?? data?.text ?? data?.message ?? "عذرًا، حدث خطأ. حاول مجددًا.";
      const botMsg: Message = { role: "assistant", text: reply, time: timestamp() };
      setMessages(prev => [...prev, botMsg]);
      if (!open) setUnread(n => n + 1);
    } catch {
      const errMsg: Message = {
        role: "assistant",
        text: "عذرًا، حدث خطأ في الاتصال. تواصل معنا مباشرة عبر واتساب.",
        time: timestamp(),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  /* ── Suggested prompts ── */
  const suggestions = [
    "ما هي خدماتكم؟",
    "كم تكلف المشاريع؟",
    "احجز استشارة مجانية",
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="ai-widget"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-3"
        >
          {/* ── Chat window ── */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-[340px] md:w-[390px] rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: "linear-gradient(160deg, rgba(0,10,22,0.98) 0%, rgba(0,5,14,0.99) 100%)",
                  border: "1px solid rgba(0,229,255,0.18)",
                  boxShadow: "0 0 80px rgba(0,229,255,0.1), 0 30px 80px rgba(0,0,0,0.7)",
                  backdropFilter: "blur(32px)",
                  maxHeight: "540px",
                }}
              >
                {/* ── Header ── */}
                <div
                  className="relative flex items-center justify-between px-5 py-3.5 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,229,255,0.07) 0%, rgba(0,5,14,0) 100%)",
                    borderBottom: "1px solid rgba(0,229,255,0.08)",
                  }}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent" />

                  <div className="flex items-center gap-3">
                    {/* Avatar with pulse ring */}
                    <div className="relative shrink-0">
                      <motion.div
                        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-xl"
                        style={{ border: "1px solid rgba(0,229,255,0.6)" }}
                      />
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(0,229,255,0.07))",
                          border: "1px solid rgba(0,229,255,0.38)",
                          boxShadow: "0 0 18px rgba(0,229,255,0.22)",
                        }}
                      >
                        <Bot size={17} className="text-[#00E5FF]" />
                      </div>
                      {/* Online dot */}
                      <motion.span
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400"
                        style={{ boxShadow: "0 0 8px rgba(52,211,153,0.9)" }}
                      />
                    </div>

                    <div>
                      <p className="text-white font-bold text-sm leading-tight tracking-wide">Vortex AI</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 4px rgba(52,211,153,0.8)" }} />
                        <p className="text-[#00E5FF]/70 text-[9px] font-mono tracking-[0.15em]">
                          متصل الآن · يرد في ثوانٍ
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setOpen(false)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 group"
                    style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
                    aria-label="Close"
                  >
                    <X size={13} className="text-white/35 group-hover:text-white transition-colors" />
                  </button>
                </div>

                {/* ── Messages ── */}
                <div
                  className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0"
                  style={{
                    maxHeight: "320px",
                    scrollbarWidth: "none",
                    overscrollBehavior: "contain",
                  }}
                  onWheel={e => e.stopPropagation()}
                  onTouchMove={e => e.stopPropagation()}
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
                    >
                      {/* AI avatar mini */}
                      {msg.role === "assistant" && (
                        <div className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mb-4"
                          style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)" }}>
                          <Bot size={12} className="text-[#00E5FF]" />
                        </div>
                      )}

                      <div className="flex flex-col max-w-[80%]" style={{ alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                        <div
                          className="px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line"
                          style={msg.role === "assistant" ? {
                            background: "linear-gradient(135deg, rgba(0,229,255,0.07), rgba(0,229,255,0.03))",
                            border: "1px solid rgba(0,229,255,0.13)",
                            color: "rgba(255,255,255,0.9)",
                            borderRadius: "2px 16px 16px 16px",
                            boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
                          } : {
                            background: "linear-gradient(135deg, #00E5FF, #00B8CC)",
                            color: "#000c12",
                            fontWeight: 500,
                            borderRadius: "16px 16px 2px 16px",
                            boxShadow: "0 0 20px rgba(0,229,255,0.3), 0 4px 16px rgba(0,0,0,0.3)",
                          }}
                          dir={msg.role === "assistant" ? "rtl" : "auto"}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[8px] text-white/20 mt-1 font-mono px-1">
                          {msg.time}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  <AnimatePresence>
                    {loading && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="flex items-end gap-2"
                      >
                        <div className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)" }}>
                          <Bot size={12} className="text-[#00E5FF]" />
                        </div>
                        <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl"
                          style={{ background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.12)", borderRadius: "2px 16px 16px 16px" }}>
                          {[0, 1, 2].map(i => (
                            <motion.span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"
                              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.22 }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={bottomRef} />
                </div>

                {/* Suggestions */}
                <AnimatePresence>
                  {messages.length <= 2 && !loading && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="px-4 pb-3 flex flex-wrap gap-1.5"
                    >
                      {suggestions.map((s, i) => (
                        <motion.button
                          key={s}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.07 }}
                          onClick={() => { setInput(s); setTimeout(() => inputRef.current?.focus(), 50); }}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          className="text-[10px] font-mono px-3 py-1.5 rounded-full transition-colors duration-200"
                          style={{
                            border: "1px solid rgba(0,229,255,0.2)",
                            color: "rgba(0,229,255,0.7)",
                            background: "rgba(0,229,255,0.04)",
                          }}
                        >
                          {s}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Input Bar ── */}
                <div
                  className="relative px-3 py-3"
                  style={{ borderTop: "1px solid rgba(0,229,255,0.07)" }}
                >
                  {/* Input glow when focused */}
                  <div
                    className="relative flex items-center gap-2 rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(0,229,255,0.04)",
                      border: "1px solid rgba(0,229,255,0.14)",
                      boxShadow: input.trim() ? "0 0 20px rgba(0,229,255,0.08), inset 0 0 20px rgba(0,229,255,0.03)" : "none",
                      transition: "box-shadow 0.3s",
                    }}
                  >
                    {/* Send button — LEFT (since RTL) */}
                    <motion.button
                      onClick={send}
                      disabled={!input.trim() || loading}
                      whileTap={{ scale: 0.88 }}
                      className="shrink-0 m-1.5 w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-20 transition-all duration-300 relative overflow-hidden"
                      style={{
                        background: input.trim() && !loading
                          ? "linear-gradient(135deg, #00E5FF, #00B8CC)"
                          : "rgba(255,255,255,0.04)",
                        boxShadow: input.trim() && !loading
                          ? "0 0 20px rgba(0,229,255,0.45)"
                          : "none",
                      }}
                      aria-label="Send"
                    >
                      <AnimatePresence mode="wait">
                        {loading ? (
                          <motion.div key="loading"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            <Loader2 size={15} className="animate-spin" style={{ color: input.trim() ? "#000" : "#00E5FF" }} />
                          </motion.div>
                        ) : (
                          <motion.div key="send"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.18 }}
                          >
                            <Send size={15} style={{ color: input.trim() ? "#000c12" : "rgba(0,229,255,0.4)", transform: "rotate(-45deg) translateY(-1px)" }} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    {/* Text input */}
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="اكتب رسالتك..."
                      dir="rtl"
                      className="flex-1 bg-transparent text-white text-sm placeholder-white/20 outline-none min-w-0 py-3 pr-1"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                      disabled={loading}
                    />
                  </div>

                  {/* Bottom hint */}
                  <p className="text-center text-[9px] text-white/15 font-mono mt-2 tracking-wide">
                    Enter للإرسال · Powered by Vortex AI
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Toggle button ── */}
          <div className="relative">

            {/* Pulsing ring */}
            {!open && (
              <>
                <span className="absolute inset-0 rounded-full animate-ping opacity-20"
                  style={{ background: "rgba(0,229,255,0.5)" }} />
                <span className="absolute inset-0 rounded-full animate-ping opacity-10 [animation-delay:0.6s]"
                  style={{ background: "rgba(0,229,255,0.5)" }} />
              </>
            )}

            {/* Main button */}
            <motion.button
              onClick={() => setOpen(v => !v)}
              whileTap={{ scale: 0.92 }}
              aria-label="Open AI Assistant"
              className="relative w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: open
                  ? "linear-gradient(135deg, rgba(0,229,255,0.25), rgba(0,229,255,0.12))"
                  : "linear-gradient(135deg, #00E5FF, #00A8BF)",
                boxShadow: open
                  ? "0 0 24px rgba(0,229,255,0.3)"
                  : "0 0 32px rgba(0,229,255,0.5), 0 0 60px rgba(0,229,255,0.2)",
                border: "1px solid rgba(0,229,255,0.4)",
              }}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <X size={22} className="text-[#00E5FF]" />
                  </motion.div>
                ) : (
                  <motion.div key="bot"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <Bot size={22} className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Unread badge */}
            <AnimatePresence>
              {unread > 0 && !open && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "#FF3B5C" }}
                >
                  {unread}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
