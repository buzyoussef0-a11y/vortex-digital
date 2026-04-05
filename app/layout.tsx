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

const BASE_URL = "https://vortex-digital-phi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vortex Digital | وكالة مواقع وأتمتة ذكاء اصطناعي — المغرب",
    template: "%s | Vortex Digital",
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
        url: "/vortex.jpeg",
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
    images: ["/vortex.jpeg"],
    creator: "@vortexdigital",
  },
  verification: {
    // google: "your-google-verification-code", // أضف بعد تسجيل Google Search Console
  },
  category: "technology",
};

import LenisProvider from "@/components/LenisProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <link rel="canonical" href={BASE_URL} />
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
                    url: `${BASE_URL}/vortex.jpeg`,
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
                  image: `${BASE_URL}/og-image.jpg`,
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
      </head>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} antialiased bg-[#00050A] text-white`}
        dir="ltr"
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
