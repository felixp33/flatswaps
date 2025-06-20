// src/components/dashboard/ProfileSummary.tsx

import Link from "next/link";
import { User, Star, Edit3, Eye, ChevronRight } from "lucide-react";

interface ProfileSummaryProps {
	user: {
		name: string;
		email: string;
		location: string;
		avatar?: string;
		verified: boolean;
		rating: number;
		reviewCount: number;
		memberSince?: string;
	};
}

export default function ProfileSummary({ user }: ProfileSummaryProps) {
	// Get initials for avatar fallback
	const getInitials = (name: string): string => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
			<div className="p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
						<User className="h-5 w-5 mr-2" />
						Your Profile
					</h2>
					<Link
						href="/profile/details"
						className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
					>
						View Details
						<ChevronRight className="h-4 w-4 ml-1" />
					</Link>
				</div>

				{/* Profile Info */}
				<div className="flex items-center space-x-4 mb-4">
					<div className="relative">
						{user.avatar ? (
							<img
								src={user.avatar}
								alt={user.name}
								className="w-16 h-16 rounded-full object-cover"
								onError={(e) => {
									// Fallback to initials if image fails
									e.currentTarget.style.display = "none";
									const fallback = e.currentTarget.nextElementSibling as HTMLElement;
									if (fallback) fallback.style.display = "flex";
								}}
							/>
						) : null}
						<div
							className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-xl"
							style={{ display: user.avatar ? "none" : "flex" }}
						>
							{getInitials(user.name)}
						</div>

						{/* Verification Badge */}
						{user.verified && (
							<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
								<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
						)}
					</div>

					<div className="flex-1">
						<div className="flex items-center">
							<h3 className="font-medium text-gray-900 dark:text-white">{user.name}</h3>
							{user.verified && (
								<span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
									Verified
								</span>
							)}
						</div>
						<p className="text-sm text-gray-600 dark:text-gray-300">{user.location}</p>
						<div className="flex items-center mt-1">
							<Star className="h-4 w-4 text-yellow-400 mr-1" />
							<span className="text-sm text-gray-600 dark:text-gray-300">
								{user.rating} ({user.reviewCount} reviews)
							</span>
						</div>
						{user.memberSince && (
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Member since {user.memberSince}</p>
						)}
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex space-x-2">
					<Link
						href="/profile/edit"
						className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
					>
						<Edit3 className="h-4 w-4 mr-2" />
						Edit Profile
					</Link>
					<Link
						href="/profile/details"
						className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
					>
						<Eye className="h-4 w-4 mr-2" />
						View Full Profile
					</Link>
				</div>

				{/* Profile Completion Indicator */}
				<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between mb-2">
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Completeness</span>
						<span className="text-sm text-gray-500 dark:text-gray-400">85%</span>
					</div>
					<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
						<div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
					</div>
					<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Add more photos to reach 100%</p>
				</div>
			</div>
		</div>
	);
}
