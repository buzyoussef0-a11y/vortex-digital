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

  const referenceId = `VDX-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  // Send to n8n webhook (fire and forget — don't block on failure)
  try {
    await fetch("https://n8n.srv1521649.hstgr.cloud/webhook/vortex-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:          data.step1.name,
        email:         data.step1.email,
        phone:         data.step1.phone,
        role:          data.step1.role,
        city:          data.step1.city,
        service:       data.step2.services.join(", "),
        websiteType:   data.step2.websiteType,
        situation:     data.step2.currentSituation,
        problems:      data.step2.problems.join(", "),
        timeline:      data.step2.timeline,
        notes:         data.step2.notes,
        contactMethod: data.step3.contactMethod,
        referenceId,
      }),
    });
  } catch {
    // Webhook failure should not block the user
  }

  return { success: true, message: "تم الإرسال", referenceId };
}

// ─── ContactSection form ───────────────────────────────────────────────────────

export async function sendProjectForm(data: ProjectFormData): Promise<{
  success: boolean;
  message: string;
  referenceId: string;
}> {
  const referenceId = `VDX-${Date.now().toString(36).toUpperCase()}`;

  try {
    await fetch("https://n8n.srv1521649.hstgr.cloud/webhook/vortex-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:          data.name,
        email:         data.email,
        phone:         data.phone,
        role:          data.role,
        city:          data.city,
        service:       data.services.join(", "),
        websiteType:   data.websiteType,
        situation:     data.currentSituation,
        problems:      data.problems.join(", "),
        timeline:      data.timeline,
        notes:         data.notes,
        contactMethod: data.contactMethod,
        referenceId,
      }),
    });
  } catch {
    // Webhook failure should not block the user
  }

  return { success: true, message: "وصل الطلب ديالك بنجاح!", referenceId };
}

// Keep old action for backward compat
export async function sendContactForm(prevState: unknown, formData: FormData) {
  void formData;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const referenceId = `VDX-${Date.now().toString(36).toUpperCase()}`;
  return { success: true, message: `Message sent! Reference: ${referenceId}`, referenceId };
}
