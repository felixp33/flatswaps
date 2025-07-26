// src/components/profile/ProfileLayout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Search, MessageCircle, Heart, Settings } from "lucide-react";

interface ProfileLayoutProps {
	children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const pathname = usePathname();

	const navigationItems = [
		{
			name: "Home",
			href: "/profile",
			icon: Home,
		},
		{
			name: "Messages",
			href: "/profile/messages",
			icon: MessageCircle,
			badge: 3,
		},
		{
			name: "Matches",
			href: "/profile/matches",
			icon: Heart,
			badge: 5,
		},
		{
			name: "Settings",
			href: "/profile/settings",
			icon: Settings,
		},
	];

	return (
		<div className="relative">
			{/* Mobile backdrop */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			{/* Fixed Sidebar */}
			<div
				className={`fixed top-0 left-0 w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				}`}
			>
				{/* Sidebar Header */}
				<div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
					<Link href="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600">
						<Image src="/favicon-256x256.png" alt="Flatswaps" width={32} height={32} className="h-8 w-8" />
						<span>Flatswaps</span>
					</Link>
					<button
						className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
						onClick={() => setIsSidebarOpen(false)}
					>
						<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Navigation Area */}
				<div className="h-[calc(100vh-8rem)] overflow-y-auto px-2 py-4">
					<nav className="space-y-1">
						{navigationItems.map((item) => {
							const Icon = item.icon;
							const isActive = pathname === item.href;

							return (
								<Link
									key={item.name}
									href={item.href}
									className={`group flex items-center justify-between px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
										isActive
											? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
											: "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
									}`}
									onClick={() => setIsSidebarOpen(false)}
								>
									<div className="flex items-center">
										<Icon
											className={`mr-3 h-5 w-5 flex-shrink-0 ${
												isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
											}`}
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
				</div>

				{/* Sidebar Footer */}
				<div className="h-16 flex items-center px-4 border-t border-gray-200 dark:border-gray-700">
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
						Back to Flatswaps
					</Link>
				</div>
			</div>

			{/* Main Content Area */}
			<div className="lg:ml-64">
				{/* Mobile Header */}
				<div className="lg:hidden h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
					<button
						className="p-2 rounded-md text-gray-400 hover:text-gray-500"
						onClick={() => setIsSidebarOpen(true)}
					>
						<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>

				{/* Page Content */}
				<main className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</main>
			</div>
		</div>
	);
}
