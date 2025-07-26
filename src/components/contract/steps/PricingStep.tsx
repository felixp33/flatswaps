// src/components/contract/steps/PricingStep.tsx
"use client";

import React from "react";
import { Calculator, Euro } from "lucide-react";
import { ContractFormData, PricingBreakdown } from "@/types/contract";

interface PricingStepProps {
	formData: ContractFormData;
	onFormDataChange: (field: keyof ContractFormData, value: string | number | boolean) => void;
}

const PricingStep: React.FC<PricingStepProps> = ({ formData, onFormDataChange }) => {
	const calculatePricing = (): PricingBreakdown => {
		const property1Rent = parseFloat(formData.property1Rent) || 0;
		const property2Rent = parseFloat(formData.property2Rent) || 0;
		const feePercentage = formData.platformFeePercentage || 4.5;

		const property1PlatformFee = (property1Rent * feePercentage) / 100;
		const property2PlatformFee = (property2Rent * feePercentage) / 100;

		return {
			property1Rent,
			property1PlatformFee,
			property1Total: property1Rent + property1PlatformFee,
			property2Rent,
			property2PlatformFee,
			property2Total: property2Rent + property2PlatformFee,
		};
	};

	const pricing = calculatePricing();

	return (
		<div className="space-y-8">
			<div className="text-center">
				<Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pricing Breakdown</h2>
				<p className="text-gray-600 dark:text-gray-400">Review the monthly costs including platform fees</p>
			</div>

			<div className="max-w-4xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Property 1 Pricing */}
					<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
						<div className="flex items-center mb-4">
							<Euro className="h-5 w-5 text-green-600 mr-2" />
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								{formData.tenant1Name || "Tenant A"}'s Property
							</h3>
						</div>

						<div className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-gray-600 dark:text-gray-400">Monthly Rent:</span>
								<span className="font-medium text-gray-900 dark:text-white">
									€{pricing.property1Rent.toFixed(2)}
								</span>
							</div>

							<div className="flex justify-between items-center">
								<span className="text-gray-600 dark:text-gray-400">
									Platform Fee ({formData.platformFeePercentage || 4.5}%):
								</span>
								<span className="font-medium text-gray-900 dark:text-white">
									€{pricing.property1PlatformFee.toFixed(2)}
								</span>
							</div>

							<div className="border-t border-gray-200 dark:border-gray-600 pt-3">
								<div className="flex justify-between items-center">
									<span className="text-lg font-semibold text-gray-900 dark:text-white">
										Total Monthly Cost:
									</span>
									<span className="text-lg font-bold text-blue-600">€{pricing.property1Total.toFixed(2)}</span>
								</div>
							</div>
						</div>

						<div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<p className="text-sm text-gray-600 dark:text-gray-400">
								<strong>{formData.tenant2Name || "Tenant B"}</strong> will pay this amount monthly
							</p>
						</div>
					</div>

					{/* Property 2 Pricing */}
					<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
						<div className="flex items-center mb-4">
							<Euro className="h-5 w-5 text-green-600 mr-2" />
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								{formData.tenant2Name || "Tenant B"}'s Property
							</h3>
						</div>

						<div className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-gray-600 dark:text-gray-400">Monthly Rent:</span>
								<span className="font-medium text-gray-900 dark:text-white">
									€{pricing.property2Rent.toFixed(2)}
								</span>
							</div>

							<div className="flex justify-between items-center">
								<span className="text-gray-600 dark:text-gray-400">
									Platform Fee ({formData.platformFeePercentage || 4.5}%):
								</span>
								<span className="font-medium text-gray-900 dark:text-white">
									€{pricing.property2PlatformFee.toFixed(2)}
								</span>
							</div>

							<div className="border-t border-gray-200 dark:border-gray-600 pt-3">
								<div className="flex justify-between items-center">
									<span className="text-lg font-semibold text-gray-900 dark:text-white">
										Total Monthly Cost:
									</span>
									<span className="text-lg font-bold text-blue-600">€{pricing.property2Total.toFixed(2)}</span>
								</div>
							</div>
						</div>

						<div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<p className="text-sm text-gray-600 dark:text-gray-400">
								<strong>{formData.tenant1Name || "Tenant A"}</strong> will pay this amount monthly
							</p>
						</div>
					</div>
				</div>

				{/* Payment Summary */}
				<div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
					<h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">Payment Summary</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
						<div>
							<p className="text-blue-800 dark:text-blue-200">
								<strong>{formData.tenant1Name || "Tenant A"}</strong> pays €{pricing.property2Total.toFixed(2)}
								/month
							</p>
							<p className="text-blue-600 dark:text-blue-300 mt-1">
								(€{pricing.property2Rent.toFixed(2)} rent + €{pricing.property2PlatformFee.toFixed(2)} fee)
							</p>
						</div>
						<div>
							<p className="text-blue-800 dark:text-blue-200">
								<strong>{formData.tenant2Name || "Tenant B"}</strong> pays €{pricing.property1Total.toFixed(2)}
								/month
							</p>
							<p className="text-blue-600 dark:text-blue-300 mt-1">
								(€{pricing.property1Rent.toFixed(2)} rent + €{pricing.property1PlatformFee.toFixed(2)} fee)
							</p>
						</div>
					</div>
				</div>

				{/* Fee Information */}
				<div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
					<h5 className="font-medium text-gray-900 dark:text-white mb-2">About Platform Fees</h5>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						The {formData.platformFeePercentage || 4.5}% platform fee covers secure payment processing, insurance
						coverage, customer support, and platform maintenance. This fee is applied to the base rent of each
						property and is paid monthly along with the rent.
					</p>
				</div>
			</div>
		</div>
	);
};

export default PricingStep;
