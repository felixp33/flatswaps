// src/app/profile/page.tsx
"use client";

import { useState } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { ProfileSummary, PropertySummary, ExchangeChecklist, ContractsCard } from "@/components/dashboard";
import { mockContracts } from "@/lib/data/mockContracts";
import SearchesSummary from "@/components/dashboard/SearchesSummary";

export default function ProfileDashboard() {
	// State for checklist progress (in real app, this would come from context/API)
	const [completedChecklistItems, setCompletedChecklistItems] = useState(new Set<string>());

	// Mock user data - in real app this would come from your auth/user context
	const user = {
		name: "Emma Meier",
		email: "emmameier@example.com",
		phone: "+49 123 456 7890",
		location: "Berlin, Germany",
		memberSince: "January 2022",
		avatar: "/images/avatar-1.png",
		verified: true,
		rating: 4.8,
		reviewCount: 23,
		bio: "Software engineer and travel enthusiast. Love exploring new cities and experiencing different cultures through authentic local stays.",
		languages: ["English", "German", "Spanish"],
	};

	// Mock property data - in real app this would come from API
	const userProperty = {
		id: "1",
		title: "Modern Loft in Mitte",
		description: "Beautiful 2-bedroom loft in the heart of Berlin. Perfect for exploring the city!",
		location: "Berlin, Germany",
		bedrooms: 2,
		bathrooms: 1,
		guests: 4,
		size: 75,
		images: ["/images/flat/living-room-main.png"],
		rating: 4.9,
		reviewCount: 12,
		isActive: true,
	};

	// Mock searches data - in real app this would come from API
	const userSearches = [
		{
			id: "1",
			name: "Summer in Barcelona",
			location: "Barcelona, Spain",
			isActive: true,
			newMatches: 3,
			matchCount: 12,
		},
		{
			id: "2",
			name: "Tokyo Adventure",
			location: "Tokyo, Japan",
			isActive: false,
			newMatches: 0,
			matchCount: 8,
		},
		{
			id: "3",
			name: "London Business Trip",
			location: "London, UK",
			isActive: true,
			newMatches: 2,
			matchCount: 15,
		},
	];

	// Mock contracts data
	const recentContracts = mockContracts;

	return (
		<ProfileLayout>
			<div className="p-6 max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
						Welcome back, {user.name.split(" ")[0]}!
					</h1>
					<p className="text-gray-600 dark:text-gray-300">Here's an overview of your Flatswaps activity</p>
				</div>

				{/* Top Grid - Profile and Property */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
					<ProfileSummary user={user} />
					<PropertySummary property={userProperty} />
				</div>

				{/* Middle Grid - Searches and Contracts */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
					<SearchesSummary searches={userSearches} />
					<ContractsCard contracts={recentContracts} />
				</div>

				{/* Bottom Grid - Exchange Checklist (full width) */}
				<div className="grid grid-cols-1 gap-6">
					<ExchangeChecklist completedItems={completedChecklistItems} />
				</div>
			</div>
		</ProfileLayout>
	);
}
