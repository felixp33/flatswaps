// src/app/profile/matches/page.tsx
"use client";

import { useState } from "react";
import { Heart, Search, Filter, ChevronDown } from "lucide-react";
import Link from "next/link";
import ProfileLayout from "@/components/profile/ProfileLayout";
import MatchFilterBar from "@/components/matches/MatchFilterBar";
import MatchCard from "@/components/matches/MatchCard";
import { mockMatches } from "@/lib/data/mockMatches";

export default function MatchesPage() {
	const [activeStatusFilter, setActiveStatusFilter] = useState<string>("all");
	const [activeSearchFilter, setActiveSearchFilter] = useState<string>("all");
	const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
	const matches = mockMatches;

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

	const getStatusFilterOptions = () => {
		return [
			{ id: "all", label: "All Matches" },
			{ id: "new", label: "New Matches" },
			{ id: "pending", label: "Pending" },
			{ id: "accepted", label: "Confirmed" },
			{ id: "rejected", label: "Cancelled" },
		];
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
						<p className="text-gray-600 dark:text-gray-300 mt-1">
							Manage your home swap matches and communications
						</p>
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
													setActiveSearchFilter(option.id);
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
								onClick={() => setActiveSearchFilter("all")}
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
					onFilterChange={setActiveStatusFilter}
				/>

				{/* Active Search Filter Indicator */}
				{activeSearchFilter !== "all" && (
					<div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<Search className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
								<span className="text-sm font-medium text-blue-800 dark:text-blue-200">
									Showing matches from:{" "}
									{searchFilterOptions.find((option) => option.id === activeSearchFilter)?.label}
								</span>
							</div>
							<button
								onClick={() => setActiveSearchFilter("all")}
								className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
							>
								Show all
							</button>
						</div>
					</div>
				)}

				{/* Matches List */}
				<div className="space-y-6">
					{filteredMatches.map((match) => (
						<div key={match.id} className="relative">
							{/* Search indicator for each match */}
							{activeSearchFilter === "all" && (
								<div className="absolute top-4 right-4 z-10">
									<span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
										<Search className="h-3 w-3 mr-1" />
										{match.searchName}
									</span>
								</div>
							)}
							<MatchCard
								key={match.id}
								match={match}
								onAccept={handleAcceptMatch}
								onReject={handleRejectMatch}
							/>
						</div>
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

						{/* Clear filters option */}
						{(activeStatusFilter !== "all" || activeSearchFilter !== "all") && (
							<div className="mt-4 space-x-4">
								<button
									onClick={() => {
										setActiveStatusFilter("all");
										setActiveSearchFilter("all");
									}}
									className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
								>
									Clear All Filters
								</button>
							</div>
						)}

						{activeStatusFilter === "all" && activeSearchFilter === "all" && (
							<Link
								href="/profile/searches"
								className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
							>
								<Search className="h-4 w-4 mr-2" />
								Create Search
							</Link>
						)}
					</div>
				)}

				{/* Filter Summary */}
				{filteredMatches.length > 0 && (activeStatusFilter !== "all" || activeSearchFilter !== "all") && (
					<div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
							<div className="text-sm text-gray-600 dark:text-gray-300">
								<strong>{filteredMatches.length}</strong> of <strong>{matches.length}</strong> matches shown
							</div>
							<div className="flex items-center space-x-4 text-sm">
								{activeSearchFilter !== "all" && (
									<span className="text-gray-600 dark:text-gray-300">
										Search:{" "}
										<span className="font-medium">
											{searchFilterOptions.find((option) => option.id === activeSearchFilter)?.label}
										</span>
									</span>
								)}
								{activeStatusFilter !== "all" && (
									<span className="text-gray-600 dark:text-gray-300">
										Status:{" "}
										<span className="font-medium">
											{getStatusFilterOptions().find((option) => option.id === activeStatusFilter)?.label}
										</span>
									</span>
								)}
								<button
									onClick={() => {
										setActiveStatusFilter("all");
										setActiveSearchFilter("all");
									}}
									className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
								>
									Clear all filters
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</ProfileLayout>
	);
}
