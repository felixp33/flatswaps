// src/components/contract/steps/TermsAgreementStep.tsx
"use client";

import React from "react";
import { FileText, CheckCircle } from "lucide-react";
import { ContractFormData } from "@/types/contract";

interface TermsAgreementStepProps {
	formData: ContractFormData;
	onFormDataChange: (field: keyof ContractFormData, value: string | number | boolean) => void;
}

const TermsAgreementStep: React.FC<TermsAgreementStepProps> = ({ formData, onFormDataChange }) => {
	return (
		<div className="space-y-8">
			<div className="text-center">
				<FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Terms & Conditions</h2>
				<p className="text-gray-600 dark:text-gray-400">Please review and accept the terms before proceeding</p>
			</div>

			<div className="max-w-4xl mx-auto">
				{/* Terms Content */}
				<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
					<div className="max-h-96 overflow-y-auto">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
							Flatswaps Terms & Conditions
						</h3>

						<div className="prose dark:prose-invert text-sm space-y-4">
							<section>
								<h4 className="font-medium text-gray-900 dark:text-white">1. Agreement Overview</h4>
								<p className="text-gray-600 dark:text-gray-400">
									This agreement facilitates a temporary flat swap between two parties through the Flatswaps
									platform. Both parties agree to exchange their residential properties for the specified
									duration.
								</p>
							</section>

							<section>
                                                                <h4 className="font-medium text-gray-900 dark:text-white">2. Payment Terms</h4>
                                                                <p className="text-gray-600 dark:text-gray-400">
                                                                        Each party will pay the monthly rent plus a 4.5% SwapSecure package for the property they occupy.
									Payments are due monthly and must be made on time. Late payments may result in additional
									fees or termination of the agreement.
								</p>
							</section>

							<section>
								<h4 className="font-medium text-gray-900 dark:text-white">3. Property Care & Responsibility</h4>
								<p className="text-gray-600 dark:text-gray-400">
									Both parties are responsible for maintaining the properties in good condition during their
									occupancy. Any damages beyond normal wear and tear will be the responsibility of the
									occupying party. Property inspections may be conducted before and after the swap period.
								</p>
							</section>

							<section>
								<h4 className="font-medium text-gray-900 dark:text-white">4. Utilities & Services</h4>
								<p className="text-gray-600 dark:text-gray-400">
									Each party is responsible for utilities and services during their occupancy period, including
									electricity, gas, water, internet, and heating. Arrangements for utility transfers or
									payments should be coordinated between parties.
								</p>
							</section>

							<section>
								<h4 className="font-medium text-gray-900 dark:text-white">5. Cancellation Policy</h4>
								<p className="text-gray-600 dark:text-gray-400">
									Either party may cancel with 30 days written notice. Early termination may result in
									additional fees as outlined in the full agreement. Both parties must agree to any changes to
									the original terms.
								</p>
							</section>

							<section>
								<h4 className="font-medium text-gray-900 dark:text-white">6. Insurance & Liability</h4>
								<p className="text-gray-600 dark:text-gray-400">
									Each party is responsible for their personal belongings and actions. Both parties are
									strongly advised to maintain appropriate insurance coverage. Flatswaps is not liable for any
									damages, losses, or disputes arising from the swap arrangement.
								</p>
							</section>

							<section>
                                                                <h4 className="font-medium text-gray-900 dark:text-white">7. SwapSecure Package</h4>
                                                                <p className="text-gray-600 dark:text-gray-400">
                                                                        The 4.5% SwapSecure package covers secure payment processing, customer support, insurance
                                                                        coordination and platform maintenance. This fee is non-refundable and applies to each
                                                                        monthly payment.
								</p>
							</section>

							<section>
								<h4 className="font-medium text-gray-900 dark:text-white">8. Legal Compliance</h4>
								<p className="text-gray-600 dark:text-gray-400">
									Both parties are responsible for compliance with local housing laws and regulations. Landlord
									permissions must be obtained where required. This agreement does not override any existing
									lease obligations.
								</p>
							</section>

							<section>
								<h4 className="font-medium text-gray-900 dark:text-white">9. Dispute Resolution</h4>
								<p className="text-gray-600 dark:text-gray-400">
									Any disputes arising from this agreement should first be addressed through communication
									between parties. If resolution cannot be reached, disputes may be escalated through
									appropriate legal channels.
								</p>
							</section>

							<section>
								<h4 className="font-medium text-gray-900 dark:text-white">10. Platform Disclaimer</h4>
								<p className="text-gray-600 dark:text-gray-400">
									Flatswaps provides this platform as a convenience but accepts no responsibility for legal
									compliance or enforceability of agreements. Users proceed at their own discretion and are
									advised to consult legal professionals when necessary.
								</p>
							</section>
						</div>
					</div>
                                </div>

                                {/* Additional Terms */}
                                <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Extra Terms
                                        </label>
                                        <textarea
                                                value={formData.specialTerms}
                                                onChange={(e) => onFormDataChange("specialTerms", e.target.value)}
                                                rows={4}
                                                placeholder="Add any additional terms or agreements..."
                                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                                        />
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                Optional: Specify any extra rules or arrangements for this swap.
                                        </p>
                                </div>

                                {/* Agreement Checkbox */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 mt-1">
							<input
								type="checkbox"
								id="terms-agreement"
								checked={formData.hasReadTerms}
								onChange={(e) => onFormDataChange("hasReadTerms", e.target.checked)}
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
							/>
						</div>
						<div className="flex-grow">
							<label
								htmlFor="terms-agreement"
								className="text-sm font-medium text-blue-900 dark:text-blue-100 cursor-pointer"
							>
								I have read and agree to the Terms & Conditions *
							</label>
							<p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
								By checking this box, you confirm that you have read, understood, and agree to be bound by these
								terms and conditions.
							</p>
						</div>
						{formData.hasReadTerms && <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TermsAgreementStep;
