// src/components/dashboard/ExpandedChecklist.tsx

import { useState, useEffect } from "react";
import {
	CheckCircle,
	Circle,
	Plane,
	BookOpen,
	FileText,
	Heart,
	Globe,
	Users,
	Calendar,
	CreditCard,
	MapPin,
	Clock,
	AlertTriangle,
	Info,
} from "lucide-react";
import { getTotalItemCount, getUrgentItems, checklistSections } from "@/lib/data/checcklistData";

interface ExpandedChecklistProps {
	completedItems: Set<string>;
	onToggleItem: (itemId: string) => void;
}

export default function ExpandedChecklist({ completedItems, onToggleItem }: ExpandedChecklistProps) {
	const [expandedSections, setExpandedSections] = useState(new Set<string>());

	const totalItems = getTotalItemCount();
	const completedCount = completedItems.size;
	const progressPercentage = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;
	const urgentItems = getUrgentItems();
	const urgentCompleted = urgentItems.filter((item) => completedItems.has(item.id)).length;

	// Auto-expand sections with incomplete urgent items
	useEffect(() => {
		const sectionsWithUrgent = new Set<string>();
		checklistSections.forEach((section) => {
			const hasIncompleteUrgent = section.items.some((item) => item.urgent && !completedItems.has(item.id));
			if (hasIncompleteUrgent) {
				sectionsWithUrgent.add(section.title);
			}
		});
		setExpandedSections(sectionsWithUrgent);
	}, [completedItems]);

	const toggleSection = (sectionTitle: string) => {
		const newExpanded = new Set(expandedSections);
		if (newExpanded.has(sectionTitle)) {
			newExpanded.delete(sectionTitle);
		} else {
			newExpanded.add(sectionTitle);
		}
		setExpandedSections(newExpanded);
	};

	const getColorClasses = (color: "blue" | "purple" | "green" | "orange" | "indigo" | "teal") => {
		const colorMap: Record<"blue" | "purple" | "green" | "orange" | "indigo" | "teal", string> = {
			blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
			purple:
				"border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
			green: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300",
			orange:
				"border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
			indigo:
				"border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300",
			teal: "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-800 dark:bg-teal-900/20 dark:text-teal-300",
		};
		return colorMap[color];
	};

	const getUrgencyColor = (urgency: "high" | "medium" | "low") => {
		switch (urgency) {
			case "high":
				return "text-red-600 dark:text-red-400";
			case "medium":
				return "text-yellow-600 dark:text-yellow-400";
			case "low":
				return "text-green-600 dark:text-green-400";
		}
	};

	const getIconComponent = (iconName: "FileText" | "BookOpen" | "MapPin" | "CreditCard" | "Globe" | "Plane") => {
		const icons: Record<
			"FileText" | "BookOpen" | "MapPin" | "CreditCard" | "Globe" | "Plane",
			React.ComponentType<any>
		> = {
			FileText,
			BookOpen,
			MapPin,
			CreditCard,
			Globe,
			Plane,
		};
		return icons[iconName];
	};

	return (
		<div className="max-w-4xl mx-auto">
			{/* Header */}
			<div className="mb-8">
				<div className="flex items-center mb-4">
					<div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-4">
						<Plane className="h-8 w-8 text-white" />
					</div>
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Exchange Student Checklist</h1>
						<p className="text-gray-600 dark:text-gray-300">
							Your comprehensive guide to a successful study abroad experience
						</p>
					</div>
				</div>

				{/* Progress Overview */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
					<div className="flex items-center justify-between mb-4">
						<div>
							<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Overall Progress</h2>
							<p className="text-sm text-gray-600 dark:text-gray-300">Track your preparation journey</p>
						</div>
						<div className="text-right">
							<div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
								{completedCount}/{totalItems}
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">tasks completed</div>
						</div>
					</div>

					<div className="mb-4">
						<div className="flex justify-between items-center mb-2">
							<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
							<span className="text-sm text-gray-500 dark:text-gray-400">{Math.round(progressPercentage)}%</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
							<div
								className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
								style={{ width: `${progressPercentage}%` }}
							></div>
						</div>
					</div>

					{/* Quick Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
							<div className="text-xl font-bold text-blue-600 dark:text-blue-400">{completedCount}</div>
							<div className="text-xs text-blue-700 dark:text-blue-300">Completed</div>
						</div>
						<div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
							<div className="text-xl font-bold text-orange-600 dark:text-orange-400">
								{urgentCompleted}/{urgentItems.length}
							</div>
							<div className="text-xs text-orange-700 dark:text-orange-300">Urgent Done</div>
						</div>
						<div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
							<div className="text-xl font-bold text-green-600 dark:text-green-400">
								{checklistSections.length}
							</div>
							<div className="text-xs text-green-700 dark:text-green-300">Categories</div>
						</div>
						<div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
							<div className="text-xl font-bold text-purple-600 dark:text-purple-400">
								{Math.round(progressPercentage)}%
							</div>
							<div className="text-xs text-purple-700 dark:text-purple-300">Complete</div>
						</div>
					</div>

					{/* Completion Message */}
					{progressPercentage >= 100 && (
						<div className="mt-4 p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
							<div className="flex items-center">
								<Heart className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
								<div>
									<h4 className="font-medium text-green-800 dark:text-green-200">Congratulations! 🎉</h4>
									<p className="text-sm text-green-700 dark:text-green-300">
										You're all set for an amazing exchange experience!
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Checklist Sections */}
			<div className="space-y-6">
				{checklistSections.map((section) => {
					const Icon = getIconComponent(section.icon);
					const sectionCompleted = section.items.filter((item) => completedItems.has(item.id)).length;
					const sectionTotal = section.items.length;
					const sectionProgress = sectionTotal > 0 ? (sectionCompleted / sectionTotal) * 100 : 0;
					const isExpanded = expandedSections.has(section.title);
					const hasUrgentIncomplete = section.items.some((item) => item.urgent && !completedItems.has(item.id));

					return (
						<div
							key={section.title}
							className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
						>
							{/* Section Header */}
							<div
								className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
								onClick={() => toggleSection(section.title)}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center flex-1">
										<div className={`p-3 rounded-lg mr-4 ${getColorClasses(section.color)}`}>
											<Icon className="h-6 w-6" />
										</div>
										<div className="flex-1">
											<div className="flex items-center">
												<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
													{section.title}
												</h3>
												{hasUrgentIncomplete && <AlertTriangle className="h-5 w-5 text-orange-500 ml-2" />}
											</div>
											<div className="flex items-center mt-1 space-x-4">
												<span className="text-sm text-gray-600 dark:text-gray-400">
													{sectionCompleted}/{sectionTotal} completed
												</span>
												<span
													className={`text-xs px-2 py-1 rounded-full ${
														section.urgency === "high"
															? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
															: section.urgency === "medium"
															? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
															: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
													}`}
												>
													{section.urgency} priority
												</span>
											</div>
											{/* Section Progress Bar */}
											<div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
												<div
													className={`h-2 rounded-full transition-all duration-300 ${
														section.color === "blue"
															? "bg-blue-500"
															: section.color === "purple"
															? "bg-purple-500"
															: section.color === "green"
															? "bg-green-500"
															: section.color === "orange"
															? "bg-orange-500"
															: section.color === "indigo"
															? "bg-indigo-500"
															: "bg-teal-500"
													}`}
													style={{ width: `${sectionProgress}%` }}
												></div>
											</div>
										</div>
									</div>
									<div className="flex items-center ml-4">
										<span className="text-2xl font-bold text-gray-400">{isExpanded ? "−" : "+"}</span>
									</div>
								</div>
							</div>

							{/* Section Items */}
							{isExpanded && (
								<div className="px-6 pb-6">
									<div className="space-y-3">
										{section.items.map((item) => {
											const isChecked = completedItems.has(item.id);
											return (
												<div
													key={item.id}
													className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-sm ${
														isChecked
															? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
															: "bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
													}`}
													onClick={() => onToggleItem(item.id)}
												>
													<div className="flex items-start">
														<div className="mr-3 mt-0.5">
															{isChecked ? (
																<CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
															) : (
																<Circle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
															)}
														</div>
														<div className="flex-1">
															<div className="flex items-start justify-between">
																<div>
																	<span
																		className={`text-sm font-medium ${
																			isChecked
																				? "text-green-800 dark:text-green-200 line-through"
																				: "text-gray-900 dark:text-gray-100"
																		}`}
																	>
																		{item.text}
																	</span>
																	<div className="flex items-center mt-1 space-x-2">
																		<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
																			<Clock className="h-3 w-3 mr-1" />
																			{item.timeframe}
																		</span>
																		{item.urgent && !isChecked && (
																			<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
																				<AlertTriangle className="h-3 w-3 mr-1" />
																				Urgent
																			</span>
																		)}
																	</div>
																</div>
															</div>
															{item.description && (
																<p
																	className={`text-xs mt-2 ${
																		isChecked
																			? "text-green-700 dark:text-green-300"
																			: "text-gray-600 dark:text-gray-400"
																	}`}
																>
																	<Info className="h-3 w-3 inline mr-1" />
																	{item.description}
																</p>
															)}
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* Footer Tips */}
			<div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
				<div className="flex items-start">
					<Globe className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
					<div>
						<h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Pro Tip for flatswaps Users</h4>
						<p className="text-sm text-blue-700 dark:text-blue-300">
							Connect with your swap partner early! They can provide insider tips about the local area, help with
							banking recommendations, and even show you around when you arrive. Many of our best exchange
							experiences start with great communication.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
