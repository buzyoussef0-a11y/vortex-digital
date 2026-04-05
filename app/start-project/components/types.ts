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

export interface RoleOption {
  id: string;
  emoji: string;
  label: string;
  sub: string;
  category: string;
}

export const ROLE_OPTIONS: RoleOption[] = [
  // 💼 Entrepreneurs & Business
  { id: "business-owner",     emoji: "🏢", label: "صاحب مشروع",          sub: "Business Owner",        category: "💼 Business & Entrepreneurs" },
  { id: "startup-founder",    emoji: "🚀", label: "Startup Founder",      sub: "مؤسس شركة ناشئة",       category: "💼 Business & Entrepreneurs" },
  { id: "ceo",                emoji: "👔", label: "مدير تنفيذي / CEO",    sub: "CEO / Director",        category: "💼 Business & Entrepreneurs" },
  { id: "investor",           emoji: "💰", label: "مستثمر",               sub: "Investor",              category: "💼 Business & Entrepreneurs" },
  { id: "franchise",          emoji: "🏪", label: "صاحب فرانشايز",        sub: "Franchise Owner",       category: "💼 Business & Entrepreneurs" },
  // 🎨 Creatives & Freelancers
  { id: "freelancer",         emoji: "🎨", label: "Freelancer / مستقل",   sub: "Freelance Professional",category: "🎨 Creatives & Freelancers" },
  { id: "designer",           emoji: "✏️", label: "مصمم",                 sub: "Graphic / UI Designer", category: "🎨 Creatives & Freelancers" },
  { id: "developer",          emoji: "💻", label: "مطور / Developer",     sub: "Web / App Developer",   category: "🎨 Creatives & Freelancers" },
  { id: "photographer",       emoji: "📸", label: "مصور",                 sub: "Photographer",          category: "🎨 Creatives & Freelancers" },
  { id: "content-creator",    emoji: "🎬", label: "صانع محتوى",           sub: "Content Creator",       category: "🎨 Creatives & Freelancers" },
  { id: "copywriter",         emoji: "📝", label: "Copywriter",           sub: "كاتب محتوى",            category: "🎨 Creatives & Freelancers" },
  { id: "video-editor",       emoji: "🎥", label: "مونتير فيديو",         sub: "Video Editor",          category: "🎨 Creatives & Freelancers" },
  // 📣 Marketing & Sales
  { id: "marketing-manager",  emoji: "📊", label: "Marketing Manager",    sub: "مدير تسويق",            category: "📣 Marketing & Sales" },
  { id: "sales-manager",      emoji: "🤝", label: "مدير مبيعات",          sub: "Sales Manager",         category: "📣 Marketing & Sales" },
  { id: "social-media-mgr",   emoji: "📱", label: "Social Media Manager", sub: "مدير سوشيال ميديا",     category: "📣 Marketing & Sales" },
  { id: "brand-manager",      emoji: "💡", label: "Brand Manager",        sub: "مدير العلامة التجارية", category: "📣 Marketing & Sales" },
  { id: "influencer",         emoji: "⭐", label: "مؤثر / Influencer",    sub: "Social Media Influencer",category: "📣 Marketing & Sales" },
  // 🏥 Healthcare & Education
  { id: "doctor",             emoji: "🩺", label: "طبيب / دكتور",         sub: "Doctor / Physician",    category: "🏥 Healthcare & Education" },
  { id: "dentist",            emoji: "🦷", label: "طبيب أسنان",           sub: "Dentist",               category: "🏥 Healthcare & Education" },
  { id: "therapist",          emoji: "🧠", label: "معالج نفسي / كوتش",    sub: "Therapist / Coach",     category: "🏥 Healthcare & Education" },
  { id: "teacher",            emoji: "📚", label: "أستاذ / مدرب",         sub: "Teacher / Trainer",     category: "🏥 Healthcare & Education" },
  { id: "coach",              emoji: "🏋️", label: "كوتش / مدرب رياضي",   sub: "Coach / Fitness Trainer",category: "🏥 Healthcare & Education" },
  // 🏠 Real Estate & Trades
  { id: "real-estate",        emoji: "🏠", label: "وكيل عقارات",          sub: "Real Estate Agent",     category: "🏠 Real Estate & Trades" },
  { id: "contractor",         emoji: "🔨", label: "مقاول / بناء",         sub: "Contractor / Builder",  category: "🏠 Real Estate & Trades" },
  { id: "architect",          emoji: "📐", label: "مهندس معماري",          sub: "Architect",             category: "🏠 Real Estate & Trades" },
  // 🍽️ Food & Hospitality
  { id: "restaurant-owner",   emoji: "🍽️", label: "صاحب مطعم / كافيه",  sub: "Restaurant Owner",      category: "🍽️ Food & Hospitality" },
  { id: "chef",               emoji: "👨‍🍳", label: "طباخ / شيف",         sub: "Chef / Cook",           category: "🍽️ Food & Hospitality" },
  { id: "hotel-owner",        emoji: "🏨", label: "صاحب فندق / رياض",     sub: "Hotel / Riad Owner",    category: "🍽️ Food & Hospitality" },
  // 🛒 E-Commerce & Retail
  { id: "ecommerce-seller",   emoji: "🛒", label: "بائع إلكتروني",        sub: "E-Commerce Seller",     category: "🛒 E-Commerce & Retail" },
  { id: "dropshipper",        emoji: "📦", label: "Dropshipper",          sub: "دروبشيبر",              category: "🛒 E-Commerce & Retail" },
  { id: "retailer",           emoji: "🏪", label: "تاجر / محل تجاري",     sub: "Retailer",              category: "🛒 E-Commerce & Retail" },
  // ✨ Other
  { id: "other",              emoji: "✨", label: "أخرى / Other",         sub: "غير مذكورة",            category: "✨ Other" },
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
    id: "full",
    icon: "Package",
    title: "الباكاج الكامل",
    sub: "Web + AI Automation",
    desc: "موقع ويب احترافي + أتمتة ذكية — الحل الشامل لمشروعك",
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
  { id: "gt30k", label: "30,000 MAD+", desc: "مشاريع كبيرة — web + AI automation شاملة", pct: 90 },
  { id: "discuss", label: "نتكلمو — مابغيتش نحدد دابا", desc: "نتناقشو أولاً ونشوفو مع بعض", pct: 0 },
];

export const CONTACT_METHODS: { id: "whatsapp" | "email" | "call"; label: string }[] = [
  { id: "whatsapp", label: "📱 WhatsApp" },
  { id: "email", label: "📧 Email" },
  { id: "call", label: "📞 مكالمة" },
];

export const SERVICE_LABELS: Record<string, string> = {
  web: "موقع ويب", ai: "AI Automation", full: "الباكاج الكامل",
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

// Vortex Digital offers: Website Creation + AI Automation
export const ALL_SERVICES: ServiceOption[] = [
  // 🌐 إنشاء المواقع
  { id: "landing-page",       label: "Landing Page",               labelEn: "Landing Page",                  category: "🌐 إنشاء المواقع", emoji: "🌐", roles: ["startup-founder","marketing-manager","sales-manager","social-media-mgr","brand-manager","influencer","content-creator","copywriter","other"] },
  { id: "business-website",   label: "موقع شركة / مشروع",         labelEn: "Business Website",              category: "🌐 إنشاء المواقع", emoji: "🏢", roles: ["business-owner","ceo","franchise","investor","marketing-manager","sales-manager","retailer"] },
  { id: "ecommerce",          label: "متجر إلكتروني",             labelEn: "E-Commerce Store",              category: "🌐 إنشاء المواقع", emoji: "🛒", roles: ["ecommerce-seller","dropshipper","retailer","business-owner","fashion-store"] },
  { id: "booking-website",    label: "موقع مع نظام حجز أونلاين",  labelEn: "Website + Booking System",      category: "🌐 إنشاء المواقع", emoji: "📅", roles: ["doctor","dentist","therapist","coach","teacher","hotel-owner","restaurant-owner","contractor","architect"] },
  { id: "clinic-website",     label: "موقع عيادة / طبيب",         labelEn: "Clinic / Doctor Website",       category: "🌐 إنشاء المواقع", emoji: "🏥", roles: ["doctor","dentist","therapist"] },
  { id: "restaurant-website", label: "موقع مطعم / كافيه",         labelEn: "Restaurant Website",            category: "🌐 إنشاء المواقع", emoji: "🍽️", roles: ["restaurant-owner","chef","hotel-owner"] },
  { id: "real-estate-website",label: "موقع عقارات",               labelEn: "Real Estate Website",           category: "🌐 إنشاء المواقع", emoji: "🏠", roles: ["real-estate","contractor"] },
  { id: "portfolio",          label: "موقع Portfolio شخصي",       labelEn: "Portfolio Website",             category: "🌐 إنشاء المواقع", emoji: "💼", roles: ["freelancer","designer","photographer","architect","video-editor","copywriter","chef"] },
  { id: "redesign",           label: "إعادة تصميم موقع قديم",     labelEn: "Website Redesign",              category: "🌐 إنشاء المواقع", emoji: "🔄", roles: [] },
  // 🤖 الأتمتة بالذكاء الاصطناعي
  { id: "whatsapp-bot",       label: "بوت WhatsApp ذكي",          labelEn: "WhatsApp AI Bot",               category: "🤖 الأتمتة بالذكاء الاصطناعي", emoji: "💬", roles: ["business-owner","ceo","franchise","doctor","dentist","therapist","restaurant-owner","hotel-owner","real-estate","ecommerce-seller","retailer","contractor"] },
  { id: "chatbot",            label: "Chatbot لموقعك",            labelEn: "AI Website Chatbot",            category: "🤖 الأتمتة بالذكاء الاصطناعي", emoji: "🤖", roles: ["business-owner","startup-founder","ecommerce-seller","doctor","real-estate","marketing-manager"] },
  { id: "lead-automation",    label: "أتمتة جمع العملاء",         labelEn: "Lead Generation Automation",    category: "🤖 الأتمتة بالذكاء الاصطناعي", emoji: "📊", roles: ["marketing-manager","sales-manager","business-owner","startup-founder","real-estate","brand-manager"] },
  { id: "booking-automation", label: "أتمتة الحجوزات",            labelEn: "Booking Automation",            category: "🤖 الأتمتة بالذكاء الاصطناعي", emoji: "📅", roles: ["doctor","dentist","therapist","coach","restaurant-owner","hotel-owner","contractor","teacher"] },
  { id: "crm-automation",     label: "أتمتة CRM / متابعة العملاء",labelEn: "CRM Automation",               category: "🤖 الأتمتة بالذكاء الاصطناعي", emoji: "🗂️", roles: ["business-owner","ceo","sales-manager","real-estate","ecommerce-seller"] },
  { id: "ai-content",         label: "توليد محتوى بالذكاء الاصطناعي",labelEn: "AI Content Generation",    category: "🤖 الأتمتة بالذكاء الاصطناعي", emoji: "✍️", roles: ["content-creator","copywriter","marketing-manager","social-media-mgr","influencer","brand-manager"] },
  // ⚡ الباكاج الكامل
  { id: "full-package",       label: "الباكاج الكامل — ويب + أتمتة ذكية", labelEn: "Full Package (Web + AI Automation)", category: "⚡ الباكاج الكامل", emoji: "⚡", roles: [] },
];

// ─── Segment-specific Step 2 data ────────────────────────────────────────────

// Maps role id → segment key
export const ROLE_TO_SEGMENT: Record<string, string> = {
  "business-owner": "business", "ceo": "business", "investor": "business", "franchise": "business",
  "startup-founder": "startup", "developer": "startup",
  "freelancer": "brand", "designer": "brand", "photographer": "brand", "copywriter": "brand",
  "content-creator": "brand", "video-editor": "brand",
  "marketing-manager": "business", "sales-manager": "business", "social-media-mgr": "business",
  "brand-manager": "brand", "influencer": "brand",
  "doctor": "dental", "dentist": "dental", "therapist": "dental",
  "teacher": "brand", "coach": "brand",
  "real-estate": "business", "contractor": "business", "architect": "brand",
  "restaurant-owner": "business", "chef": "brand", "hotel-owner": "business",
  "ecommerce-seller": "business", "dropshipper": "startup", "retailer": "business",
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
  { id: "brand-web", icon: "Globe", title: "موقع Portfolio", sub: "Portfolio Website", desc: "موقع يعرض شغلك ويجيب ليك كلياني جدد — احترافي ومميز" },
  { id: "brand-ai", icon: "Bot", title: "أتمتة بالذكاء الاصطناعي", sub: "AI Automation", desc: "بوت WhatsApp يرد على الكلياني ويجدول المواعيد تلقائياً" },
  { id: "brand-full", icon: "Package", title: "الباكاج الكامل", sub: "Web + AI Automation", desc: "موقع portfolio احترافي + أتمتة ذكية — الحل الشامل", badge: "⚡ الأكثر طلباً" },
];
export const BRAND_PROBLEMS = [
  "👎 برصتي الديجيتال ما تعكسش مستواي",
  "📉 كنخسر كلياني لمنافسين بشغل أضعف",
  "🌫️ ما عنديش موقع يعرض شغلي",
  "⏰ كنضيع وقت كثير في التواصل مع الكلياني",
  "🤷 الكلياني ما كيفهموش قيمة شغلي",
  "📲 بغيت نوصل لكلياني أحسن على الإنترنت",
  "🤖 ماعنديش أي أتمتة في شغلي",
  "📅 الحجوزات والمواعيد كتاخد وقت بزاف",
];
export const BRAND_SITUATION = [
  "لا، هاد أول موقع ليا",
  "عندي موقع قديم بغيت نجددو",
  "عندي موقع بغيت نضيف ليه أتمتة ذكية",
];

// STARTUP segment
export const STARTUP_SERVICE_CARDS = [
  { id: "startup-web", icon: "Globe", title: "موقع المشروع", sub: "Product Website", desc: "Landing page أو full product site — يحول الزوار لعملاء" },
  { id: "startup-ai", icon: "Bot", title: "AI Automation", sub: "Smart Systems", desc: "Chatbot، lead qualification، onboarding تلقائي" },
  { id: "startup-full", icon: "Package", title: "الباكاج الكامل", sub: "Web + AI Automation", desc: "موقع احترافي + أتمتة ذكية — كل ما يحتاجه startup ناجح", badge: "⚡ الأوفر" },
];
export const STARTUP_PROBLEMS = [
  "🚀 بغيت نطلق بسرعة قبل المنافسين",
  "💸 ما عنديش وقت أضيع في الأشياء التقنية",
  "🌫️ ما عنديش حضور رقمي واضح",
  "📉 Conversion rate ديالي ضعيف",
  "🤖 بغيت أتوماتيزي الـ onboarding",
  "👎 موقعي ما يعكسش vision ديالي",
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
  { id: "web", icon: "Globe", title: "موقع ويب", sub: "Web Design & Development", desc: "Landing page, portfolio, e-commerce, booking — احترافي ومميز" },
  { id: "ai", icon: "Bot", title: "أتمتة بالذكاء الاصطناعي", sub: "AI Automation", desc: "WhatsApp bots، lead qualification، auto-booking — يشتغل 24/7" },
  { id: "full", icon: "Package", title: "الباكاج الكامل", sub: "Web + AI Automation", desc: "موقع ويب احترافي + أتمتة ذكية — الحل الشامل لمشروعك", badge: "⚡ الأكثر طلباً" },
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
