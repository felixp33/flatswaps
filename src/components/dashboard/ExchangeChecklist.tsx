// src/components/dashboard/ExchangeChecklist.tsx

import Link from "next/link";
import { useState, useEffect } from "react";
import {
       Plane,
       CheckCircle,
       Clock,
       AlertTriangle,
       ChevronRight,
       FileText,
       BookOpen,
       MapPin,
       CreditCard,
       Globe,
} from "lucide-react";
import {
       getTotalItemCount,
       getUrgentItems,
       checklistSections,
       getSectionProgress,
} from "@/lib/data/checcklistData";

interface ExchangeChecklistProps {
	completedItems?: Set<string>;
}

export default function ExchangeChecklist({ completedItems = new Set() }: ExchangeChecklistProps) {
       const [totalItems, setTotalItems] = useState(0);
       const [urgentItems, setUrgentItems] = useState(0);

       useEffect(() => {
               setTotalItems(getTotalItemCount());
               setUrgentItems(getUrgentItems().length);
       }, [completedItems]);

	const completedCount = completedItems.size;
	const progressPercentage = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;
       const urgentCompleted = getUrgentItems().filter((item) => completedItems.has(item.id)).length;

       const getColorClasses = (
               color: "blue" | "purple" | "green" | "orange" | "indigo" | "teal"
       ) => {
               const colorMap: Record<
                       "blue" | "purple" | "green" | "orange" | "indigo" | "teal",
                       string
               > = {
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

       const getIconComponent = (
               iconName: "FileText" | "BookOpen" | "MapPin" | "CreditCard" | "Globe" | "Plane"
       ) => {
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

       // Progress summary
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
                                                View Checklist
                                                <ChevronRight className="h-4 w-4 ml-1" />
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

                                {/* Category Progress */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                        {checklistSections.map((section) => {
                                                const Icon = getIconComponent(section.icon);
                                                const sectionProgress = getSectionProgress(section.title, completedItems);
                                                const sectionCompleted = section.items.filter((item) => completedItems.has(item.id)).length;
                                                const sectionTotal = section.items.length;
                                                return (
                                                        <div
                                                                key={section.title}
                                                                className={`${getColorClasses(section.color)} p-4 rounded-lg flex flex-col justify-between h-24 sm:h-28`}
                                                        >
                                                                <div className="flex items-center mb-2">
                                                                        <Icon className="h-5 w-5 mr-2" />
                                                                        <span className="text-sm font-medium flex-1 truncate">{section.title}</span>
                                                                </div>
                                                                <div>
                                                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                                                <div
                                                                                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                                                                        style={{ width: `${sectionProgress}%` }}
                                                                                ></div>
                                                                        </div>
                                                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-right">
                                                                                {sectionCompleted}/{sectionTotal} ({Math.round(sectionProgress)}%)
                                                                        </p>
                                                                </div>
                                                        </div>
                                                );
                                        })}
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
