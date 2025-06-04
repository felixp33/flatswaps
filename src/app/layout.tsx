// src/app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/providers/ThemeProviders";

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
	title: "FlatSwaps - Property Rental & Home Exchange",
	description: "Find your perfect stay or swap your home with other travelers around the world.",
	keywords: "home swap, house exchange, vacation rental, property rental, flatswaps",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} ${lexend.variable} font-sans min-h-screen flex flex-col`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
