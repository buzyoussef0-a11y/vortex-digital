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
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

      if (!webhookUrl) {
        // Placeholder until n8n webhook is configured
        await new Promise(r => setTimeout(r, 900));
        const botMsg: Message = {
          role: "assistant",
          text: "شكرًا على رسالتك! 🙏\nسيتم ربط هذا المساعد قريبًا بنظام الذكاء الاصطناعي. في الوقت الحالي، تواصل معنا مباشرة عبر واتساب أو نموذج الاتصال.",
          time: timestamp(),
        };
        setMessages(prev => [...prev, botMsg]);
        if (!open) setUnread(n => n + 1);
      } else {
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
      }
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
                initial={{ opacity: 0, scale: 0.92, y: 16, originX: 1, originY: 1 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 16 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="w-[340px] md:w-[380px] rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: "linear-gradient(160deg, rgba(0,8,18,0.97) 0%, rgba(0,5,12,0.99) 100%)",
                  border: "1px solid rgba(0,229,255,0.2)",
                  boxShadow: "0 0 60px rgba(0,229,255,0.12), 0 24px 60px rgba(0,0,0,0.6)",
                  backdropFilter: "blur(24px)",
                  maxHeight: "520px",
                }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between px-5 py-4"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,229,255,0.08) 0%, rgba(0,5,12,0) 100%)",
                    borderBottom: "1px solid rgba(0,229,255,0.1)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* AI Avatar */}
                    <div
                      className="relative w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,229,255,0.18), rgba(0,229,255,0.06))",
                        border: "1px solid rgba(0,229,255,0.35)",
                        boxShadow: "0 0 16px rgba(0,229,255,0.2)",
                      }}
                    >
                      <Bot className="w-4.5 h-4.5 text-[#00E5FF]" size={18} />
                      {/* Online dot */}
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00E5FF]"
                        style={{ boxShadow: "0 0 6px rgba(0,229,255,0.8)" }} />
                    </div>

                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">Vortex AI</p>
                      <p className="text-[#00E5FF] text-[10px] font-mono tracking-wide">
                        متصل الآن · يرد في ثوانٍ
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setOpen(false)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                      aria-label="Minimize"
                    >
                      <Minimize2 size={14} />
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                      aria-label="Close"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0"
                  style={{ maxHeight: "320px" }}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className="max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
                        style={msg.role === "assistant" ? {
                          background: "rgba(0,229,255,0.07)",
                          border: "1px solid rgba(0,229,255,0.14)",
                          color: "rgba(255,255,255,0.88)",
                          borderRadius: "4px 18px 18px 18px",
                        } : {
                          background: "linear-gradient(135deg, rgba(0,229,255,0.18), rgba(0,229,255,0.1))",
                          border: "1px solid rgba(0,229,255,0.3)",
                          color: "#ffffff",
                          borderRadius: "18px 4px 18px 18px",
                        }}
                        dir={msg.role === "assistant" ? "rtl" : "auto"}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-white/25 mt-1 font-mono px-1">
                        {msg.time}
                      </span>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  <AnimatePresence>
                    {loading && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl w-fit"
                        style={{
                          background: "rgba(0,229,255,0.07)",
                          border: "1px solid rgba(0,229,255,0.14)",
                          borderRadius: "4px 18px 18px 18px",
                        }}
                      >
                        {[0, 1, 2].map(i => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={bottomRef} />
                </div>

                {/* Suggestions */}
                {messages.length <= 2 && !loading && (
                  <div className="px-4 pb-2 flex flex-wrap gap-2">
                    {suggestions.map(s => (
                      <button
                        key={s}
                        onClick={() => { setInput(s); setTimeout(() => inputRef.current?.focus(), 50); }}
                        className="text-[10px] font-mono px-3 py-1.5 rounded-full transition-all duration-200"
                        style={{
                          border: "1px solid rgba(0,229,255,0.22)",
                          color: "rgba(0,229,255,0.75)",
                          background: "rgba(0,229,255,0.05)",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,229,255,0.12)";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,229,255,0.45)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,229,255,0.05)";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,229,255,0.22)";
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div
                  className="px-4 py-3 flex items-center gap-2"
                  style={{ borderTop: "1px solid rgba(0,229,255,0.08)" }}
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="اكتب رسالتك..."
                    dir="rtl"
                    className="flex-1 bg-transparent text-white text-sm placeholder-white/25 outline-none font-['Outfit'] min-w-0"
                    disabled={loading}
                  />
                  <motion.button
                    onClick={send}
                    disabled={!input.trim() || loading}
                    whileTap={{ scale: 0.92 }}
                    className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                    style={{
                      background: input.trim() && !loading
                        ? "linear-gradient(135deg, rgba(0,229,255,0.25), rgba(0,229,255,0.12))"
                        : "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(0,229,255,0.3)",
                    }}
                    aria-label="Send"
                  >
                    {loading
                      ? <Loader2 size={14} className="text-[#00E5FF] animate-spin" />
                      : <Send size={14} className="text-[#00E5FF] -rotate-45 -translate-y-px" />
                    }
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Toggle button ── */}
          <div className="relative">
            {/* Tooltip */}
            <AnimatePresence>
              {!open && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono pointer-events-none"
                  style={{
                    background: "rgba(0,8,18,0.95)",
                    border: "1px solid rgba(0,229,255,0.2)",
                    color: "rgba(255,255,255,0.85)",
                  }}
                  dir="rtl"
                >
                  المساعد الذكي 🤖
                </motion.div>
              )}
            </AnimatePresence>

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
