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
}

export default function SearchesSummary({ searches = [] }: SearchesSummaryProps) {
	// If no searches, show create search state
	if (searches.length === 0) {
		return (
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
				<div className="p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
							<Search className="h-4 w-4 mr-2" />
							Your Searches
						</h2>
					</div>

					{/* No Searches State */}
					<div className="text-center py-8">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
							<Search className="h-6 w-6 text-gray-400" />
						</div>
						<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">No searches created yet</h3>
						<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
							Create your first search to find the perfect swap partners.
						</p>
						<Link
							href="/profile/searches/create"
							className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
						>
							<Plus className="h-4 w-4 mr-2" />
							Create Search
						</Link>
					</div>
				</div>
			</div>
		);
	}

	// Show summary stats instead of individual search
	const activeSearches = searches.filter((s) => s.isActive).length;
	const totalMatches = searches.reduce((sum, search) => sum + search.matchCount, 0);
	const totalNewMatches = searches.reduce((sum, search) => sum + search.newMatches, 0);

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
			<div className="p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
						<Search className="h-4 w-4 mr-2" />
						Your Searches
					</h2>
					<Link
						href="/profile/searches"
						className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
					>
						View All
						<ChevronRight className="h-4 w-4 ml-1" />
					</Link>
				</div>

				{/* Search Stats */}
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<span className="text-sm text-gray-600 dark:text-gray-300">Active searches</span>
						<span className="font-medium text-gray-900 dark:text-white">
							{activeSearches} of {searches.length}
						</span>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-sm text-gray-600 dark:text-gray-300">Total matches</span>
						<span className="font-medium text-gray-900 dark:text-white">{totalMatches}</span>
					</div>

					{totalNewMatches > 0 && (
						<div className="flex items-center justify-between">
							<span className="text-sm text-gray-600 dark:text-gray-300">New matches</span>
							<span className="font-medium text-red-600 dark:text-red-400">{totalNewMatches}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
