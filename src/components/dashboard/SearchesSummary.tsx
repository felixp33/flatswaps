// src/components/dashboard/SearchesSummary.tsx

import Link from "next/link";
import { Search, ChevronRight, MapPin, Plus } from "lucide-react";

interface SearchesSummaryProps {
        searches?: {
                id: string;
                name: string;
                location: string;
                isActive: boolean;
                newMatches: number;
                matchCount: number;
        }[];
        canSearch?: boolean;
}

export default function SearchesSummary({ searches = [], canSearch = true }: SearchesSummaryProps) {
        // Find active searches
        const activeSearches = searches.filter((search) => search.isActive);
        const totalMatches = searches.reduce((sum, search) => sum + search.matchCount, 0);
        const totalNewMatches = searches.reduce((sum, search) => sum + search.newMatches, 0);

        if (!canSearch) {
                return (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="p-6 text-center">
                                        <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                                Complete your profile to start searching
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                                Verify your identity, fill in your details and add your flat before creating a search.
                                        </p>
                                        <Link href="/profile/verification" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                                                Start Verification
                                        </Link>
                                </div>
                        </div>
                );
        }

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
			<div className="p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
						<Search className="h-5 w-5 mr-2" />
						Your Searches
					</h2>
					{searches.length > 0 && (
						<Link
							href="/profile/searches"
							className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
						>
							View All ({searches.length})
						</Link>
					)}
				</div>

				{/* Show active search preview or no searches message */}
				{activeSearches.length > 0 ? (
					<div className="space-y-3">
						{activeSearches.slice(0, 1).map((search) => (
							<Link
								key={search.id}
								href={`/profile/matches?search=${search.id}`}
								className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
							>
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<div className="flex items-center justify-between mb-2">
											<h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
												{search.name}
											</h4>
											<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
												<div className="h-2 w-2 bg-green-600 dark:bg-green-400 rounded-full mr-1" />
												Active
											</span>
										</div>
										<div className="flex items-center text-xs text-gray-600 dark:text-gray-300 mb-2">
											<MapPin className="h-3 w-3 mr-1" />
											{search.location}
										</div>
										<div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3">
											<span>{search.matchCount} matches</span>
											{search.newMatches > 0 && (
												<span className="text-red-600 dark:text-red-400 font-medium">
													{search.newMatches} new
												</span>
											)}
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				) : (
					/* No Active Searches State */
					<div className="text-center py-8">
						<Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
							{searches.length > 0 ? "No active searches" : "No searches created yet"}
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
							{searches.length > 0
								? "You have searches but none are currently active"
								: "Create your first search to find the perfect swap partners"}
						</p>
						<div className="flex justify-center space-x-3">
							{searches.length > 0 ? (
								<>
									<Link
										href="/profile/searches"
										className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
									>
										View All Searches
									</Link>
									<Link
										href="/profile/searches/create"
										className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
									>
										<Plus className="h-4 w-4 mr-2" />
										Create Search
									</Link>
								</>
							) : (
								<Link
									href="/profile/searches/create"
									className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
								>
									<Plus className="h-4 w-4 mr-2" />
									Create Search
								</Link>
							)}
						</div>
					</div>
				)}

				{/* Quick Actions - only show if there are active searches */}
				{activeSearches.length > 0 && (
					<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
						<div className="flex space-x-2">
							<Link
								href="/profile/searches"
								className="flex-1 text-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
							>
								Manage Searches
							</Link>
							<Link
								href="/profile/searches/create"
								className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
							>
								<Plus className="h-4 w-4 mr-2 inline" />
								Create New
							</Link>
						</div>
					</div>
				)}

				{/* Search Stats - only show if there are searches */}
				{searches.length > 0 && (
					<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
						<div className="grid grid-cols-3 gap-4 text-center">
							<div>
								<p className="text-lg font-semibold text-gray-900 dark:text-white">{activeSearches.length}</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
							</div>
							<div>
								<p className="text-lg font-semibold text-gray-900 dark:text-white">{totalMatches}</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">Matches</p>
							</div>
							<div>
								<p className="text-lg font-semibold text-gray-900 dark:text-white">{totalNewMatches}</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">New</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
