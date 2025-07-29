// src/components/dashboard/ProfileSummary.tsx

import Link from "next/link";
import { User, ChevronRight, MapPin } from "lucide-react";

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
					<h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
						<User className="h-4 w-4 mr-2" />
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
                                <div className="flex items-center space-x-3">
                                        <div className="relative">
						{user.avatar ? (
							<img
								src={user.avatar}
								alt={user.name}
								className="w-12 h-12 rounded-full object-cover"
								onError={(e) => {
									// Fallback to initials if image fails
									e.currentTarget.style.display = "none";
									const fallback = e.currentTarget.nextElementSibling as HTMLElement;
									if (fallback) fallback.style.display = "flex";
								}}
							/>
						) : null}
						<div
							className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium"
							style={{ display: user.avatar ? "none" : "flex" }}
						>
							{getInitials(user.name)}
						</div>

						{/* Verification Badge */}
						{user.verified && (
							<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
								<svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
						)}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-gray-900 dark:text-white truncate">{user.name}</h3>

                                                <div className="flex items-center mt-1">
                                                        <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-300">{user.location}</span>
                                                </div>
                                        </div>
                                </div>

                                {!user.verified && (
                                        <p className="mt-4 text-sm text-yellow-600 dark:text-yellow-400">
                                                Verify your profile to unlock all features.
                                        </p>
                                )}
                        </div>
                </div>
        );
}
