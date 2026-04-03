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
