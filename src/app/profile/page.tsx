// src/app/profile/page.tsx
import ProfileLayout from "@/components/profile/ProfileLayout";
import { User, MapPin, Calendar, Star, Shield, Mail, Phone, Edit3, Home, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function ProfileOverview() {
	// Mock user data - in real app, this would come from your authentication system
	const user = {
		name: "John Doe",
		email: "john.doe@example.com",
		phone: "+1 (555) 123-4567",
		location: "New York, USA",
		memberSince: "January 2023",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
		bio: "I'm a software engineer who loves to travel and experience different cultures. I've been using FlatSwaps for over a year and have had amazing experiences staying in unique homes around the world.",
		rating: 4.9,
		reviewCount: 23,
		verifications: {
			identity: true,
			email: true,
			phone: true,
			government: false,
		},
		stats: {
			properties: 2,
			completedSwaps: 8,
			totalNights: 45,
			responseRate: 98,
		},
	};

	return (
		<ProfileLayout>
			<div className="p-6 space-y-6">
				{/* Header */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="p-6">
						<div className="flex flex-col lg:flex-row lg:items-center justify-between">
							<div className="flex items-center space-x-4">
								<div className="relative h-20 w-20 rounded-full overflow-hidden">
									<Image src={user.avatar} alt={user.name} fill className="object-cover" />
								</div>
								<div>
									<h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
									<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
										<MapPin className="h-4 w-4 mr-1" />
										{user.location}
									</div>
									<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
										<Calendar className="h-4 w-4 mr-1" />
										Member since {user.memberSince}
									</div>
								</div>
							</div>
							<button className="mt-4 lg:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<Edit3 className="h-4 w-4 mr-2" />
								Edit Profile
							</button>
						</div>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{[
						{ label: "Properties Listed", value: user.stats.properties, icon: Home },
						{ label: "Completed Swaps", value: user.stats.completedSwaps, icon: MessageCircle },
						{ label: "Nights Hosted", value: user.stats.totalNights, icon: Calendar },
						{ label: "Response Rate", value: `${user.stats.responseRate}%`, icon: Star },
					].map((stat, index) => {
						const Icon = stat.icon;
						return (
							<div
								key={index}
								className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
							>
								<div className="flex items-center">
									<Icon className="h-8 w-8 text-blue-500" />
									<div className="ml-3">
										<p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Personal Information */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="p-6">
							<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
							<div className="space-y-4">
								<div className="flex items-center">
									<Mail className="h-5 w-5 text-gray-400 mr-3" />
									<div>
										<p className="text-sm font-medium text-gray-900 dark:text-white">{user.email}</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
									</div>
								</div>
								<div className="flex items-center">
									<Phone className="h-5 w-5 text-gray-400 mr-3" />
									<div>
										<p className="text-sm font-medium text-gray-900 dark:text-white">{user.phone}</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
									</div>
								</div>
								<div className="flex items-center">
									<MapPin className="h-5 w-5 text-gray-400 mr-3" />
									<div>
										<p className="text-sm font-medium text-gray-900 dark:text-white">{user.location}</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Verifications */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="p-6">
							<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Verifications</h2>
							<div className="space-y-3">
								{[
									{ label: "Identity Verified", verified: user.verifications.identity },
									{ label: "Email Verified", verified: user.verifications.email },
									{ label: "Phone Verified", verified: user.verifications.phone },
									{ label: "Government ID", verified: user.verifications.government },
								].map((item, index) => (
									<div key={index} className="flex items-center justify-between">
										<span className="text-sm text-gray-900 dark:text-white">{item.label}</span>
										<div className="flex items-center">
											{item.verified ? (
												<>
													<Shield className="h-4 w-4 text-green-500 mr-2" />
													<span className="text-xs text-green-600 dark:text-green-400">Verified</span>
												</>
											) : (
												<>
													<Shield className="h-4 w-4 text-gray-400 mr-2" />
													<span className="text-xs text-gray-500 dark:text-gray-400">Not verified</span>
												</>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Bio */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="p-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Me</h2>
						<p className="text-gray-600 dark:text-gray-300 leading-relaxed">{user.bio}</p>
					</div>
				</div>

				{/* Reviews Summary */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="p-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Reviews</h2>
							<button className="text-sm text-blue-600 hover:text-blue-500">View all reviews</button>
						</div>
						<div className="flex items-center">
							<div className="flex items-center">
								<Star className="h-5 w-5 text-yellow-400 mr-1" />
								<span className="text-lg font-semibold text-gray-900 dark:text-white">{user.rating}</span>
							</div>
							<span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({user.reviewCount} reviews)</span>
						</div>
					</div>
				</div>
			</div>
		</ProfileLayout>
	);
}
