// src/components/profile/ProfileLayout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Home, Search, MessageCircle, Heart, Settings, Star, MapPin } from "lucide-react";

interface ProfileLayoutProps {
	children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const pathname = usePathname();

	// Updated navigation items with Searches replacing Bookings & Swaps
	const navigationItems = [
		{
			name: "Profile",
			href: "/profile",
			icon: User,
		},
		{
			name: "My Flat",
			href: "/profile/properties",
			icon: Home,
		},
		{
			name: "Searches",
			href: "/profile/searches",
			icon: Search,
		},
		{
			name: "Messages",
			href: "/profile/messages",
			icon: MessageCircle,
			badge: 3, // Unread messages count
		},
		{
			name: "Matches",
			href: "/profile/matches",
			icon: Heart,
			badge: 5, // New matches count
		},
		{
			name: "Settings",
			href: "/profile/settings",
			icon: Settings,
		},
	];

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
			{/* Mobile sidebar backdrop */}
			{isSidebarOpen && (
				<div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}>
					<div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
				</div>
			)}

			{/* Sidebar */}
			<div
				className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex lg:flex-col
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
			>
				<div className="flex flex-col h-full">
					{/* Sidebar header */}
					<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
						<Link href="/" className="text-xl font-bold text-blue-600">
							flatswaps
						</Link>
						<button
							className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
							onClick={() => setIsSidebarOpen(false)}
						>
							<span className="sr-only">Close sidebar</span>
							<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					{/* Navigation */}
					<nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
						{navigationItems.map((item) => {
							const Icon = item.icon;
							const isActive = pathname === item.href;

							return (
								<Link
									key={item.name}
									href={item.href}
									className={`
                    group flex items-center justify-between px-3 py-3 text-sm font-medium rounded-lg transition-colors
                    ${
								isActive
									? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
									: "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
							}
                  `}
									onClick={() => setIsSidebarOpen(false)}
								>
									<div className="flex items-center">
										<Icon
											className={`
                        mr-3 h-5 w-5 flex-shrink-0
                        ${isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"}
                      `}
										/>
										<span>{item.name}</span>
									</div>
									{item.badge && (
										<span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
											{item.badge}
										</span>
									)}
								</Link>
							);
						})}
					</nav>

					{/* Sidebar footer */}
					<div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
						<Link
							href="/"
							className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
						>
							<svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
							Back to FlatSwaps
						</Link>
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 flex flex-col min-w-0">
				{/* Mobile header */}
				<div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex-shrink-0">
					<button
						className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
						onClick={() => setIsSidebarOpen(true)}
					>
						<span className="sr-only">Open sidebar</span>
						<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>

				{/* Page content */}
				<main className="flex-1 overflow-hidden">{children}</main>
			</div>
		</div>
	);
}
