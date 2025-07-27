// src/app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/providers/ThemeProviders";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

const lexend = Lexend({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-lexend",
});

export const metadata: Metadata = {
	title: "Flatswaps - Student Home Exchange Platform | Save €3000+ on Accommodation",
	description:
		"Join 25,000+ students worldwide exchanging homes safely. Free to search, pay only when you swap. Verified profiles, 100% scam protection, comprehensive insurance included.",
	keywords: [
		"student home exchange",
		"house swap",
		"student accommodation",
		"exchange students",
		"home swap platform",
		"student housing",
		"study abroad housing",
		"flat exchange",
		"student travel",
		"affordable accommodation",
	].join(", "),
	authors: [{ name: "Flatswaps Team" }],
	creator: "Flatswaps",
	publisher: "Flatswaps",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://flatswaps.com"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Flatswaps - Student Home Exchange Platform",
		description: "Join 25,000+ students worldwide exchanging homes safely. Free to search, pay only when you swap.",
		url: "https://flatswaps.com",
		siteName: "Flatswaps",
		images: [
			{
				url: "/og-image.png", // You'll need to create this
				width: 1200,
				height: 630,
				alt: "Flatswaps - Student Home Exchange Platform",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Flatswaps - Student Home Exchange Platform",
		description: "Join 25,000+ students worldwide exchanging homes safely. Free to search, pay only when you swap.",
		images: ["/og-image.png"],
		creator: "@Flatswaps",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: "your-google-verification-code", // Add your Google Search Console verification
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* Favicon Links */}
				<link rel="icon" href="/favicon.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<meta name="theme-color" content="#2563eb" />

				{/* Structured Data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebSite",
							name: "Flatswaps",
							url: "https://flatswaps.com",
							description: "Student home exchange platform connecting travelers worldwide",
							potentialAction: {
								"@type": "SearchAction",
								target: "https://flatswaps.com/search?q={search_term_string}",
								"query-input": "required name=search_term_string",
							},
						}),
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Organization",
							name: "Flatswaps",
							url: "https://flatswaps.com",
							logo: "https://flatswaps.com/favicon-256x256.png",
							description: "Student home exchange platform",
							foundingDate: "2023",
							sameAs: [
								"https://twitter.com/Flatswaps",
								"https://facebook.com/Flatswaps",
								"https://instagram.com/Flatswaps",
								"https://linkedin.com/company/Flatswaps",
							],
							contactPoint: {
								"@type": "ContactPoint",
								contactType: "customer service",
								email: "support@flatswaps.com",
							},
						}),
					}}
				/>
			</head>
			<body className={`${inter.variable} ${lexend.variable} font-sans min-h-screen flex flex-col`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<AuthProvider>{children}</AuthProvider>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
