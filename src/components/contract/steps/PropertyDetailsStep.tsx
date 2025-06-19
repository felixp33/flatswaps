// src/components/contract/steps/PropertyDetailsStep.tsx
"use client";

import React from "react";
import { Home, Euro } from "lucide-react";
import { ContractFormData } from "@/types/contract";

interface PropertyDetailsStepProps {
	formData: ContractFormData;
	onFormDataChange: (field: keyof ContractFormData, value: string) => void;
}

const PropertyDetailsStep: React.FC<PropertyDetailsStepProps> = ({ formData, onFormDataChange }) => {
	return (
		<div className="space-y-8">
			<div className="text-center">
				<Home className="h-12 w-12 text-blue-600 mx-auto mb-4" />
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Property Details</h2>
				<p className="text-gray-600 dark:text-gray-400">Information about both properties being swapped</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Current User's Property */}
				<div className="space-y-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<h3 className="font-semibold text-lg text-gray-900 dark:text-white">Your Property</h3>
					<div className="space-y-4">
						<input
							type="text"
							placeholder="Property Address *"
							value={formData.property1Address}
							onChange={(e) => onFormDataChange("property1Address", e.target.value)}
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							required
						/>
						<div className="relative">
							<Euro className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
							<input
								type="number"
								placeholder="Monthly Rent *"
								value={formData.property1Rent}
								onChange={(e) => onFormDataChange("property1Rent", e.target.value)}
								className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
								required
							/>
						</div>
						<textarea
							placeholder="Property Description"
							value={formData.property1Description}
							onChange={(e) => onFormDataChange("property1Description", e.target.value)}
							rows={3}
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						/>
					</div>
				</div>

				{/* Other User's Property */}
				<div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
					<h3 className="font-semibold text-lg text-gray-900 dark:text-white">
						{formData.tenant2Name || "Other Party"}'s Property
					</h3>
					<div className="space-y-4">
						<input
							type="text"
							placeholder="Property Address *"
							value={formData.property2Address}
							onChange={(e) => onFormDataChange("property2Address", e.target.value)}
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							required
						/>
						<div className="relative">
							<Euro className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
							<input
								type="number"
								placeholder="Monthly Rent *"
								value={formData.property2Rent}
								onChange={(e) => onFormDataChange("property2Rent", e.target.value)}
								className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
								required
							/>
						</div>
						<textarea
							placeholder="Property Description"
							value={formData.property2Description}
							onChange={(e) => onFormDataChange("property2Description", e.target.value)}
							rows={3}
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyDetailsStep;
