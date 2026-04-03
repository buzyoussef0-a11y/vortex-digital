"use server";

// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface ProjectFormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  role: string;
  city: string;
  // Step 2
  services: string[];
  websiteType: string;
  currentSituation: string;
  problems: string[];
  timeline: string;
  inspiration: string;
  filesMeta: { name: string; size: number }[];
  notes: string;
  // Step 3
  budget: string;
  contactMethod: string;
}

// ─── New structured action for /start-project page ───────────────────────────

export async function submitProjectForm(data: {
  step1: { name: string; email: string; phone: string; role: string; city: string };
  step2: {
    services: string[];
    websiteType: string;
    currentSituation: string;
    problems: string[];
    timeline: string;
    inspiration: string;
    fileNames: string[];
    notes: string;
  };
  step3: { budget: string; contactMethod: string };
}): Promise<{ success: boolean; message: string; referenceId?: string }> {
  // Validate required fields
  if (!data.step1.name.trim()) {
    return { success: false, message: "الاسم مطلوب" };
  }
  if (!data.step1.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.step1.email)) {
    return { success: false, message: "بريد إلكتروني غير صالح" };
  }
  if (!data.step1.phone.trim()) {
    return { success: false, message: "رقم الهاتف مطلوب" };
  }
  if (!data.step2.services || data.step2.services.length === 0) {
    return { success: false, message: "اختر خدمة واحدة على الأقل" };
  }
  if (!data.step3.budget) {
    return { success: false, message: "اختر ميزانيتك التقريبية" };
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const referenceId = `VDX-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  // TODO: Integrate with Resend/Nodemailer to send email notification
  console.log("New project submission:", JSON.stringify({ ...data, referenceId }, null, 2));

  return { success: true, message: "تم الإرسال", referenceId };
}

// ─── Legacy action (ContactSection embedded form) ─────────────────────────────

export async function sendProjectForm(data: ProjectFormData): Promise<{
  success: boolean;
  message: string;
  referenceId: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 1800));
  const referenceId = `VDX-${Date.now().toString(36).toUpperCase()}`;
  console.log("Project Form Submission:", { ...data, referenceId });
  return { success: true, message: "وصل الطلب ديالك بنجاح!", referenceId };
}

// Keep old action for backward compat
export async function sendContactForm(prevState: unknown, formData: FormData) {
  void formData;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const referenceId = `VDX-${Date.now().toString(36).toUpperCase()}`;
  return { success: true, message: `Message sent! Reference: ${referenceId}`, referenceId };
}
