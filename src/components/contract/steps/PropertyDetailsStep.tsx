// src/components/contract/steps/PropertyDetailsStep.tsx
"use client";

import React from "react";
import { Home, Euro } from "lucide-react";
import { ContractFormData } from "@/types/contract";

interface PropertyDetailsStepProps {
        formData: ContractFormData;
        onFormDataChange: (field: keyof ContractFormData, value: string) => void;
}

const PropertyDetailsStep: React.FC<PropertyDetailsStepProps> = ({ formData }) => {
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
                                        <div className="space-y-2 text-sm">
                                                <p className="text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium text-gray-900 dark:text-white">Address:</span> {formData.property1Address}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium text-gray-900 dark:text-white">Monthly Rent:</span> €{formData.property1Rent}
                                                </p>
                                                {formData.property1Description && (
                                                        <p className="text-gray-600 dark:text-gray-400">{formData.property1Description}</p>
                                                )}
                                        </div>
                                </div>

				{/* Other User's Property */}
                                <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                                {formData.tenant2Name || "Other Party"}'s Property
                                        </h3>
                                        <div className="space-y-2 text-sm">
                                                <p className="text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium text-gray-900 dark:text-white">Address:</span> {formData.property2Address}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium text-gray-900 dark:text-white">Monthly Rent:</span> €{formData.property2Rent}
                                                </p>
                                                {formData.property2Description && (
                                                        <p className="text-gray-600 dark:text-gray-400">{formData.property2Description}</p>
                                                )}
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default PropertyDetailsStep;
