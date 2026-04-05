"use server";

// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface ProjectFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  city: string;
  services: string[];
  websiteType: string;
  currentSituation: string;
  problems: string[];
  timeline: string;
  inspiration: string;
  filesMeta: { name: string; size: number }[];
  notes: string;
  budget: string;
  contactMethod: string;
}

// ─── /start-project wizard ────────────────────────────────────────────────────

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
  step3: { contactMethod: string };
}): Promise<{ success: boolean; message: string; referenceId?: string }> {
  if (!data.step1.name.trim())
    return { success: false, message: "الاسم مطلوب" };
  if (!data.step1.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.step1.email))
    return { success: false, message: "بريد إلكتروني غير صالح" };
  if (!data.step1.phone.trim())
    return { success: false, message: "رقم الهاتف مطلوب" };
  if (!data.step2.services || data.step2.services.length === 0)
    return { success: false, message: "اختر خدمة واحدة على الأقل" };

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const referenceId = `VDX-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  return { success: true, message: "تم الإرسال", referenceId };
}

// ─── ContactSection form ───────────────────────────────────────────────────────

export async function sendProjectForm(data: ProjectFormData): Promise<{
  success: boolean;
  message: string;
  referenceId: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const referenceId = `VDX-${Date.now().toString(36).toUpperCase()}`;
  return { success: true, message: "وصل الطلب ديالك بنجاح!", referenceId };
}

// Keep old action for backward compat
export async function sendContactForm(prevState: unknown, formData: FormData) {
  void formData;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const referenceId = `VDX-${Date.now().toString(36).toUpperCase()}`;
  return { success: true, message: `Message sent! Reference: ${referenceId}`, referenceId };
}
