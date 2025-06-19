// src/app/profile/page.tsx
"use client";

import { useState } from "react";
import {
	User,
	Home,
	FileText,
	Eye,
	Edit3,
	Plus,
	Calendar,
	MapPin,
	Star,
	Users,
	Mail,
	Phone,
	Building,
	ChevronRight,
	Activity,
	MessageCircle,
	Heart,
	Search,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProfileLayout from "@/components/profile/ProfileLayout";

export default function ProfileDashboard() {
	const [showProfileDetails, setShowProfileDetails] = useState(false);
	const [showPropertyDetails, setShowPropertyDetails] = useState(false);

	// Mock user data - in real app this would come from your auth/user context
	const user = {
		name: "Emma Meier",
		email: "emmameier@example.com",
		phone: "+49 123 456 7890",
		location: "Berlin, Germany",
		memberSince: "January 2024",
		avatar: "/images/avatar-1.png", // Using local image path
		verified: true,
		rating: 4.8,
		reviewCount: 23,
		bio: "Software engineer and travel enthusiast. Love exploring new cities and experiencing different cultures through authentic local stays.",
		languages: ["English", "German", "Spanish"],
	};

	// Mock property data
	const userProperty = {
		id: "1",
		title: "Modern Loft in Mitte",
		description: "Beautiful 2-bedroom loft in the heart of Berlin. Perfect for exploring the city!",
		location: "Berlin, Germany",
		bedrooms: 2,
		bathrooms: 1,
		guests: 4,
		size: 75,
		rent: 1200,
		images: [
			"/images/flat/living-room-main.png", // Using local image path
		],
		amenities: {
			general: ["WiFi", "Kitchen", "Heating", "Washer"],
			interior: ["Modern Furniture", "Hardwood Floors", "Large Windows"],
		},
	};

	// Mock contracts data
	const recentContracts = [];

	// Mock activity stats
	const activityStats = {
		activeSearches: 3,
		newMatches: 5,
		unreadMessages: 3,
		totalSwaps: 8,
	};

	return (
		<ProfileLayout>
			<div className="p-6 max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
						Welcome back, {user.name.split(" ")[0]}!
					</h1>
					<p className="text-gray-600 dark:text-gray-300">Here's an overview of your FlatSwaps activity</p>
				</div>

				{/* Main Dashboard Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
					{/* Profile Card */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
									<User className="h-5 w-5 mr-2" />
									Your Profile
								</h2>
								<Link
									href="/profile/details"
									className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
								>
									View Details
									<ChevronRight className="h-4 w-4 ml-1" />
								</Link>
							</div>

							{/* Profile Summary */}
							<div className="flex items-center space-x-4 mb-4">
								<div className="relative">
									{user.avatar ? (
										<Image
											src={user.avatar}
											alt={user.name}
											width={64}
											height={64}
											className="rounded-full"
											onError={(e) => {
												// Fallback to placeholder if image fails to load
												e.currentTarget.style.display = "none";
												const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
												if (nextSibling) {
													nextSibling.style.display = "flex";
												}
											}}
										/>
									) : null}
									<div
										className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-xl"
										style={{ display: user.avatar ? "none" : "flex" }}
									>
										{user.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</div>
								</div>
								<div>
									<h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
										{user.name}
										{user.verified && (
											<span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
												Verified
											</span>
										)}
									</h3>
									<div className="flex items-center text-gray-600 dark:text-gray-300">
										<MapPin className="h-4 w-4 mr-1" />
										{user.location}
									</div>
									<div className="flex items-center text-yellow-500">
										<Star className="h-4 w-4 mr-1 fill-current" />
										<span className="text-gray-900 dark:text-white font-medium">{user.rating}</span>
										<span className="text-gray-600 dark:text-gray-300 ml-1">
											({user.reviewCount} reviews)
										</span>
									</div>
								</div>
							</div>

							{/* Profile Details (Expandable) */}
							{showProfileDetails && (
								<div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
									<div>
										<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
											Contact Information
										</h4>
										<div className="space-y-2">
											<div className="flex items-center text-gray-600 dark:text-gray-300">
												<Mail className="h-4 w-4 mr-3" />
												{user.email}
											</div>
											<div className="flex items-center text-gray-600 dark:text-gray-300">
												<Phone className="h-4 w-4 mr-3" />
												{user.phone}
											</div>
										</div>
									</div>

									<div>
										<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">About</h4>
										<p className="text-gray-600 dark:text-gray-300 text-sm">{user.bio}</p>
									</div>

									<div>
										<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Languages</h4>
										<div className="flex flex-wrap gap-2">
											{user.languages.map((language, index) => (
												<span
													key={index}
													className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
												>
													{language}
												</span>
											))}
										</div>
									</div>

									<div className="flex space-x-3 pt-2">
										<Link
											href="/profile/details"
											className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
										>
											<Edit3 className="h-4 w-4 mr-2" />
											Edit Profile
										</Link>
										<Link
											href="/profile/details"
											className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
										>
											<Eye className="h-4 w-4 mr-2" />
											View Full Profile
										</Link>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Property Card */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
									<Home className="h-5 w-5 mr-2" />
									Your Property
								</h2>
								<Link
									href="/profile/properties"
									className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
								>
									View Details
									<ChevronRight className="h-4 w-4 ml-1" />
								</Link>
							</div>

							{/* Property Summary */}
							<div className="flex space-x-4 mb-4">
								<div className="relative">
									{userProperty.images[0] ? (
										<Image
											src={userProperty.images[0]}
											alt={userProperty.title}
											width={80}
											height={80}
											className="rounded-lg object-cover"
											onError={(e) => {
												// Fallback to placeholder if image fails to load
												e.currentTarget.style.display = "none";
												const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
												if (nextSibling) {
													nextSibling.style.display = "flex";
												}
											}}
										/>
									) : null}
									<div
										className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center"
										style={{ display: userProperty.images[0] ? "none" : "flex" }}
									>
										<Home className="h-8 w-8 text-gray-400" />
									</div>
								</div>
								<div className="flex-1">
									<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
										{userProperty.title}
									</h3>
									<div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-2">
										<MapPin className="h-4 w-4 mr-1" />
										{userProperty.location}
									</div>
									<div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
										<div className="flex items-center">
											<Building className="h-4 w-4 mr-1" />
											{userProperty.bedrooms} bed, {userProperty.bathrooms} bath
										</div>
										<div className="flex items-center">
											<Users className="h-4 w-4 mr-1" />
											{userProperty.guests} guests
										</div>
									</div>
								</div>
							</div>

							{/* Property Details (Expandable) */}
							{showPropertyDetails && (
								<div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
									<div>
										<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Description</h4>
										<p className="text-gray-600 dark:text-gray-300 text-sm">{userProperty.description}</p>
									</div>

									<div>
										<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Features</h4>
										<div className="flex flex-wrap gap-2">
											{[...userProperty.amenities.general, ...userProperty.amenities.interior]
												.slice(0, 6)
												.map((amenity, index) => (
													<span
														key={index}
														className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
													>
														{amenity}
													</span>
												))}
										</div>
									</div>

									<div className="flex space-x-3 pt-2">
										<Link
											href="/profile/properties/edit"
											className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
										>
											<Edit3 className="h-4 w-4 mr-2" />
											Edit Property
										</Link>
										<Link
											href="/profile/properties"
											className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
										>
											<Eye className="h-4 w-4 mr-2" />
											Manage Property
										</Link>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Contracts Card */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="p-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
								<FileText className="h-5 w-5 mr-2" />
								Contracts
							</h2>
						</div>

						{recentContracts.length === 0 && (
							<div className="text-center py-8">
								<FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
								<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">No contracts yet</h3>
								<p className="text-sm text-gray-600 dark:text-gray-300">
									Start matching with other users to create swap contracts
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</ProfileLayout>
	);
}
