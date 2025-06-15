// src/app/profile/matches/page.tsx
"use client";

import { useState, Suspense, useEffect } from "react";
import { Heart, Search, Filter, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import ProfileLayout from "@/components/profile/ProfileLayout";
import MatchFilterBar from "@/components/matches/MatchFilterBar";
import MatchCard from "@/components/matches/MatchCard";
import { mockMatches } from "@/lib/data/mockMatches";

function MatchesPageContent() {
	const searchParams = useSearchParams();
	const router = useRouter();

	// Initialize filters from URL params or defaults
	const [activeStatusFilter, setActiveStatusFilter] = useState<string>(searchParams.get("status") || "all");
	const [activeSearchFilter, setActiveSearchFilter] = useState<string>(searchParams.get("search") || "all");
	const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
	const matches = mockMatches;

	// Update URL when filters change
	const updateURL = (status: string, search: string) => {
		const params = new URLSearchParams();
		if (status !== "all") params.set("status", status);
		if (search !== "all") params.set("search", search);

		const queryString = params.toString();
		const newUrl = queryString ? `/profile/matches?${queryString}` : "/profile/matches";
		router.replace(newUrl, { scroll: false });
	};

	// Handle status filter changes
	const handleStatusFilterChange = (newStatus: string) => {
		setActiveStatusFilter(newStatus);
		updateURL(newStatus, activeSearchFilter);
	};

	// Handle search filter changes
	const handleSearchFilterChange = (newSearch: string) => {
		setActiveSearchFilter(newSearch);
		updateURL(activeStatusFilter, newSearch);
	};

	// Apply both filters
	const filteredMatches = matches.filter((match) => {
		const statusMatch = activeStatusFilter === "all" || match.status === activeStatusFilter;
		const searchMatch = activeSearchFilter === "all" || match.searchId === activeSearchFilter;
		return statusMatch && searchMatch;
	});

	const handleAcceptMatch = (matchId: string) => {
		console.log(`Accepting match: ${matchId}`);
		// TODO: Implement API call to accept match
	};

	const handleRejectMatch = (matchId: string) => {
		console.log(`Rejecting match: ${matchId}`);
		// TODO: Implement API call to reject match
	};

	// Get unique searches from matches
	const getSearchFilterOptions = () => {
		const uniqueSearches = matches.reduce((acc, match) => {
			if (!acc.find((search) => search.id === match.searchId)) {
				acc.push({
					id: match.searchId,
					label: match.searchName,
					count: matches.filter((m) => m.searchId === match.searchId).length,
				});
			}
			return acc;
		}, [] as Array<{ id: string; label: string; count: number }>);

		return [{ id: "all", label: "All Searches", count: matches.length }, ...uniqueSearches];
	};

	const searchFilterOptions = getSearchFilterOptions();

	return (
		<ProfileLayout>
			<div className="p-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Matches & Swaps</h1>
					</div>
				</div>

				{/* Search Filter Dropdown */}
				<div className="mb-4">
					<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
						<div className="relative">
							<button
								onClick={() => setIsSearchFilterOpen(!isSearchFilterOpen)}
								className="inline-flex items-center justify-between w-full sm:w-auto min-w-48 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<div className="flex items-center">
									<Search className="h-4 w-4 mr-2" />
									<span className="text-sm font-medium">
										{searchFilterOptions.find((option) => option.id === activeSearchFilter)?.label}
									</span>
									<span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
										({searchFilterOptions.find((option) => option.id === activeSearchFilter)?.count})
									</span>
								</div>
								<ChevronDown className="h-4 w-4 ml-2" />
							</button>

							{isSearchFilterOpen && (
								<div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 min-w-64">
									<div className="py-1">
										{searchFilterOptions.map((option) => (
											<button
												key={option.id}
												onClick={() => {
													handleSearchFilterChange(option.id);
													setIsSearchFilterOpen(false);
												}}
												className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
													activeSearchFilter === option.id
														? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
														: "text-gray-700 dark:text-gray-200"
												}`}
											>
												<span>{option.label}</span>
												<span className="text-xs text-gray-500 dark:text-gray-400">{option.count}</span>
											</button>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Clear search filter */}
						{activeSearchFilter !== "all" && (
							<button
								onClick={() => handleSearchFilterChange("all")}
								className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
							>
								Clear search filter
							</button>
						)}

						{/* Active filter indicator */}
						{(activeSearchFilter !== "all" || activeStatusFilter !== "all") && (
							<div className="text-sm text-gray-600 dark:text-gray-300">
								Showing {filteredMatches.length} of {matches.length} matches
							</div>
						)}
					</div>
				</div>

				{/* Status Filter Bar */}
				<MatchFilterBar
					matches={filteredMatches}
					activeFilter={activeStatusFilter}
					onFilterChange={handleStatusFilterChange}
				/>

				{/* Matches List - REMOVED overlapping search indicator */}
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
							{activeStatusFilter === "all" && activeSearchFilter === "all"
								? "No matches yet"
								: "No matches found"}
						</h3>
						<p className="text-gray-500 dark:text-gray-400 mt-2">
							{activeStatusFilter === "all" && activeSearchFilter === "all"
								? "Create searches to find your perfect swap partners."
								: "Try adjusting your filters or create new searches."}
						</p>
					</div>
				)}
			</div>
		</ProfileLayout>
	);
}

export default function MatchesPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<MatchesPageContent />
		</Suspense>
	);
}
