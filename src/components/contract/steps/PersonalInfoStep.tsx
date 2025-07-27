// src/components/contract/steps/ParticipantsStep.tsx
"use client";

import React from "react";
import { User, Mail } from "lucide-react";
import { ContractFormData } from "@/types/contract";

interface ParticipantsStepProps {
        formData: ContractFormData;
        onFormDataChange: (field: keyof ContractFormData, value: string | number | boolean) => void;
}

const ParticipantsStep: React.FC<ParticipantsStepProps> = ({ formData }) => {
        return (
                <div className="space-y-8">
			<div className="text-center">
				<User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contract Participants</h2>
                                <p className="text-gray-600 dark:text-gray-400">Review the participants for this flat swap</p>
                        </div>

                        <div className="max-w-4xl mx-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Tenant A */}
                                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
						<div className="flex items-center mb-6">
							<div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
								<span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">A</span>
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tenant A (Initiating)</h3>
						</div>

                                                <div className="space-y-2 text-sm">
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                                <span className="font-medium text-gray-900 dark:text-white">Name:</span> {formData.tenant1Name}
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                                <span className="font-medium text-gray-900 dark:text-white">Email:</span> {formData.tenant1Email}
                                                        </p>
                                                </div>
                                        </div>

                                        {/* Tenant B */}
                                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
						<div className="flex items-center mb-6">
							<div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
								<span className="text-green-600 dark:text-green-400 font-semibold text-sm">B</span>
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tenant B (Responding)</h3>
						</div>

                                                <div className="space-y-2 text-sm">
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                                <span className="font-medium text-gray-900 dark:text-white">Name:</span> {formData.tenant2Name}
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                                <span className="font-medium text-gray-900 dark:text-white">Email:</span> {formData.tenant2Email}
                                                        </p>
                                                </div>
                                        </div>
                                </div>

				{/* Information Notice */}
				<div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
					<div className="flex items-start">
						<div className="flex-shrink-0">
							<svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">Participant Information</h4>
							<div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
								<p>• Both parties will receive a copy of the signed contract via email</p>
								<p>• Email addresses will be used for contract notifications and updates</p>
							</div>
						</div>
					</div>
				</div>

				{/* Privacy Notice */}
				<div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
					<p className="text-xs text-gray-600 dark:text-gray-400">
						<strong>Privacy:</strong> Personal information will only be used for contract purposes and will not be
						shared with third parties. Both parties consent to sharing their information with each other for the
						purpose of this flat swap agreement.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ParticipantsStep;
