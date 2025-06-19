// src/components/contract/steps/TimelineStep.tsx
"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { ContractFormData } from "@/types/contract";

interface TimelineStepProps {
	formData: ContractFormData;
	onFormDataChange: (field: keyof ContractFormData, value: string) => void;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ formData, onFormDataChange }) => {
	return (
		<div className="space-y-8">
			<div className="text-center">
				<Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Swap Timeline</h2>
				<p className="text-gray-600 dark:text-gray-400">Set the dates and terms for your flat swap</p>
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
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date *</label>
						<input
							type="date"
							value={formData.endDate}
							onChange={(e) => onFormDataChange("endDate", e.target.value)}
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							required
						/>
					</div>
				</div>

				<div className="mb-6">
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Duration Preset
					</label>
					<select
						value={formData.duration}
						onChange={(e) => onFormDataChange("duration", e.target.value)}
						className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
					>
						<option value="1 month">1 month</option>
						<option value="3 months">3 months</option>
						<option value="6 months">6 months</option>
						<option value="12 months">12 months</option>
						<option value="custom">Custom duration</option>
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Special Terms & Conditions (Optional)
					</label>
					<textarea
						placeholder="Add any special agreements, house rules, or additional terms..."
						value={formData.specialTerms}
						onChange={(e) => onFormDataChange("specialTerms", e.target.value)}
						rows={4}
						className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
					/>
				</div>
			</div>
		</div>
	);
};

export default TimelineStep;
