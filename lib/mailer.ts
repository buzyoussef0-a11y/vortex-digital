import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmail({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  await transporter.sendMail({
    from: `"Vortex Digital" <${process.env.GMAIL_USER}>`,
    to: "vortexagence.digital@gmail.com",
    subject,
    html,
  });
}
