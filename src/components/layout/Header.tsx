// src/components/layout/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	// Simulate logged-in state - In real app, this would come from your auth context/state
	const isLoggedIn = true; // Change to false to see the login button
	const user = {
		name: "John Doe",
		email: "john.doe@example.com",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
	};

	// Navigation items
	const navigation = [
		{ name: "Home", href: "/" },
		{ name: "Find a Swap", href: "/find-swap" },
		{ name: "List Your Property", href: "/list-property" },
		{ name: "How It Works", href: "/how-it-works" },
	];

	return (
		<header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div className="flex-shrink-0 flex items-center">
						<Link href="/" className="text-2xl font-bold text-blue-600">
							flatswaps
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex space-x-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={`text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium ${
									pathname === item.href ? "text-blue-600 dark:text-blue-400" : ""
								}`}
							>
								{item.name}
							</Link>
						))}
					</nav>

					{/* Right side - Auth or Profile */}
					<div className="flex items-center space-x-4">
						{isLoggedIn ? (
							<>
								{/* Notifications */}
								<button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
									<Bell className="h-5 w-5" />
								</button>

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
								className={`block px-3 py-2 rounded-md text-base font-medium ${
									pathname === item.href
										? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800"
										: "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
								}`}
								onClick={() => setIsMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}

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
