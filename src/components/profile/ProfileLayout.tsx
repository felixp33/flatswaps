// src/components/profile/ProfileLayout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Home, Calendar, MessageCircle, Heart, Settings, Star, MapPin } from "lucide-react";

interface ProfileLayoutProps {
	children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const pathname = usePathname();

	// Unified navigation items - consolidating both versions
	const navigationItems = [
		{
			name: "Overview",
			href: "/profile",
			icon: User,
			description: "Personal information and account overview",
		},
		{
			name: "My Properties",
			href: "/profile/properties",
			icon: Home,
			description: "Manage your listings and property details",
		},
		{
			name: "Bookings & Swaps",
			href: "/profile/bookings",
			icon: Calendar,
			description: "View your reservations and exchanges",
		},
		{
			name: "Messages",
			href: "/profile/messages",
			icon: MessageCircle,
			description: "Communicate with other members",
			badge: 3, // Unread messages count
		},
		{
			name: "Matches",
			href: "/profile/matches",
			icon: Heart,
			description: "View potential matches and swap opportunities",
			badge: 5, // New matches count
		},
		{
			name: "Settings",
			href: "/profile/settings",
			icon: Settings,
			description: "Account preferences and privacy",
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

					{/* User profile summary */}
					<div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
						<div className="flex items-center">
							<div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
								JD
							</div>
							<div className="ml-3">
								<p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
								<p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
									<MapPin className="h-3 w-3 mr-1" />
									New York, USA
								</p>
							</div>
						</div>
						<div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
							<Star className="h-3 w-3 mr-1 text-yellow-400" />
							<span>4.9 rating • 23 reviews</span>
						</div>
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
                    group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md transition-colors
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
										<div>
											<div>{item.name}</div>
											<div className="text-xs text-gray-500 dark:text-gray-400 hidden lg:block">
												{item.description}
											</div>
										</div>
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
