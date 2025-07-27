// src/app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/profile/", "/admin/", "/api/", "/_next/", "/dashboard/", "/auth/", "/onboarding/"],
			},
			{
				userAgent: "Googlebot",
				allow: "/",
				disallow: ["/profile/", "/admin/", "/api/", "/_next/", "/dashboard/", "/auth/", "/onboarding/"],
			},
		],
		sitemap: "https://flatswaps.com/sitemap.xml",
	};
}
