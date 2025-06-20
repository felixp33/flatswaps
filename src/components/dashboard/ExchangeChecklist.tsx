// src/components/dashboard/ExchangeChecklist.tsx

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plane, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { getTotalItemCount, getUrgentItems } from "@/lib/data/checcklistData";

interface ExchangeChecklistProps {
	completedItems?: Set<string>;
}

export default function ExchangeChecklist({ completedItems = new Set() }: ExchangeChecklistProps) {
	const [isStarted, setIsStarted] = useState(false);
	const [totalItems, setTotalItems] = useState(0);
	const [urgentItems, setUrgentItems] = useState(0);

	useEffect(() => {
		// Check if user has started the checklist (has any completed items)
		setIsStarted(completedItems.size > 0);
		setTotalItems(getTotalItemCount());
		setUrgentItems(getUrgentItems().length);
	}, [completedItems]);

	const completedCount = completedItems.size;
	const progressPercentage = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;
	const urgentCompleted = getUrgentItems().filter((item) => completedItems.has(item.id)).length;

	// If user hasn't started, show the placeholder
	if (!isStarted) {
		return (
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
				<div className="p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
							<Plane className="h-5 w-5 mr-2" />
							Exchange Student Checklist
						</h2>
					</div>

					{/* Placeholder State */}
					<div className="text-center py-8">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
							<Plane className="h-6 w-6 text-blue-600 dark:text-blue-400" />
						</div>
						<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Ready for your exchange?</h3>
						<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
							Get prepared with our comprehensive exchange student checklist covering visas, academics, and
							cultural preparation.
						</p>
						<div className="grid grid-cols-2 gap-4 mb-6 text-sm">
							<div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
								<div className="font-semibold text-blue-900 dark:text-blue-100">{totalItems}</div>
								<div className="text-blue-700 dark:text-blue-300">Total Tasks</div>
							</div>
							<div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
								<div className="font-semibold text-orange-900 dark:text-orange-100">{urgentItems}</div>
								<div className="text-orange-700 dark:text-orange-300">Urgent Tasks</div>
							</div>
						</div>
						<Link
							href="/profile/checklist"
							className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
						>
							<CheckCircle className="h-4 w-4 mr-2" />
							Start Checklist
						</Link>
					</div>
				</div>
			</div>
		);
	}

	// If user has started, show progress summary
	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
			<div className="p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
						<Plane className="h-5 w-5 mr-2" />
						Exchange Preparation
					</h2>
					<Link
						href="/profile/checklist"
						className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
					>
						Continue
						<CheckCircle className="h-4 w-4 ml-1" />
					</Link>
				</div>

				{/* Progress Overview */}
				<div className="mb-4">
					<div className="flex items-center justify-between mb-2">
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
						<span className="text-lg font-bold text-blue-600 dark:text-blue-400">
							{completedCount}/{totalItems}
						</span>
					</div>
					<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
						<div
							className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
							style={{ width: `${progressPercentage}%` }}
						></div>
					</div>
					<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
						{Math.round(progressPercentage)}% complete
					</p>
				</div>

				{/* Quick Stats Grid */}
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
						<div className="flex items-center">
							<CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
							<div>
								<div className="text-sm font-semibold text-green-900 dark:text-green-100">
									{completedCount} Done
								</div>
								<div className="text-xs text-green-700 dark:text-green-300">Tasks completed</div>
							</div>
						</div>
					</div>

					<div
						className={`p-3 rounded-lg border ${
							urgentCompleted === urgentItems
								? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
								: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
						}`}
					>
						<div className="flex items-center">
							{urgentCompleted === urgentItems ? (
								<CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
							) : (
								<AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400 mr-2" />
							)}
							<div>
								<div
									className={`text-sm font-semibold ${
										urgentCompleted === urgentItems
											? "text-green-900 dark:text-green-100"
											: "text-orange-900 dark:text-orange-100"
									}`}
								>
									{urgentCompleted}/{urgentItems} Urgent
								</div>
								<div
									className={`text-xs ${
										urgentCompleted === urgentItems
											? "text-green-700 dark:text-green-300"
											: "text-orange-700 dark:text-orange-300"
									}`}
								>
									Priority items
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Motivational Message */}
				{progressPercentage >= 100 ? (
					<div className="p-3 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
						<div className="flex items-center text-green-800 dark:text-green-200">
							<CheckCircle className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">🎉 You're all set for your exchange!</span>
						</div>
					</div>
				) : progressPercentage >= 75 ? (
					<div className="p-3 bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
						<div className="flex items-center text-blue-800 dark:text-blue-200">
							<Clock className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">Almost there! Just a few more steps to go.</span>
						</div>
					</div>
				) : urgentCompleted < urgentItems ? (
					<div className="p-3 bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
						<div className="flex items-center text-orange-800 dark:text-orange-200">
							<AlertTriangle className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">Focus on urgent tasks first to stay on track.</span>
						</div>
					</div>
				) : (
					<div className="p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
						<div className="flex items-center text-gray-800 dark:text-gray-200">
							<Clock className="h-4 w-4 mr-2" />
							<span className="text-sm font-medium">Great progress! Keep going with your preparation.</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
