// src/components/contract/steps/ReviewStep.tsx
"use client";

import React, { useState } from "react";
import { FileText, Download, Check } from "lucide-react";
import { ContractFormData } from "@/types/contract";
import { downloadContractPdf } from "@/lib/contract/contractGenerator";
import SignSlider from "../SignSlider";

interface ReviewStepProps {
	formData: ContractFormData;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => {
        const [signed, setSigned] = useState(false);

        const handleDownloadPdf = () => {
                downloadContractPdf(formData);
        };

        const handleSign = () => {
                setSigned(true);
        };

	return (
		<div className="space-y-8">
			<div className="text-center">
				<FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Review & Download</h2>
				<p className="text-gray-600 dark:text-gray-400">Review your contract details and download the agreement</p>
			</div>

			<div className="max-w-4xl mx-auto">
				<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contract Summary</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-medium text-gray-900 dark:text-white mb-2">You (Party A)</h4>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								{formData.tenant1Name}
								<br />
								{formData.tenant1Email}
								<br />
								{formData.property1Address}
							</p>
						</div>
						<div>
							<h4 className="font-medium text-gray-900 dark:text-white mb-2">Other Party (Party B)</h4>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								{formData.tenant2Name}
								<br />
								{formData.tenant2Email}
								<br />
								{formData.property2Address}
							</p>
						</div>
					</div>

					<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<h4 className="font-medium text-gray-900 dark:text-white mb-1">Start Date</h4>
								<p className="text-sm text-gray-600 dark:text-gray-400">{formData.startDate}</p>
							</div>
							<div>
								<h4 className="font-medium text-gray-900 dark:text-white mb-1">End Date</h4>
								<p className="text-sm text-gray-600 dark:text-gray-400">{formData.endDate}</p>
							</div>
							<div>
								<h4 className="font-medium text-gray-900 dark:text-white mb-1">Duration</h4>
								<p className="text-sm text-gray-600 dark:text-gray-400">{formData.duration}</p>
							</div>
                                                </div>
                                                <div className="mt-6 text-center">
                                                        <button
                                                                onClick={handleDownloadPdf}
                                                                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                                                        >
                                                                <Download className="h-5 w-5 mr-2" />
                                                                Download PDF
                                                        </button>
                                                </div>
                                        </div>
                                </div>

                                <div className="text-center mt-8">
                                        {!signed ? (
                                                <div className="inline-block">
                                                        <SignSlider signed={signed} onSign={handleSign} />
                                                </div>
                                        ) : (
                                                <span className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg">
                                                        <Check className="h-5 w-5 mr-2" />
                                                        Signed
                                                </span>
                                        )}
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                Professional contract template - ready for signatures
                                        </p>
                                </div>
			</div>
		</div>
	);
};

export default ReviewStep;
