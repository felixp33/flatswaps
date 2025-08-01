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
import { fetchDashboardData } from "@/lib/api";

export default function ProfileDashboard() {
	// State for checklist progress (in real app, this would come from context/API)
	const [completedChecklistItems, setCompletedChecklistItems] = useState(new Set<string>());

        const { user: authUser } = useAuth();


        const [user, setUser] = useState<any | null>(null);
        const [userProperty, setUserProperty] = useState<any | undefined>(undefined);
        const [userSearches, setUserSearches] = useState<any[]>([]);
        const [recentContracts, setRecentContracts] = useState<any[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
                if (!authUser) return;
                setLoading(true);
                fetchDashboardData()
                        .then((data) => {
                                if (data.error) {
                                        setError(data.error);
                                        return;
                                }
                                if (data.profile) setUser(data.profile);
                                if (data.flats && data.flats.length > 0)
                                        setUserProperty(data.flats[0]);
                                setUserSearches(data.searches || []);
                                setRecentContracts(data.contracts || []);
                        })
                        .catch((err) => {
                                console.error(err);
                                setError("Failed to load dashboard data");
                        })
                        .finally(() => setLoading(false));
        }, [authUser]);

        const canSearch = user?.verified && userProperty !== undefined;

        if (loading) {
                return (
                        <ProfileLayout>
                                <div className="p-6">Loading...</div>
                        </ProfileLayout>
                );
        }

        if (error) {
                return (
                        <ProfileLayout>
                                <div className="p-6 text-red-500">{error}</div>
                        </ProfileLayout>
                );
        }

        return (
                <ProfileLayout>
			<div className="p-6 max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
                                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                                Welcome back, {user ? user.name.split(" ")[0] : ""}!
                                        </h1>
					<p className="text-gray-600 dark:text-gray-300">Here's an overview of your Flatswaps activity</p>
				</div>

				{/* Top Grid - Profile and Property */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                        {user ? (
                                                <ProfileSummary user={user} />
                                        ) : (
                                                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">Loading...</div>
                                        )}
                                        <PropertySummary property={userProperty} />
                                </div>

				{/* Middle Grid - Searches and Contracts */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                        <SearchesSummary searches={userSearches} canSearch={canSearch} />
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
