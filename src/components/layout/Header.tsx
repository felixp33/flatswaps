// src/components/layout/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLanguageOpen, setIsLanguageOpen] = useState(false);
	const pathname = usePathname();

	// Language options
	const languages = [
		{ code: "en", name: "English", flag: "🇺🇸" },
		{ code: "es", name: "Español", flag: "🇪🇸" },
		{ code: "fr", name: "Français", flag: "🇫🇷" },
		{ code: "de", name: "Deutsch", flag: "🇩🇪" },
		{ code: "it", name: "Italiano", flag: "🇮🇹" },
	];

	const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

	// Simulate logged-in state - In real app, this would come from your auth context/state
	const isLoggedIn = true; // Change to false to see the login button
	const user = {
		name: "John Doe",
		email: "john.doe@example.com",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
	};

	// Navigation items - updated to scroll to sections on landing page
	const navigation = [
		{ name: "Home", href: "/", section: "hero" },
		{ name: "How It Works", href: "/#how-it-works", section: "how-it-works" },
		{ name: "Properties", href: "/#properties", section: "properties" },
		{ name: "Destinations", href: "/#destinations", section: "destinations" },
		{ name: "Testimonials", href: "/#testimonials", section: "testimonials" },
	];

	// Function to handle smooth scrolling to sections
	const handleSectionScroll = (e: React.MouseEvent, sectionId: string) => {
		e.preventDefault();

		// If we're not on the home page, navigate there first
		if (pathname !== "/") {
			window.location.href = `/#${sectionId}`;
			return;
		}

		// Smooth scroll to section
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div className="flex-shrink-0 flex items-center">
						<Link href="/" className="text-2xl font-bold text-blue-600">
							FlatSwaps
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex space-x-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								onClick={(e) => (item.section !== "hero" ? handleSectionScroll(e, item.section) : undefined)}
								className={`text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors ${
									pathname === item.href ? "text-blue-600 dark:text-blue-400" : ""
								}`}
							>
								{item.name}
							</Link>
						))}
					</nav>

					{/* Right side - Auth or Profile */}
					<div className="flex items-center space-x-4">
						{/* Language Selector */}
						<div className="relative">
							<button
								onClick={() => setIsLanguageOpen(!isLanguageOpen)}
								className="flex items-center space-x-2 p-2 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
							>
								<Globe className="h-4 w-4" />
								<span className="hidden sm:inline text-sm font-medium">
									{selectedLanguage.flag} {selectedLanguage.name}
								</span>
								<span className="sm:hidden text-sm">{selectedLanguage.flag}</span>
								<ChevronDown className="h-3 w-3" />
							</button>

							{/* Language Dropdown */}
							{isLanguageOpen && (
								<div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
									<div className="py-1">
										{languages.map((language) => (
											<button
												key={language.code}
												onClick={() => {
													setSelectedLanguage(language);
													setIsLanguageOpen(false);
													// In a real app, you'd trigger language change here
													console.log(`Language changed to: ${language.code}`);
												}}
												className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
													selectedLanguage.code === language.code
														? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
														: "text-gray-700 dark:text-gray-300"
												}`}
											>
												<span className="text-base">{language.flag}</span>
												<span>{language.name}</span>
											</button>
										))}
									</div>
								</div>
							)}
						</div>

						{isLoggedIn ? (
							<>
								{/* Profile Link */}
								<Link
									href="/profile"
									className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
								>
									<div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
										{user.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</div>
									<span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
										{user.name.split(" ")[0]}
									</span>
								</Link>
							</>
						) : (
							/* Sign In Button - shown when not logged in */
							<Link
								href="/login"
								className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Sign In / Register
							</Link>
						)}

						{/* Mobile menu button */}
						<button
							type="button"
							className="md:hidden bg-white dark:bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className={`h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
							<svg
								className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
					<div className="px-2 pt-2 pb-3 space-y-1">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								onClick={(e) => {
									setIsMenuOpen(false);
									if (item.section !== "hero") {
										handleSectionScroll(e, item.section);
									}
								}}
								className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
									pathname === item.href
										? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800"
										: "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
								}`}
							>
								{item.name}
							</Link>
						))}

						{/* Mobile Language Selector */}
						<div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
							<p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
								Language
							</p>
							{languages.map((language) => (
								<button
									key={language.code}
									onClick={() => {
										setSelectedLanguage(language);
										setIsMenuOpen(false);
										console.log(`Language changed to: ${language.code}`);
									}}
									className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3 ${
										selectedLanguage.code === language.code
											? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800"
											: "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
									}`}
								>
									<span className="text-lg">{language.flag}</span>
									<span>{language.name}</span>
								</button>
							))}
						</div>

						{isLoggedIn ? (
							<div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
								<Link
									href="/profile"
									className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
									onClick={() => setIsMenuOpen(false)}
								>
									<div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm mr-3">
										{user.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</div>
									<div>
										<p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">View Profile</p>
									</div>
								</Link>
							</div>
						) : (
							<Link
								href="/login"
								className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800"
								onClick={() => setIsMenuOpen(false)}
							>
								Sign In / Register
							</Link>
						)}
					</div>
				</div>
			)}
		</header>
	);
}
