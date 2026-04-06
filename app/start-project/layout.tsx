import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ابدأ مشروعك | Vortex Digital",
  description:
    "ابدأ مشروعك الرقمي مع Vortex Digital. أخبرنا عن مشروعك في 3 خطوات بسيطة ونجاوبك في أقل من 24 ساعة — مجاني وبلا التزام.",
  alternates: {
    canonical: "https://vortex-digital-phi.vercel.app/start-project",
  },
  openGraph: {
    title: "ابدأ مشروعك | Vortex Digital",
    description:
      "أخبرنا عن مشروعك في 3 خطوات ونجاوبك في أقل من 24 ساعة — مجاني وبلا التزام.",
    url: "https://vortex-digital-phi.vercel.app/start-project",
    images: ["https://vortex-digital-phi.vercel.app/vortex.jpeg"],
  },
};

export default function StartProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
