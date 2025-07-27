// src/components/contract/steps/ReviewStep.tsx
"use client";

import React, { useState } from "react";
import { CheckCircle, FileText, User, Home, Calendar, Euro } from "lucide-react";
import SignSlider from "../SignSlider";
import { ContractFormData } from "@/types/contract";
import {
        downloadContractPdf,
        calculatePricing,
        calculateDuration,
} from "@/lib/contract/contractGenerator";

interface ReviewStepProps {
	formData: ContractFormData;
	onFormDataChange: (field: keyof ContractFormData, value: string | number | boolean) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData, onFormDataChange }) => {
        const [signed, setSigned] = useState(false);

	const pricing = calculatePricing(formData);
	const duration = calculateDuration(formData.startDate, formData.endDate);

        const handleSign = () => {
                setSigned(true);
        };

        const handleDownloadPdf = () => {
                downloadContractPdf(formData);
        };

        if (signed) {
                return (
                        <div className="space-y-6 text-center">
                                <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contract Signed!</h2>
                                <p className="text-gray-600 dark:text-gray-400">Your flat swap contract is ready for download.</p>
                                <div>
                                        <button
                                                onClick={handleDownloadPdf}
                                                className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                                <FileText className="h-4 w-4 mr-2" />
                                                Download as PDF
                                        </button>
                                </div>
                                <div className="mt-6">
                                        <SignSlider signed={true} onSign={() => {}} />
                                </div>
                        </div>
                );
        }

	return (
		<div className="space-y-8">
			<div className="text-center">
				<FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Review Contract Details</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                        Please review all information before signing your contract
                                </p>
			</div>

			<div className="max-w-4xl mx-auto">
				{/* Participants Review */}
				<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
					<div className="flex items-center mb-4">
						<User className="h-5 w-5 text-blue-600 mr-2" />
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Participants</h3>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-medium text-gray-900 dark:text-white mb-2">Tenant A (Initiating)</h4>
							<p className="text-gray-600 dark:text-gray-400">{formData.tenant1Name}</p>
							<p className="text-gray-600 dark:text-gray-400">{formData.tenant1Email}</p>
						</div>
						<div>
							<h4 className="font-medium text-gray-900 dark:text-white mb-2">Tenant B (Responding)</h4>
							<p className="text-gray-600 dark:text-gray-400">{formData.tenant2Name}</p>
							<p className="text-gray-600 dark:text-gray-400">{formData.tenant2Email}</p>
						</div>
					</div>
				</div>

				{/* Properties Review */}
				<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
					<div className="flex items-center mb-4">
						<Home className="h-5 w-5 text-blue-600 mr-2" />
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Properties</h3>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-medium text-gray-900 dark:text-white mb-2">
								{formData.tenant1Name}'s Property
							</h4>
							<p className="text-gray-600 dark:text-gray-400 mb-1">{formData.property1Address}</p>
							<p className="text-gray-600 dark:text-gray-400 mb-2">{formData.property1Description}</p>
							<p className="font-medium text-gray-900 dark:text-white">
								Base Rent: €{formData.property1Rent}/month
							</p>
						</div>
						<div>
							<h4 className="font-medium text-gray-900 dark:text-white mb-2">
								{formData.tenant2Name}'s Property
							</h4>
							<p className="text-gray-600 dark:text-gray-400 mb-1">{formData.property2Address}</p>
							<p className="text-gray-600 dark:text-gray-400 mb-2">{formData.property2Description}</p>
							<p className="font-medium text-gray-900 dark:text-white">
								Base Rent: €{formData.property2Rent}/month
							</p>
						</div>
					</div>
				</div>

				{/* Timeline Review */}
				<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
					<div className="flex items-center mb-4">
						<Calendar className="h-5 w-5 text-blue-600 mr-2" />
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Timeline</h3>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<h4 className="font-medium text-gray-900 dark:text-white mb-1">Start Date</h4>
							<p className="text-gray-600 dark:text-gray-400">
								{new Date(formData.startDate).toLocaleDateString()}
							</p>
						</div>
						<div>
							<h4 className="font-medium text-gray-900 dark:text-white mb-1">End Date</h4>
							<p className="text-gray-600 dark:text-gray-400">
								{new Date(formData.endDate).toLocaleDateString()}
							</p>
						</div>
						<div>
							<h4 className="font-medium text-gray-900 dark:text-white mb-1">Duration</h4>
							<p className="text-gray-600 dark:text-gray-400">{duration}</p>
						</div>
					</div>
					{formData.specialTerms && (
						<div className="mt-4">
							<h4 className="font-medium text-gray-900 dark:text-white mb-1">Special Terms</h4>
							<p className="text-gray-600 dark:text-gray-400">{formData.specialTerms}</p>
						</div>
					)}
				</div>

				{/* Pricing Review */}
				<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
					<div className="flex items-center mb-4">
						<Euro className="h-5 w-5 text-blue-600 mr-2" />
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pricing Summary</h3>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<h4 className="font-medium text-gray-900 dark:text-white mb-2">
								{formData.tenant1Name} pays monthly:
							</h4>
							<div className="space-y-1 text-sm">
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Base rent:</span>
									<span>€{pricing.property2Rent.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
                                                                        <span className="text-gray-600 dark:text-gray-400">SwapSecure package:</span>
									<span>€{pricing.property2PlatformFee.toFixed(2)}</span>
								</div>
								<div className="flex justify-between font-semibold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-600 pt-1">
									<span>Total:</span>
									<span>€{pricing.property2Total.toFixed(2)}</span>
								</div>
							</div>
						</div>
						<div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<h4 className="font-medium text-gray-900 dark:text-white mb-2">
								{formData.tenant2Name} pays monthly:
							</h4>
							<div className="space-y-1 text-sm">
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Base rent:</span>
									<span>€{pricing.property1Rent.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
                                                                        <span className="text-gray-600 dark:text-gray-400">SwapSecure package:</span>
									<span>€{pricing.property1PlatformFee.toFixed(2)}</span>
								</div>
								<div className="flex justify-between font-semibold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-600 pt-1">
									<span>Total:</span>
									<span>€{pricing.property1Total.toFixed(2)}</span>
								</div>
							</div>
						</div>
					</div>
				</div>

                                {/* Terms Confirmation */}
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6 border border-green-200 dark:border-green-800">
                                        <div className="flex items-center">
                                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                                <span className="text-green-800 dark:text-green-200 font-medium">
                                                        Terms & Conditions have been read and accepted
                                                </span>
                                        </div>
                                        {formData.specialTerms && (
                                                <div className="flex items-center mt-2">
                                                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                                        <span className="text-green-800 dark:text-green-200 font-medium">
                                                                Additional terms have been accepted
                                                        </span>
                                                </div>
                                        )}
                                </div>

                                {/* Sign Slider */}
                                <div className="text-center">
                                        <SignSlider signed={signed} onSign={handleSign} />
                                </div>
			</div>
		</div>
	);
};

export default ReviewStep;
