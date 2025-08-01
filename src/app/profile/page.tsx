// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import {
  ProfileSummary,
  PropertySummary,
  ExchangeChecklist,
  ContractsCard,
} from "@/components/dashboard";
import { mockContracts } from "@/lib/data/mockContracts";
import SearchesSummary from "@/components/dashboard/SearchesSummary";
import { useAuth } from "@/contexts/AuthContext";
import {
  fetchProfile,
  fetchUserFlats,
  fetchUserSearches,
  fetchUserContracts,
} from "@/lib/api";

export default function ProfileDashboard() {
	// State for checklist progress (in real app, this would come from context/API)
	const [completedChecklistItems, setCompletedChecklistItems] = useState(new Set<string>());

        const { user: authUser } = useAuth();

        const placeholderUser = {
                name: "Emma Meier",
                email: "emmameier@example.com",
                phone: "+49 123 456 7890",
                location: "Berlin, Germany",
                memberSince: "January 2022",
                avatar: "/images/avatar-1.png",
                verified: false,
                rating: 4.8,
                reviewCount: 23,
                bio: "Software engineer and travel enthusiast. Love exploring new cities and experiencing different cultures through authentic local stays.",
                languages: ["English", "German", "Spanish"],
        };

        const [user, setUser] = useState<any>(placeholderUser);
        const [userProperty, setUserProperty] = useState<any | undefined>(undefined);
        const [userSearches, setUserSearches] = useState<any[]>([]);
        const [recentContracts, setRecentContracts] = useState<any[]>(mockContracts);

        useEffect(() => {
                if (!authUser) return;
                fetchProfile(authUser.id).then((data) => {
                        if (data) setUser(data);
                });
                fetchUserFlats().then((flats) => {
                        setUserProperty(flats[0] || undefined);
                });
                fetchUserSearches().then((data) => {
                        if (data && data.length > 0) setUserSearches(data);
                });
                fetchUserContracts().then((data) => {
                        if (data && data.length > 0) setRecentContracts(data);
                });
        }, [authUser]);

        const placeholderSearches = [
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



        const canSearch = user.verified && userProperty !== undefined;

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
                                        <SearchesSummary
                                                searches={userSearches.length > 0 ? userSearches : placeholderSearches}
                                                canSearch={canSearch}
                                        />
                                        <ContractsCard
                                                contracts={recentContracts.length > 0 ? recentContracts : mockContracts}
                                        />
				</div>

				{/* Bottom Grid - Exchange Checklist (full width) */}
				<div className="grid grid-cols-1 gap-6">
					<ExchangeChecklist completedItems={completedChecklistItems} />
				</div>
			</div>
		</ProfileLayout>
	);
}
