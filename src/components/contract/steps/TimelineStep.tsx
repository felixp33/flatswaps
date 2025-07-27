// src/components/contract/steps/TimelineStep.tsx
"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { ContractFormData } from "@/types/contract";

interface TimelineStepProps {
	formData: ContractFormData;
	onFormDataChange: (field: keyof ContractFormData, value: string | number | boolean) => void;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ formData, onFormDataChange }) => {
	// Calculate duration in days and human readable format
	const calculateDuration = () => {
		if (!formData.startDate || !formData.endDate) return null;

		const start = new Date(formData.startDate);
		const end = new Date(formData.endDate);
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		const months = Math.floor(diffDays / 30);
		const remainingDays = diffDays % 30;

		if (months === 0) {
			return `${diffDays} days`;
		} else if (remainingDays === 0) {
			return `${months} ${months === 1 ? "month" : "months"}`;
		} else {
			return `${months} ${months === 1 ? "month" : "months"} and ${remainingDays} days`;
		}
	};

	const duration = calculateDuration();
	const isValidDateRange =
		formData.startDate && formData.endDate && new Date(formData.startDate) < new Date(formData.endDate);

	return (
		<div className="space-y-8">
			<div className="text-center">
				<Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Swap Timeline</h2>
				<p className="text-gray-600 dark:text-gray-400">Set the start and end dates for your flat swap</p>
			</div>

			<div className="max-w-2xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Start Date *
						</label>
						<input
							type="date"
							value={formData.startDate}
							onChange={(e) => onFormDataChange("startDate", e.target.value)}
							min={new Date().toISOString().split("T")[0]} // Can't start in the past
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date *</label>
						<input
							type="date"
							value={formData.endDate}
							onChange={(e) => onFormDataChange("endDate", e.target.value)}
							min={formData.startDate || new Date().toISOString().split("T")[0]} // End date must be after start date
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							required
						/>
					</div>
				</div>

				{/* Duration Display */}
				{duration && isValidDateRange && (
					<div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
						<div className="flex items-center justify-between">
							<div>
								<h4 className="font-medium text-blue-900 dark:text-blue-100">Swap Duration</h4>
								<p className="text-blue-700 dark:text-blue-200 text-sm mt-1">Based on your selected dates</p>
							</div>
							<div className="text-right">
								<span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{duration}</span>
							</div>
						</div>
					</div>
				)}

				{/* Date Validation Warning */}
				{formData.startDate && formData.endDate && !isValidDateRange && (
					<div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div className="ml-3">
								<p className="text-sm text-red-800 dark:text-red-200">End date must be after the start date.</p>
							</div>
						</div>
					</div>
				)}

			</div>
		</div>
	);
};

export default TimelineStep;
