import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://vortex-digital-phi.vercel.app/sitemap.xml",
    host: "https://vortex-digital-phi.vercel.app",
  };
}
