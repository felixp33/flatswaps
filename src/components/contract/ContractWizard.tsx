// src/components/contract/ContractWizard.tsx
"use client";

import React, { useState } from "react";
import { User, Home, Calendar, Calculator, FileText, CheckCircle } from "lucide-react";
import { ContractFormData } from "@/types/contract";
import TimelineStep from "./steps/TimelineStep";
import PricingStep from "./steps/PricingStep";
import TermsAgreementStep from "./steps/TermsAgreementStep";
import ReviewStep from "./steps/ReviewStep";
import ParticipantsStep from "./steps/PersonalInfoStep";
import PropertyDetailsStep from "./steps/PropertyDetailsStep";

interface ContractWizardProps {
	formData: ContractFormData;
	onFormDataChange: (field: keyof ContractFormData, value: string | number | boolean) => void;
}

const ContractWizard: React.FC<ContractWizardProps> = ({ formData, onFormDataChange }) => {
	const [currentStep, setCurrentStep] = useState(1);

	const steps = [
		{ number: 1, title: "Participants", icon: User },
		{ number: 2, title: "Properties", icon: Home },
		{ number: 3, title: "Timeline", icon: Calendar },
		{ number: 4, title: "Pricing", icon: Calculator },
		{ number: 5, title: "Terms", icon: FileText },
		{ number: 6, title: "Review", icon: CheckCircle },
	];

	const validateStep = (step: number): boolean => {
		switch (step) {
			case 1:
				return !!(formData.tenant1Name && formData.tenant1Email && formData.tenant2Name && formData.tenant2Email);
			case 2:
				return !!(
					formData.property1Address &&
					formData.property1Rent &&
					formData.property1Description &&
					formData.property2Address &&
					formData.property2Rent &&
					formData.property2Description
				);
			case 3:
				return !!(
					formData.startDate &&
					formData.endDate &&
					new Date(formData.startDate) < new Date(formData.endDate)
				);
			case 4:
				return !!(formData.property1Rent && formData.property2Rent);
                        case 5:
                                return (
                                        formData.hasReadTerms &&
                                        (!formData.specialTerms || formData.hasReadSpecialTerms)
                                );
			case 6:
				return validateStep(1) && validateStep(2) && validateStep(3) && validateStep(4) && validateStep(5);
			default:
				return false;
		}
	};

	const canProceedToNext = validateStep(currentStep);
	const isLastStep = currentStep === steps.length;

	const handleNext = () => {
		if (canProceedToNext && !isLastStep) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleStepClick = (stepNumber: number) => {
		// Allow going to any previous step or next step if current is valid
		if (stepNumber <= currentStep || (stepNumber === currentStep + 1 && canProceedToNext)) {
			setCurrentStep(stepNumber);
		}
	};

	const renderCurrentStep = () => {
		switch (currentStep) {
			case 1:
				return <ParticipantsStep formData={formData} onFormDataChange={onFormDataChange} />;
			case 2:
				return <PropertyDetailsStep formData={formData} onFormDataChange={onFormDataChange} />;
			case 3:
				return <TimelineStep formData={formData} onFormDataChange={onFormDataChange} />;
			case 4:
				return <PricingStep formData={formData} onFormDataChange={onFormDataChange} />;
			case 5:
				return <TermsAgreementStep formData={formData} onFormDataChange={onFormDataChange} />;
			case 6:
				return <ReviewStep formData={formData} onFormDataChange={onFormDataChange} />;
			default:
				return null;
		}
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
			{/* Progress Steps */}
			<div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
				<div className="flex items-center justify-between">
					{steps.map((step, index) => {
						const isActive = step.number === currentStep;
						const isCompleted = step.number < currentStep;
						const isAccessible =
							step.number <= currentStep || (step.number === currentStep + 1 && canProceedToNext);
						const Icon = step.icon;

						return (
							<React.Fragment key={step.number}>
								<div
									className={`flex items-center space-x-2 ${
										isAccessible ? "cursor-pointer" : "cursor-not-allowed"
									}`}
									onClick={() => handleStepClick(step.number)}
								>
									<div
										className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
											isCompleted
												? "bg-green-600 text-white"
												: isActive
												? "bg-blue-600 text-white"
												: isAccessible
												? "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
												: "bg-gray-100 dark:bg-gray-700 text-gray-400"
										}`}
									>
										{isCompleted ? <CheckCircle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
									</div>
									<span
										className={`text-sm font-medium ${
											isActive
												? "text-blue-600 dark:text-blue-400"
												: isCompleted
												? "text-green-600 dark:text-green-400"
												: isAccessible
												? "text-gray-600 dark:text-gray-300"
												: "text-gray-400"
										}`}
									>
										{step.title}
									</span>
								</div>
								{index < steps.length - 1 && (
									<div
										className={`h-px flex-1 mx-4 ${
											step.number < currentStep ? "bg-green-600" : "bg-gray-200 dark:bg-gray-600"
										}`}
									/>
								)}
							</React.Fragment>
						);
					})}
				</div>
			</div>

			{/* Step Content */}
			<div className="px-6 py-8">{renderCurrentStep()}</div>

			{/* Navigation */}
			<div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
				<button
					onClick={handlePrevious}
					disabled={currentStep === 1}
					className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					Previous
				</button>

                                <div className="flex space-x-3">
                                        {!isLastStep && (
                                                <button
                                                        onClick={handleNext}
                                                        disabled={!canProceedToNext}
                                                        className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                                                >
                                                        Next
                                                </button>
                                        )}
                                </div>
			</div>
		</div>
	);
};

export default ContractWizard;
