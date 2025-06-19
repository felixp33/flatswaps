// src/components/contract/steps/PersonalInfoStep.tsx
"use client";

import React from "react";
import { User } from "lucide-react";
import { ContractFormData } from "@/types/contract";

interface PersonalInfoStepProps {
	formData: ContractFormData;
	onFormDataChange: (field: keyof ContractFormData, value: string) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ formData, onFormDataChange }) => {
	return (
		<div className="space-y-8">
			<div className="text-center">
				<User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Personal Information</h2>
				<p className="text-gray-600 dark:text-gray-400">
					Contact details for both parties involved in the flat swap
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Current User */}
				<div className="space-y-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="flex items-center space-x-2">
						<div className="w-3 h-3 bg-blue-600 rounded-full"></div>
						<h3 className="font-semibold text-lg text-gray-900 dark:text-white">You (Initiating Party)</h3>
					</div>
					<div className="space-y-4">
						<input
							type="text"
							placeholder="Full Name *"
							value={formData.tenant1Name}
							onChange={(e) => onFormDataChange("tenant1Name", e.target.value)}
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							required
						/>
						<input
							type="email"
							placeholder="Email Address *"
							value={formData.tenant1Email}
							onChange={(e) => onFormDataChange("tenant1Email", e.target.value)}
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							required
						/>
						<input
							type="tel"
							placeholder="Phone Number"
							value={formData.tenant1Phone}
							onChange={(e) => onFormDataChange("tenant1Phone", e.target.value)}
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						/>
					</div>
				</div>

				{/* Other User */}
				<div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
					<div className="flex items-center space-x-2">
						<div className="w-3 h-3 bg-gray-600 rounded-full"></div>
						<h3 className="font-semibold text-lg text-gray-900 dark:text-white">
							{formData.tenant2Name || "Other Party"}
						</h3>
					</div>
					<div className="space-y-4">
						<input
							type="text"
							placeholder="Full Name *"
							value={formData.tenant2Name}
							onChange={(e) => onFormDataChange("tenant2Name", e.target.value)}
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							required
						/>
						<input
							type="email"
							placeholder="Email Address *"
							value={formData.tenant2Email}
							onChange={(e) => onFormDataChange("tenant2Email", e.target.value)}
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							required
						/>
						<input
							type="tel"
							placeholder="Phone Number"
							value={formData.tenant2Phone}
							onChange={(e) => onFormDataChange("tenant2Phone", e.target.value)}
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PersonalInfoStep;
