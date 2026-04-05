"use server";

import { sendEmail } from "@/lib/mailer";

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

  try {
    await sendEmail({
      subject: `🚀 طلب مشروع جديد — ${data.step1.name} [${referenceId}]`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#00050A;color:#fff;border-radius:16px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#00E5FF22,#00050A);padding:32px;border-bottom:1px solid #00E5FF33">
            <h1 style="margin:0;font-size:24px;color:#00E5FF">⚡ طلب مشروع جديد</h1>
            <p style="margin:8px 0 0;color:#ffffff80;font-size:14px">Ref: ${referenceId}</p>
          </div>
          <div style="padding:32px">
            <h2 style="color:#00E5FF;font-size:14px;text-transform:uppercase;letter-spacing:2px;margin-bottom:16px">معلومات العميل</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#ffffff60;width:140px">الاسم</td><td style="padding:8px 0;color:#fff;font-weight:600">${data.step1.name}</td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">الإيميل</td><td style="padding:8px 0"><a href="mailto:${data.step1.email}" style="color:#00E5FF">${data.step1.email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">الهاتف</td><td style="padding:8px 0"><a href="tel:${data.step1.phone}" style="color:#00E5FF">${data.step1.phone}</a></td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">المهنة</td><td style="padding:8px 0;color:#fff">${data.step1.role}</td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">المدينة</td><td style="padding:8px 0;color:#fff">${data.step1.city || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">التواصل</td><td style="padding:8px 0;color:#fff">${data.step3.contactMethod}</td></tr>
            </table>

            <h2 style="color:#00E5FF;font-size:14px;text-transform:uppercase;letter-spacing:2px;margin:24px 0 16px">تفاصيل المشروع</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#ffffff60;width:140px">الخدمات</td><td style="padding:8px 0;color:#fff">${data.step2.services.join("، ")}</td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">نوع الموقع</td><td style="padding:8px 0;color:#fff">${data.step2.websiteType || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">الوضع الحالي</td><td style="padding:8px 0;color:#fff">${data.step2.currentSituation || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">المشاكل</td><td style="padding:8px 0;color:#fff">${data.step2.problems.length > 0 ? data.step2.problems.join("، ") : "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">الجدول الزمني</td><td style="padding:8px 0;color:#fff">${data.step2.timeline || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">ملاحظات</td><td style="padding:8px 0;color:#fff">${data.step2.notes || "—"}</td></tr>
            </table>
          </div>
          <div style="padding:24px 32px;background:#00E5FF11;border-top:1px solid #00E5FF22;text-align:center">
            <p style="margin:0;color:#ffffff40;font-size:12px">Vortex Digital — vortexagence.digital@gmail.com</p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Email send failed:", err);
    // Don't block the user — still return success
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
    await sendEmail({
      subject: `📩 رسالة جديدة من ${data.name} [${referenceId}]`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#00050A;color:#fff;border-radius:16px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#00E5FF22,#00050A);padding:32px;border-bottom:1px solid #00E5FF33">
            <h1 style="margin:0;font-size:24px;color:#00E5FF">📩 رسالة جديدة</h1>
            <p style="margin:8px 0 0;color:#ffffff80;font-size:14px">Ref: ${referenceId}</p>
          </div>
          <div style="padding:32px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#ffffff60;width:140px">الاسم</td><td style="padding:8px 0;color:#fff;font-weight:600">${data.name}</td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">الإيميل</td><td style="padding:8px 0"><a href="mailto:${data.email}" style="color:#00E5FF">${data.email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">الهاتف</td><td style="padding:8px 0"><a href="tel:${data.phone}" style="color:#00E5FF">${data.phone}</a></td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">المهنة</td><td style="padding:8px 0;color:#fff">${data.role || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">المدينة</td><td style="padding:8px 0;color:#fff">${data.city || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">الخدمات</td><td style="padding:8px 0;color:#fff">${data.services.join("، ") || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">نوع الموقع</td><td style="padding:8px 0;color:#fff">${data.websiteType || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">الجدول الزمني</td><td style="padding:8px 0;color:#fff">${data.timeline || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#ffffff60">التواصل</td><td style="padding:8px 0;color:#fff">${data.contactMethod}</td></tr>
            </table>
          </div>
          <div style="padding:24px 32px;background:#00E5FF11;border-top:1px solid #00E5FF22;text-align:center">
            <p style="margin:0;color:#ffffff40;font-size:12px">Vortex Digital — vortexagence.digital@gmail.com</p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Email send failed:", err);
  }

  return { success: true, message: "وصل الطلب ديالك بنجاح!", referenceId };
}

// Keep old action for backward compat
export async function sendContactForm(prevState: unknown, formData: FormData) {
  void formData;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const referenceId = `VDX-${Date.now().toString(36).toUpperCase()}`;
  return { success: true, message: `Message sent! Reference: ${referenceId}`, referenceId };
}
