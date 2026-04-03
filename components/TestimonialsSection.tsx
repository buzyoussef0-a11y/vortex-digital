"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
    name: string;
    role: string;
    arabic: string;
    text: string;
    rating: number;
    initials: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Dr. Zouhri",
        role: "Dentiste, Cabinet Zouhri — Azrou",
        arabic: "الموقع زاد عندي الحجوزات بـ 3 مرات في شهر وحد",
        text: "Before Vortex, patients called me during surgery. Now the booking system handles everything automatically. Best investment I made for my clinic.",
        rating: 5,
        initials: "DZ",
    },
    {
        name: "Youssef Amrani",
        role: "E-Commerce Founder — Casablanca",
        arabic: "خدمة premium بسعر معقول — نادر تلقاها فالمغرب",
        text: "I've worked with agencies in Dubai and France. Vortex Digital delivers the same level of quality without the inflated price tag. Exceptional team.",
        rating: 5,
        initials: "YA",
    },
    {
        name: "Sara Benali",
        role: "Coach & Consultant — Rabat",
        arabic: "البراند ديالي تبدل 180 درجة",
        text: "My personal brand went from amateur to premium overnight. The digital identity package completely transformed how clients perceive me.",
        rating: 5,
        initials: "SB",
    },
    {
        name: "Karim El Fassi",
        role: "Restaurant Owner — Fes",
        arabic: "الأتمتة وفرات ليا 20 ساعة في الأسبوع",
        text: "The WhatsApp automation system they built handles all my reservations and customer follow-ups. I literally don't touch my phone for bookings anymore.",
        rating: 5,
        initials: "KF",
    },
    {
        name: "Imane Tazi",
        role: "Real Estate Agency — Marrakech",
        arabic: "ROI واضح من الأسبوع الأول",
        text: "Our lead qualification AI filters serious buyers from time-wasters automatically. Our sales team closes 40% more deals now.",
        rating: 5,
        initials: "IT",
    },
    {
        name: "Omar Idrissi",
        role: "SaaS Startup — Casablanca",
        arabic: "تيم صغير بنتيجة شركة كبيرة",
        text: "What impressed me most was their speed. Full product website + onboarding flow delivered in 3 weeks. And it looks like it cost 10x more.",
        rating: 5,
        initials: "OI",
    },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="flex-shrink-0 w-[380px] p-7 rounded-2xl border border-[#00E5FF]/40 bg-[#00E5FF]/[0.09] backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-[#00E5FF]/65 hover:shadow-[0_0_45px_rgba(0,229,255,0.28)] mx-4">
        {/* Top glowing border line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/55 to-transparent" />
        {/* Corner ambient glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#00E5FF]/8 blur-[50px] rounded-full pointer-events-none" />
        {/* Decorative Quote Mark */}
        <div className="absolute top-4 right-6 text-6xl font-serif text-[#00E5FF]/10 select-none">
            "
        </div>

        {/* Star Rating */}
        <div className="flex gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={14} className="fill-[#00E5FF] text-[#00E5FF]" />
            ))}
        </div>

        {/* Arabic Quote */}
        <p dir="rtl" className="text-white font-bold text-lg mb-3 text-right leading-tight">
            {testimonial.arabic}
        </p>

        {/* English Quote */}
        <p className="text-zinc-500 italic text-sm leading-relaxed mb-6">
            "{testimonial.text}"
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3 mt-auto">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#00A8BD] flex items-center justify-center text-white font-bold text-sm">
                {testimonial.initials}
            </div>
            <div>
                <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                <p className="text-zinc-600 text-[10px] uppercase tracking-wider">{testimonial.role}</p>
            </div>
        </div>
    </div>
);

const TestimonialsSection = () => {
    return (
        <section id="testimonials" className="py-24 relative overflow-hidden bg-[#00050A]">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#00E5FF]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#00A8BD]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-20 mb-16">
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[#00E5FF] font-mono tracking-widest uppercase mb-4"
                >
                    [ CLIENT VOICES ]
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-4"
                >
                    What They Say
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    dir="rtl"
                    className="text-zinc-500 text-xl md:text-2xl text-right"
                >
                    كلام كليانتنا — مش كلامنا حنا
                </motion.p>
            </div>

            {/* Marquee Rows */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{ willChange: "transform, opacity" }}
              className="flex flex-col gap-8 select-none relative mask-fade"
            >
                {/* Row 1: Scrolling Left */}
                <div className="flex marquee-row marquee-left group">
                    <div className="flex marquee-content">
                        {[...testimonials, ...testimonials].map((t, i) => (
                            <TestimonialCard key={`row1-${i}`} testimonial={t} />
                        ))}
                    </div>
                </div>

                {/* Row 2: Scrolling Right */}
                <div className="flex marquee-row marquee-right group">
                    <div className="flex marquee-content">
                        {[...testimonials, ...testimonials].map((t, i) => (
                            <TestimonialCard key={`row2-${i}`} testimonial={t} />
                        ))}
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
        .mask-fade {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }

        .marquee-row {
          overflow: hidden;
          width: 100%;
          contain: layout style;
        }

        .marquee-content {
          width: max-content;
          will-change: transform;
        }

        .marquee-left .marquee-content {
          animation: scrollLeft 35s linear infinite;
        }

        .marquee-right .marquee-content {
          animation: scrollRight 45s linear infinite;
        }

        .marquee-row:hover .marquee-content {
          animation-play-state: paused;
        }

        @keyframes scrollLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
        </section>
    );
};

export default TestimonialsSection;
