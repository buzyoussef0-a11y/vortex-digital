"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="fixed bottom-8 left-8 z-[9999] flex items-center gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-[#00050A] border border-white/10 text-white text-xs font-mono px-4 py-2 rounded-xl whitespace-nowrap shadow-lg"
                dir="rtl"
              >
                تواصل معنا على واتساب 💬
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-15 [animation-delay:0.5s]" />

            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
              className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] transition-shadow duration-300"
            >
              {/* WhatsApp SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="white"
                className="w-7 h-7"
              >
                <path d="M16 1C7.716 1 1 7.716 1 16c0 2.628.676 5.098 1.856 7.254L1 31l7.97-2.09A14.93 14.93 0 0 0 16 31c8.284 0 15-6.716 15-15S24.284 1 16 1zm0 27.3a12.25 12.25 0 0 1-6.24-1.7l-.447-.266-4.73 1.24 1.264-4.61-.29-.473A12.258 12.258 0 0 1 3.7 16c0-6.784 5.516-12.3 12.3-12.3S28.3 9.216 28.3 16 22.784 28.3 16 28.3zm6.74-9.21c-.37-.185-2.19-1.08-2.53-1.202-.34-.123-.586-.185-.833.185-.247.37-.956 1.202-1.172 1.45-.216.247-.432.278-.802.093-.37-.185-1.562-.576-2.977-1.836-1.1-.981-1.843-2.193-2.06-2.563-.216-.37-.023-.57.163-.755.168-.166.37-.432.555-.648.185-.216.247-.37.37-.617.123-.247.062-.463-.031-.648-.093-.185-.833-2.007-1.14-2.747-.3-.72-.606-.623-.833-.635-.216-.01-.463-.012-.71-.012-.247 0-.648.093-.987.463-.34.37-1.295 1.265-1.295 3.087 0 1.821 1.326 3.582 1.51 3.829.185.247 2.61 3.98 6.326 5.583.884.382 1.573.61 2.11.78.887.282 1.694.243 2.332.147.711-.107 2.19-.895 2.5-1.76.308-.864.308-1.607.215-1.76-.092-.154-.34-.247-.71-.432z" />
              </svg>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
