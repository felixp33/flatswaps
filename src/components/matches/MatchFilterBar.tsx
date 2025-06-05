// src/components/matches/MatchFilterBar.tsx
import { Heart, Clock, CheckCircle, XCircle } from "lucide-react";

interface FilterOption {
	id: string;
	label: string;
	icon: any;
	color: string;
	count: number;
}

interface MatchFilterBarProps {
	matches: any[];
	activeFilter: string;
	onFilterChange: (filterId: string) => void;
}

export default function MatchFilterBar({ matches, activeFilter, onFilterChange }: MatchFilterBarProps) {
	const filterOptions: FilterOption[] = [
		{
			id: "all",
			label: "All Matches",
			icon: Heart,
			color: "text-gray-600",
			count: matches.length,
		},
		{
			id: "new",
			label: "New Matches",
			icon: Heart,
			color: "text-blue-600",
			count: matches.filter((m) => m.status === "new").length,
		},
		{
			id: "pending",
			label: "Pending",
			icon: Clock,
			color: "text-yellow-600",
			count: matches.filter((m) => m.status === "pending").length,
		},
		{
			id: "accepted",
			label: "Confirmed",
			icon: CheckCircle,
			color: "text-green-600",
			count: matches.filter((m) => m.status === "accepted").length,
		},
		{
			id: "rejected",
			label: "Cancelled",
			icon: XCircle,
			color: "text-red-600",
			count: matches.filter((m) => m.status === "rejected").length,
		},
	];

	return (
		<div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
			{filterOptions.map((filter) => {
				const Icon = filter.icon;
				const isActive = activeFilter === filter.id;

				return (
					<button
						key={filter.id}
						onClick={() => onFilterChange(filter.id)}
						className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
							isActive
								? "bg-white dark:bg-gray-800 border-blue-500 shadow-md ring-1 ring-blue-500"
								: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
						}`}
					>
						<div className="flex items-center">
							<Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : filter.color} mr-3`} />
							<div className="text-left">
								<p
									className={`text-xl font-semibold ${
										isActive ? "text-blue-600" : "text-gray-900 dark:text-white"
									}`}
								>
									{filter.count}
								</p>
								<p className={`text-xs ${isActive ? "text-blue-600" : "text-gray-500 dark:text-gray-400"}`}>
									{filter.label}
								</p>
							</div>
						</div>
					</button>
				);
			})}
		</div>
	);
}
