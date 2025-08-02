"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchProfile } from "@/lib/api";

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

        const { user } = useAuth();
        const [firstName, setFirstName] = useState<string | null>(null);

        useEffect(() => {
                if (!user) {
                        setFirstName(null);
                        return;
                }

                fetchProfile(user.id).then((profile) => {
                        const name =
                                profile?.firstname ||
                                user.user_metadata?.full_name?.split(" ")[0] ||
                                user.email?.split("@")[0] ||
                                null;
                        setFirstName(name);
                });
        }, [user]);

	// No navigation items needed

	return (
		<header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div className="flex-shrink-0 flex items-center">
						<Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
							<Image src="/favicon-256x256.png" alt="Flatswaps" width={256} height={256} className="h-8 w-8" />{" "}
							<span>Flatswaps</span>
						</Link>
					</div>
					{/* Right side - Auth or Profile */}
					<div className="flex items-center space-x-4">
						{/* Language Selector */}
						<div className="relative">
							<button
								onClick={() => setIsLanguageOpen(!isLanguageOpen)}
								className="flex items-center space-x-2 p-2 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
							>
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

                                                {/* Authentication Options or Profile */}
                                                <div className="flex items-center space-x-3">
                                                        {user ? (
                                                                <Link
                                                                        href="/profile"
                                                                        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-600"
                                                                >
                                                                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                                                                                {firstName ? firstName.charAt(0).toUpperCase() : "U"}
                                                                        </div>
                                                                        <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                                {firstName || "Account"}
                                                                        </span>
                                                                </Link>
                                                        ) : (
                                                                <Link
                                                                        href="/auth/signup"
                                                                        className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                                                >
                                                                        Create Account
                                                                </Link>
                                                        )}
                                                </div>

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
						{/* Mobile Language Selector */}
						<div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
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

                                                {/* Mobile Auth/Profile Section */}
                                                <div className="space-y-2">
                                                        {user ? (
                                                                <Link
                                                                        href="/profile"
                                                                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-600"
                                                                        onClick={() => setIsMenuOpen(false)}
                                                                >
                                                                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm mr-3">
                                                                                {firstName ? firstName.charAt(0).toUpperCase() : "U"}
                                                                        </div>
                                                                        <div>
                                                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{firstName || "Account"}</p>
                                                                                <p className="text-xs text-gray-500 dark:text-gray-400">View Profile</p>
                                                                        </div>
                                                                </Link>
                                                        ) : (
                                                                <Link
                                                                        href="/auth/signup"
                                                                        className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                                                                        onClick={() => setIsMenuOpen(false)}
                                                                >
                                                                        Create Account
                                                                </Link>
                                                        )}

                                                        {!user && (
                                                                <Link
                                                                        href="/auth/signin"
                                                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                                                                        onClick={() => setIsMenuOpen(false)}
                                                                >
                                                                        Sign In
                                                                </Link>
                                                        )}
                                                </div>
					</div>
				</div>
			)}
		</header>
	);
}
