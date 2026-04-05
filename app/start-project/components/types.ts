// ─── Shared Types + Constants for /start-project ─────────────────────────────

export interface ProjectFormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  role: string;
  city: string;
  segment: string; // derived from role selection
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
  contactMethod: "whatsapp" | "email" | "call";
}

export const defaultFormData: ProjectFormData = {
  name: "", email: "", phone: "", role: "", city: "", segment: "",
  services: [], websiteType: "", currentSituation: "", problems: [],
  timeline: "", inspiration: "", files: [], notes: "",
  budget: "", contactMethod: "whatsapp",
};

export const ROLE_OPTIONS = [
  { id: "business-owner", emoji: "🏢", label: "صاحب مشروع", sub: "Business Owner" },
  { id: "startup-founder", emoji: "🚀", label: "Startup Founder", sub: "" },
  { id: "freelancer", emoji: "🎨", label: "Freelancer / مستقل", sub: "" },
  { id: "marketing-manager", emoji: "📊", label: "Marketing Manager", sub: "" },
  { id: "doctor", emoji: "🏥", label: "طبيب / دكتور", sub: "" },
  { id: "other", emoji: "✨", label: "أخرى / Other", sub: "" },
];

export const SERVICE_CARDS = [
  {
    id: "web",
    icon: "Globe",
    title: "موقع ويب",
    sub: "Web Design & Development",
    desc: "Landing page, portfolio, e-commerce, booking",
  },
  {
    id: "ai",
    icon: "Bot",
    title: "أتمتة بالذكاء الاصطناعي",
    sub: "AI Automation",
    desc: "WhatsApp bots, lead qualification, auto-booking",
  },
  {
    id: "brand",
    icon: "Layers",
    title: "هوية بصرية",
    sub: "Brand Identity",
    desc: "Logo, colors, brand guidelines, social media kit",
  },
  {
    id: "full",
    icon: "Package",
    title: "الباكاج الكامل",
    sub: "Everything",
    desc: "Web + AI Automation + Brand — الحل الشامل",
    badge: "⚡ الأكثر طلباً",
  },
];

export const WEBSITE_TYPES = [
  { id: "simple", icon: "Layout", label: "موقع عادي وسريع", desc: "Clean, fast, professional — مناسب لـ معظم المشاريع" },
  { id: "animated", icon: "Sparkles", label: "موقع بانيماشن immersive", desc: "scroll animations, 3D, premium", badge: "مثل Vortex ⚡" },
  { id: "ecommerce", icon: "ShoppingBag", label: "متجر إلكتروني", desc: "E-commerce, products, online payments" },
];

export const SITUATION_OPTIONS = [
  "لا، هاد أول موقع ليا",
  "عندي موقع قديم نبغي نبدلو",
  "عندي موقع نبغي نحسنو",
];

export const PROBLEM_PILLS = [
  "😔 مكيجيش كليان من الإنترنت",
  "👎 الموقع قديم ومش professional",
  "⏰ ماعنديش وقت نرد على كل كليان",
  "🌫️ ما عنديش برصة ديجيتال واضحة",
  "📉 كنخسر كليان لمنافسين",
  "📅 الحجوزات كتاخد وقت بزاف",
  "🤖 ماعنديش أتمتة لأي شي",
  "📈 بغيت نتوسع وما قادرش وحدي",
];

export const TIMELINE_CARDS = [
  { id: "asap", icon: "🚀", label: "في أسرع وقت", sub: "ASAP", desc: "الأولوية القصوى — نبداو فوراً" },
  { id: "1-2mo", icon: "📅", label: "شهر 1–2", sub: "", desc: "الوقت المثالي لمعظم المشاريع" },
  { id: "2-4mo", icon: "🗓️", label: "شهر 2–4", sub: "", desc: "مشروع أكبر أو نبغي نهضر أكثر أولاً" },
  { id: "flexible", icon: "🌙", label: "مرن — بلا deadline", sub: "", desc: "ما عندناش ضغط — نبنيو مزيان" },
];

export const BUDGETS = [
  { id: "lt5k", label: "< 5,000 MAD", desc: "موقع بسيط / Landing page / Redesign", pct: 20 },
  { id: "5-15k", label: "5,000 – 15,000 MAD", desc: "موقع premium أو automation بسيط", pct: 40 },
  { id: "15-30k", label: "15,000 – 30,000 MAD", desc: "موقع كامل + AI automation", pct: 65, badge: "⚡ الأكثر شيوعاً" },
  { id: "gt30k", label: "30,000 MAD+", desc: "الباكاج الكامل — web + AI + brand", pct: 90 },
  { id: "discuss", label: "نتكلمو — مابغيتش نحدد دابا", desc: "نتناقشو أولاً ونشوفو مع بعض", pct: 0 },
];

export const CONTACT_METHODS: { id: "whatsapp" | "email" | "call"; label: string }[] = [
  { id: "whatsapp", label: "📱 WhatsApp" },
  { id: "email", label: "📧 Email" },
  { id: "call", label: "📞 مكالمة" },
];

export const SERVICE_LABELS: Record<string, string> = {
  web: "موقع ويب", ai: "AI Automation", brand: "هوية بصرية", full: "الباكاج الكامل",
};

// ─── All services dropdown list ───────────────────────────────────────────────

export interface ServiceOption {
  id: string;
  label: string;
  labelEn: string;
  category: string;
  emoji: string;
  roles: string[]; // which role ids this service is recommended for (empty = all)
}

export const ALL_SERVICES: ServiceOption[] = [
  // 🌐 Web Design & Development
  { id: "landing-page",      label: "Landing Page",              labelEn: "Landing Page",              category: "🌐 Web Design",      emoji: "🌐", roles: ["business-owner","startup-founder","freelancer","marketing-manager","other"] },
  { id: "portfolio",         label: "موقع Portfolio",            labelEn: "Portfolio Website",         category: "🌐 Web Design",      emoji: "💼", roles: ["freelancer","other"] },
  { id: "business-website",  label: "موقع شركة / مشروع",        labelEn: "Business Website",          category: "🌐 Web Design",      emoji: "🏢", roles: ["business-owner","marketing-manager"] },
  { id: "booking-website",   label: "موقع مع نظام حجز",         labelEn: "Website + Booking System",  category: "🌐 Web Design",      emoji: "📅", roles: ["doctor","business-owner"] },
  { id: "clinic-web",        label: "موقع عيادة / طبيب",        labelEn: "Clinic / Doctor Website",   category: "🌐 Web Design",      emoji: "🏥", roles: ["doctor"] },
  { id: "restaurant-web",    label: "موقع مطعم / كافيه",        labelEn: "Restaurant Website",        category: "🌐 Web Design",      emoji: "🍽️", roles: ["business-owner"] },
  { id: "real-estate-web",   label: "موقع عقارات",              labelEn: "Real Estate Website",       category: "🌐 Web Design",      emoji: "🏠", roles: ["business-owner"] },
  { id: "redesign",          label: "إعادة تصميم موقع قديم",    labelEn: "Website Redesign",          category: "🌐 Web Design",      emoji: "🔄", roles: [] },
  // 🛒 E-Commerce
  { id: "ecommerce",         label: "متجر إلكتروني",            labelEn: "E-Commerce Store",          category: "🛒 E-Commerce",      emoji: "🛒", roles: ["business-owner","startup-founder","other"] },
  { id: "dropshipping",      label: "متجر Dropshipping",        labelEn: "Dropshipping Store",        category: "🛒 E-Commerce",      emoji: "📦", roles: ["startup-founder","other"] },
  { id: "fashion-store",     label: "متجر أزياء / موضة",        labelEn: "Fashion Store",             category: "🛒 E-Commerce",      emoji: "👗", roles: ["business-owner","freelancer"] },
  { id: "food-delivery",     label: "تطبيق توصيل طلبات",        labelEn: "Food Delivery App",         category: "🛒 E-Commerce",      emoji: "🚀", roles: ["startup-founder","business-owner"] },
  { id: "subscription",      label: "موقع اشتراكات / خدمات",   labelEn: "Subscription Platform",     category: "🛒 E-Commerce",      emoji: "🔄", roles: ["startup-founder"] },
  // 🤖 AI & Automation
  { id: "whatsapp-bot",      label: "بوت WhatsApp ذكي",         labelEn: "WhatsApp AI Bot",           category: "🤖 AI & Automation", emoji: "💬", roles: ["business-owner","doctor","marketing-manager"] },
  { id: "chatbot",           label: "Chatbot لموقعك",           labelEn: "Website Chatbot",           category: "🤖 AI & Automation", emoji: "🤖", roles: ["business-owner","doctor","startup-founder"] },
  { id: "lead-automation",   label: "أتمتة جمع العملاء",        labelEn: "Lead Generation Automation",category: "🤖 AI & Automation", emoji: "📊", roles: ["marketing-manager","business-owner","startup-founder"] },
  { id: "crm-automation",    label: "أتمتة CRM",                labelEn: "CRM Automation",            category: "🤖 AI & Automation", emoji: "🗂️", roles: ["business-owner","marketing-manager"] },
  { id: "email-automation",  label: "أتمتة الإيميل",           labelEn: "Email Automation",          category: "🤖 AI & Automation", emoji: "📧", roles: ["marketing-manager","startup-founder"] },
  { id: "ai-content",        label: "توليد محتوى بالذكاء",      labelEn: "AI Content Generation",     category: "🤖 AI & Automation", emoji: "✍️", roles: ["freelancer","marketing-manager"] },
  { id: "n8n-workflow",      label: "n8n Workflows",            labelEn: "n8n Workflow Automation",   category: "🤖 AI & Automation", emoji: "⚙️", roles: ["startup-founder","other"] },
  // 🎨 Branding & Identity
  { id: "logo",              label: "تصميم شعار",               labelEn: "Logo Design",               category: "🎨 Brand & Identity", emoji: "🎨", roles: ["freelancer","business-owner","startup-founder"] },
  { id: "brand-identity",    label: "هوية بصرية كاملة",         labelEn: "Full Brand Identity",       category: "🎨 Brand & Identity", emoji: "✨", roles: ["freelancer","business-owner","startup-founder"] },
  { id: "social-kit",        label: "تصاميم سوشيال ميديا",      labelEn: "Social Media Kit",          category: "🎨 Brand & Identity", emoji: "📱", roles: ["freelancer","marketing-manager"] },
  { id: "pitch-deck",        label: "تصميم Pitch Deck",         labelEn: "Pitch Deck Design",         category: "🎨 Brand & Identity", emoji: "📊", roles: ["startup-founder"] },
  { id: "print-design",      label: "تصميم للطباعة",            labelEn: "Print Design",              category: "🎨 Brand & Identity", emoji: "🖨️", roles: ["freelancer","business-owner"] },
  // 📱 Mobile & Apps
  { id: "mobile-app",        label: "تطبيق موبايل",             labelEn: "Mobile Application",        category: "📱 Mobile & Apps",    emoji: "📱", roles: ["startup-founder","business-owner"] },
  { id: "pwa",               label: "Progressive Web App",      labelEn: "Progressive Web App",       category: "📱 Mobile & Apps",    emoji: "⚡", roles: ["startup-founder"] },
  { id: "dashboard",         label: "لوحة تحكم / Dashboard",   labelEn: "Admin Dashboard",           category: "📱 Mobile & Apps",    emoji: "🖥️", roles: ["startup-founder","business-owner"] },
  // 📣 Marketing & SEO
  { id: "seo",               label: "تحسين محركات البحث SEO",   labelEn: "SEO Optimization",          category: "📣 Marketing & SEO",  emoji: "🔍", roles: ["marketing-manager","business-owner"] },
  { id: "google-ads",        label: "إعلانات Google Ads",       labelEn: "Google Ads Management",     category: "📣 Marketing & SEO",  emoji: "📣", roles: ["marketing-manager","business-owner"] },
  { id: "meta-ads",          label: "إعلانات Meta / Facebook",  labelEn: "Meta Ads Management",       category: "📣 Marketing & SEO",  emoji: "📘", roles: ["marketing-manager","business-owner"] },
  { id: "content-strategy",  label: "استراتيجية محتوى",         labelEn: "Content Strategy",          category: "📣 Marketing & SEO",  emoji: "📝", roles: ["marketing-manager","freelancer"] },
  { id: "email-marketing",   label: "تسويق عبر الإيميل",        labelEn: "Email Marketing",           category: "📣 Marketing & SEO",  emoji: "📧", roles: ["marketing-manager","startup-founder"] },
  // 🧩 Systems
  { id: "payment-gateway",   label: "نظام دفع إلكتروني",        labelEn: "Payment Gateway",           category: "🧩 Systems",          emoji: "💳", roles: ["business-owner","startup-founder"] },
  { id: "erp",               label: "نظام ERP / إدارة",         labelEn: "ERP / Management System",   category: "🧩 Systems",          emoji: "🗄️", roles: ["business-owner"] },
  { id: "api-integration",   label: "ربط API خارجي",            labelEn: "API Integration",           category: "🧩 Systems",          emoji: "🔗", roles: ["startup-founder","other"] },
  { id: "saas",              label: "منصة SaaS",                labelEn: "SaaS Platform",             category: "🧩 Systems",          emoji: "☁️", roles: ["startup-founder"] },
];

// ─── Segment-specific Step 2 data ────────────────────────────────────────────

// Maps role id → segment key
export const ROLE_TO_SEGMENT: Record<string, string> = {
  "business-owner": "business",
  "startup-founder": "startup",
  "freelancer": "brand",
  "marketing-manager": "business",
  "doctor": "dental",
  "other": "general",
};

// DENTAL segment
export const DENTAL_SERVICE_CARDS = [
  { id: "dental-web", icon: "Monitor", title: "موقع العيادة", sub: "Dental Website", desc: "موقع احترافي مخصص لعيادة أسنان — يبني الثقة ويجذب مرضى جدد" },
  { id: "dental-booking", icon: "CalendarCheck", title: "نظام الحجز", sub: "Online Booking", desc: "المرضى يحجزون 24/7 بلا مكالمات — تأكيد تلقائي على WhatsApp", badge: "الأكثر طلباً" },
  { id: "dental-bot", icon: "MessageCircle", title: "روبو WhatsApp", sub: "AI Bot", desc: "يرد على المرضى، يأكد المواعيد، ويتكلم بالدارجة" },
  { id: "dental-full", icon: "Package", title: "النظام الكامل", sub: "Full System", desc: "موقع + حجز + روبو — الحل الشامل للعيادة", badge: "⚡ الأوفر" },
];
export const DENTAL_PROBLEMS = [
  "😔 المرضى كيتصلو وأنا في العملية",
  "📅 الحجوزات كتاخد وقت وجهد كبير",
  "👎 موقعي قديم ومش professional",
  "🌫️ المرضى الجدد ما كيلقاونيش على النت",
  "⏰ ماعندي وقت نرد على كل واحد",
  "📉 كنخسر مرضى لمنافسين",
  "🤖 ماعندي أي أتمتة في العيادة",
  "📲 بغيت نكبر من غير ما نزيد موظفين",
];
export const DENTAL_SITUATION = [
  "لا، هاد أول موقع للعيادة",
  "عندي موقع قديم نبغي نبدلو",
  "عندي موقع نبغي نضيف ليه نظام حجز",
];

// BRAND/FREELANCER segment
export const BRAND_SERVICE_CARDS = [
  { id: "brand-identity", icon: "Layers", title: "هوية بصرية", sub: "Brand Identity", desc: "Logo، ألوان، typography، brand guidelines كاملة" },
  { id: "brand-web", icon: "Globe", title: "موقع Portfolio", sub: "Portfolio Website", desc: "موقع يعرض شغلك ويجيب ليك كلياني جدد" },
  { id: "brand-social", icon: "Sparkles", title: "Social Media Kit", sub: "Content Design", desc: "تمبليتات Instagram، posts، stories — كل شي جاهز" },
  { id: "brand-full", icon: "Package", title: "الباكاج الكامل", sub: "Brand + Web", desc: "هوية بصرية كاملة + موقع portfolio — الحل الشامل", badge: "⚡ الأكثر طلباً" },
];
export const BRAND_PROBLEMS = [
  "🎨 ما عنديش هوية بصرية واضحة",
  "👎 برصتي الديجيتال ما تعكسش مستواي",
  "📉 كنخسر كلياني لمنافسين بشغل أضعف",
  "🌫️ ما عنديش موقع يعرض شغلي",
  "💸 كنخسر وقت في تصميم كل بوست",
  "🤷 الكلياني ما كيفهموش قيمة شغلي",
  "📲 بغيت نوصل لكلياني أحسن على الإنترنت",
  "⚡ بغيت أتوماتيزي بعض الأشياء",
];
export const BRAND_SITUATION = [
  "لا، ما عنديش أي هوية بصرية",
  "عندي شعار بس بغيت نكملو",
  "عندي هوية بصرية بغيت نحدثها",
];

// STARTUP segment
export const STARTUP_SERVICE_CARDS = [
  { id: "startup-web", icon: "Globe", title: "موقع المشروع", sub: "Product Website", desc: "Landing page أو full product site — يحول الزوار لعملاء" },
  { id: "startup-ai", icon: "Bot", title: "AI Automation", sub: "Smart Systems", desc: "Chatbot، lead qualification، onboarding تلقائي" },
  { id: "startup-brand", icon: "Layers", title: "هوية بصرية", sub: "Brand Identity", desc: "Brand جذاب يبني الثقة مع الـ investors والعملاء" },
  { id: "startup-full", icon: "Package", title: "الباكاج الكامل", sub: "Full System", desc: "Web + AI + Brand — كل ما يحتاجه startup ناجح", badge: "⚡ الأوفر" },
];
export const STARTUP_PROBLEMS = [
  "🚀 بغيت نطلق بسرعة قبل المنافسين",
  "💸 ما عنديش وقت أضيع في الأشياء التقنية",
  "🌫️ ما عنديش حضور رقمي واضح",
  "📉 Conversion rate ديالي ضعيف",
  "🤖 بغيت أتوماتيزي الـ onboarding",
  "👎 الـ branding ديالي ما يعكسش vision ديالي",
  "📲 بغيت نوصل لـ investors وعملاء جدد",
  "⚡ بغيت نسكل بسرعة",
];
export const STARTUP_SITUATION = [
  "لا، هاد أول حضور رقمي لـ startup ديالي",
  "عندي موقع بسيط بغيت نحسنو",
  "عندي موقع بغيت نضيف ليه أتمتة",
];

// GENERAL/BUSINESS segment (default)
export const GENERAL_SERVICE_CARDS = [
  { id: "web", icon: "Globe", title: "موقع ويب", sub: "Web Design & Development", desc: "Landing page, portfolio, e-commerce, booking" },
  { id: "ai", icon: "Bot", title: "أتمتة بالذكاء الاصطناعي", sub: "AI Automation", desc: "WhatsApp bots, lead qualification, auto-booking" },
  { id: "brand", icon: "Layers", title: "هوية بصرية", sub: "Brand Identity", desc: "Logo, colors, brand guidelines, social media kit" },
  { id: "full", icon: "Package", title: "الباكاج الكامل", sub: "Everything", desc: "Web + AI Automation + Brand — الحل الشامل", badge: "⚡ الأكثر طلباً" },
];
export const GENERAL_PROBLEMS = [
  "😔 مكيجيش كليان من الإنترنت",
  "👎 الموقع قديم ومش professional",
  "⏰ ماعنديش وقت نرد على كل كليان",
  "🌫️ ما عنديش برصة ديجيتال واضحة",
  "📉 كنخسر كليان لمنافسين",
  "📅 الحجوزات كتاخد وقت بزاف",
  "🤖 ماعنديش أتمتة لأي شي",
  "📈 بغيت نتوسع وما قادرش وحدي",
];
export const GENERAL_SITUATION = [
  "لا، هاد أول موقع ليا",
  "عندي موقع قديم نبغي نبدلو",
  "عندي موقع نبغي نحسنو",
];

// Step 2 title/subtitle per segment
export const SEGMENT_STEP2_HEADER: Record<string, { title: string; subtitle: string }> = {
  dental: { title: "مشروع عيادتك", subtitle: "أسئلة مخصصة لعيادات الأسنان" },
  brand: { title: "مشروع البراند ديالك", subtitle: "أسئلة مخصصة للـ freelancers والـ creatives" },
  startup: { title: "مشروع الـ Startup ديالك", subtitle: "أسئلة مخصصة للـ startups والمشاريع الجديدة" },
  business: { title: "مشروعك", subtitle: "الأسئلة ديالنا كتساعدنا نبنيو ليك الحل الصح" },
  general: { title: "مشروعك", subtitle: "الأسئلة ديالنا كتساعدنا نبنيو ليك الحل الصح" },
};
