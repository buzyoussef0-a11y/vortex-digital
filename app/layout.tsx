import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "../styles/vortex.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const BASE_URL = "https://vortexagence.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vortex Digital | وكالة مواقع وأتمتة ذكاء اصطناعي — المغرب",
    template: "%s | Vortex Digital",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "any" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/icon.png",
  },
  description:
    "Vortex Digital — وكالة رقمية متخصصة في تصميم مواقع احترافية وأتمتة الأعمال بالذكاء الاصطناعي في المغرب. نبني مواقع premium وأنظمة AI تشتغل 24/7 لتوفير وقتك وزيادة مبيعاتك.",
  keywords: [
    "وكالة تصميم مواقع المغرب",
    "أتمتة ذكاء اصطناعي المغرب",
    "تصميم موقع احترافي",
    "Agence web Maroc",
    "agence digitale maroc",
    "AI automation maroc",
    "web design morocco",
    "chatbot whatsapp maroc",
    "vortex digital",
    "موقع ويب احترافي",
    "أتمتة واتساب",
    "وكالة رقمية",
  ],
  authors: [{ name: "Vortex Digital", url: BASE_URL }],
  creator: "Vortex Digital",
  publisher: "Vortex Digital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "ar_MA",
    alternateLocale: ["fr_MA", "en_US"],
    url: BASE_URL,
    siteName: "Vortex Digital",
    title: "Vortex Digital | مواقع احترافية + أتمتة AI — المغرب",
    description:
      "نصمم مواقع premium ونبني أنظمة أتمتة بالذكاء الاصطناعي تشتغل 24/7. ردّ في أقل من 24 ساعة — مجاني وبلا التزام.",
    images: [
      {
        url: `${BASE_URL}/images/vortex.jpeg`,
        width: 1200,
        height: 630,
        alt: "Vortex Digital — وكالة مواقع وأتمتة AI في المغرب",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vortex Digital | مواقع احترافية + أتمتة AI — المغرب",
    description:
      "نصمم مواقع premium ونبني أنظمة أتمتة بالذكاء الاصطناعي. ردّ في أقل من 24 ساعة.",
    images: [`${BASE_URL}/images/vortex.jpeg`],
    creator: "@vortexdigital",
  },
  verification: {
    // google: "your-google-verification-code", // أضف بعد تسجيل Google Search Console
  },
  category: "technology",
  manifest: "/manifest.webmanifest",
};

import LenisProvider from "@/components/LenisProvider";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <link rel="canonical" href={BASE_URL} />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RC9V04GDGV" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-RC9V04GDGV');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${BASE_URL}/#organization`,
                  name: "Vortex Digital",
                  url: BASE_URL,
                  logo: {
                    "@type": "ImageObject",
                    url: `${BASE_URL}/icon.png`,
                    width: 512,
                    height: 512,
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+212705960845",
                    contactType: "customer service",
                    availableLanguage: ["Arabic", "French", "English"],
                  },
                  sameAs: [
                    "https://wa.me/212705960845",
                  ],
                  email: "vortexagence.digital@gmail.com",
                  areaServed: {
                    "@type": "Country",
                    name: "Morocco",
                  },
                  description:
                    "وكالة رقمية متخصصة في تصميم مواقع احترافية وأتمتة الأعمال بالذكاء الاصطناعي في المغرب",
                  foundingDate: "2024",
                  knowsAbout: [
                    "Web Design",
                    "AI Automation",
                    "WhatsApp Chatbot",
                    "Digital Marketing",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${BASE_URL}/#website`,
                  url: BASE_URL,
                  name: "Vortex Digital",
                  description:
                    "وكالة رقمية متخصصة في تصميم مواقع احترافية وأتمتة الأعمال بالذكاء الاصطناعي في المغرب",
                  publisher: {
                    "@id": `${BASE_URL}/#organization`,
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: `${BASE_URL}/start-project`,
                    },
                    "query-input": "required name=search_term_string",
                  },
                  inLanguage: "ar",
                },
                {
                  "@type": "ProfessionalService",
                  "@id": `${BASE_URL}/#service`,
                  name: "Vortex Digital",
                  image: `${BASE_URL}/images/vortex.jpeg`,
                  url: BASE_URL,
                  telephone: "+212705960845",
                  email: "vortexagence.digital@gmail.com",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "MA",
                    addressRegion: "Morocco",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: "31.7917",
                    longitude: "-7.0926",
                  },
                  openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",
                    ],
                    opens: "09:00",
                    closes: "22:00",
                  },
                  priceRange: "$$",
                  servesCuisine: null,
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "خدمات Vortex Digital",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "تصميم مواقع احترافية",
                          description:
                            "مواقع ويب premium مع animations وتجربة مستخدم متميزة",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "أتمتة بالذكاء الاصطناعي",
                          description:
                            "أنظمة AI automation وchatbot واتساب تشتغل 24/7",
                        },
                      },
                    ],
                  },
                },
              ],
            }),
          }}
        />
        {/* FAQ Schema — boosts AI Overviews & featured snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How long does a website project take with Vortex Digital?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Most projects are delivered in 3–5 weeks. Landing pages ship in 7–10 days. Full systems with AI automation take 3–6 weeks. You receive daily progress updates throughout.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What technologies does Vortex Digital use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Frontend: Next.js, React, TypeScript, Tailwind CSS. AI layer: OpenAI GPT-4, Anthropic Claude, custom prompt engineering. Automation: n8n and Make for multi-step workflows. Everything is production-grade and fully documented.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does AI automation work inside a website?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The AI handles customer inquiries 24/7 in Arabic, French, or English — qualifying leads, booking appointments, sending follow-ups, and generating personalized responses automatically without manual intervention.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does Vortex Digital offer support after project delivery?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Every project includes 30 days of free post-launch support. After that, monthly maintenance plans are available to keep your system fast, updated, and protected.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does Vortex Digital offer a guarantee?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. If any deliverable does not match the agreed specifications, Vortex Digital revises it at no additional cost. No excuses, no extra invoices.",
                  },
                },
              ],
            }),
          }}
        />
        {/* Person Schema — founder entity for AI brand recognition */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${BASE_URL}/#founder`,
              name: "Vortex Digital Founder",
              jobTitle: "Founder & CEO",
              worksFor: { "@id": `${BASE_URL}/#organization` },
              url: BASE_URL,
              email: "vortexagence.digital@gmail.com",
              knowsAbout: ["Web Design", "AI Automation", "Next.js", "n8n", "Digital Marketing"],
              knowsLanguage: ["Arabic", "French", "English"],
            }),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} antialiased bg-[#00050A] text-white`}
        dir="ltr" suppressHydrationWarning
      >
        {/* Loading screen — created by script BEFORE React hydration, invisible to React */}
        <Script id="vx-loader" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `
          (function(){
            var s=document.createElement('style');
            s.textContent='@keyframes vxFill{from{width:0%}to{width:100%}}';
            document.head.appendChild(s);
            var d=document.createElement('div');
            d.style.cssText='position:fixed;inset:0;z-index:999999;background:#00050A;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:all;';
            var glow=document.createElement('div');
            glow.style.cssText='position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(0,229,255,0.08) 0%,transparent 70%);';
            var v=document.createElement('div');
            v.style.cssText='font-size:72px;font-weight:900;background:linear-gradient(135deg,#fff,#00E5FF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 30px rgba(0,229,255,0.5));margin-bottom:12px;font-family:sans-serif;line-height:1;';
            v.textContent='V';
            var name=document.createElement('p');
            name.style.cssText='color:#00E5FF;font-family:monospace;font-size:11px;letter-spacing:0.45em;text-transform:uppercase;margin:0 0 36px;';
            name.textContent='Vortex Digital';
            var track=document.createElement('div');
            track.style.cssText='width:160px;height:1px;background:rgba(255,255,255,0.08);border-radius:99px;overflow:hidden;';
            var bar=document.createElement('div');
            bar.style.cssText='height:100%;width:0%;border-radius:99px;background:#00E5FF;box-shadow:0 0 10px rgba(0,229,255,0.8);animation:vxFill 2s ease-out forwards;';
            track.appendChild(bar);
            d.appendChild(glow);d.appendChild(v);d.appendChild(name);d.appendChild(track);
            document.body.insertBefore(d,document.body.firstChild);
            setTimeout(function(){
              d.style.transition='opacity 0.7s ease';
              d.style.opacity='0';
              d.style.pointerEvents='none';
              setTimeout(function(){if(d.parentNode)d.parentNode.removeChild(d);},700);
            },2200);
          })();
        ` }} />

        <LenisProvider>{children}</LenisProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
