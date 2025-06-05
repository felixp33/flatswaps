// src/app/profile/matches/page.tsx
"use client";

import { useState } from "react";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import ProfileLayout from "@/components/profile/ProfileLayout";
import MatchFilterBar from "@/components/matches/MatchFilterBar";
import MatchCard from "@/components/matches/MatchCard";
import { mockMatches } from "@/lib/data/mockMatches";

export default function MatchesPage() {
	const [activeFilter, setActiveFilter] = useState<string>("all");
	const matches = mockMatches;

	const filteredMatches = activeFilter === "all" ? matches : matches.filter((match) => match.status === activeFilter);

	const handleAcceptMatch = (matchId: string) => {
		console.log(`Accepting match: ${matchId}`);
		// TODO: Implement API call to accept match
	};

	const handleRejectMatch = (matchId: string) => {
		console.log(`Rejecting match: ${matchId}`);
		// TODO: Implement API call to reject match
	};

	const getFilterOptions = () => {
		return [
			{ id: "all", label: "All Matches" },
			{ id: "new", label: "New Matches" },
			{ id: "pending", label: "Pending" },
			{ id: "accepted", label: "Confirmed" },
			{ id: "rejected", label: "Cancelled" },
		];
	};

	return (
		<ProfileLayout>
			<div className="p-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Matches & Swaps</h1>
						<p className="text-gray-600 dark:text-gray-300 mt-1">
							Manage your home swap matches and communications
						</p>
					</div>
				</div>

				{/* Filter Bar */}
				<MatchFilterBar matches={matches} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

				{/* Matches List */}
				<div className="space-y-6">
					{filteredMatches.map((match) => (
						<MatchCard key={match.id} match={match} onAccept={handleAcceptMatch} onReject={handleRejectMatch} />
					))}
				</div>

				{/* Empty State */}
				{filteredMatches.length === 0 && (
					<div className="text-center py-12">
						<div className="mx-auto h-24 w-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
							<Heart className="h-8 w-8 text-gray-400" />
						</div>
						<h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
							{activeFilter === "all"
								? "No matches yet"
								: `No ${getFilterOptions()
										.find((f) => f.id === activeFilter)
										?.label.toLowerCase()} found`}
						</h3>
						<p className="text-gray-500 dark:text-gray-400 mt-2">
							{activeFilter === "all"
								? "Create searches to find your perfect swap partners."
								: "Try selecting a different filter or create new searches."}
						</p>
						<Link
							href="/profile/searches"
							className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
						>
							<Search className="h-4 w-4 mr-2" />
							Create Search
						</Link>
					</div>
				)}
			</div>
		</ProfileLayout>
	);
}
