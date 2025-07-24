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
	title: "Flatswaps",
	description: "Find your perfect stay or swap your home with other travelers around the world.",
	keywords: "home swap, house exchange, exchange students, Flatswaps",
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
