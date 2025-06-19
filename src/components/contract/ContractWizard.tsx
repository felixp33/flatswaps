// src/components/contract/ContractWizard.tsx
"use client";

import React, { useState } from "react";
import { User, Home, Calendar, FileText, Check, ArrowRight } from "lucide-react";
import { ContractFormData, ContractStep } from "@/types/contract";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import PropertyDetailsStep from "./steps/PropertyDetailsStep";
import TimelineStep from "./steps/TimelineStep";
import ReviewStep from "./steps/ReviewStep";

interface ContractWizardProps {
	formData: ContractFormData;
	onFormDataChange: (field: keyof ContractFormData, value: string) => void;
}

const ContractWizard: React.FC<ContractWizardProps> = ({ formData, onFormDataChange }) => {
	const [currentStep, setCurrentStep] = useState(1);

	const steps: ContractStep[] = [
		{ number: 1, title: "Personal Info", icon: User },
		{ number: 2, title: "Properties", icon: Home },
		{ number: 3, title: "Timeline", icon: Calendar },
		{ number: 4, title: "Review", icon: FileText },
	];

	const isStepValid = (step: number): boolean => {
		switch (step) {
			case 1:
				return !!(formData.tenant1Name && formData.tenant1Email && formData.tenant2Name && formData.tenant2Email);
			case 2:
				return !!(
					formData.property1Address &&
					formData.property1Rent &&
					formData.property2Address &&
					formData.property2Rent
				);
			case 3:
				return !!(formData.startDate && formData.endDate);
			case 4:
				return true; // Review step is always accessible
			default:
				return true;
		}
	};

	const isStepAccessible = (stepNumber: number): boolean => {
		// Step 1 is always accessible
		if (stepNumber === 1) return true;

		// Other steps are accessible if the previous step is valid
		for (let i = 1; i < stepNumber; i++) {
			if (!isStepValid(i)) return false;
		}
		return true;
	};

	const getStepStatus = (stepNumber: number) => {
		const isActive = currentStep === stepNumber;
		const isCompleted = isStepValid(stepNumber) && currentStep > stepNumber;
		const isAccessible = isStepAccessible(stepNumber);

		return { isActive, isCompleted, isAccessible };
	};

	const handleStepClick = (stepNumber: number) => {
		if (isStepAccessible(stepNumber)) {
			setCurrentStep(stepNumber);
		}
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return <PersonalInfoStep formData={formData} onFormDataChange={onFormDataChange} />;
			case 2:
				return <PropertyDetailsStep formData={formData} onFormDataChange={onFormDataChange} />;
			case 3:
				return <TimelineStep formData={formData} onFormDataChange={onFormDataChange} />;
			case 4:
				return <ReviewStep formData={formData} />;
			default:
				return null;
		}
	};

	return (
		<div className="space-y-8">
			{/* Progress Steps */}
			<div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4">
				{steps.map((step, index) => {
					const Icon = step.icon;
					const { isActive, isCompleted, isAccessible } = getStepStatus(step.number);

					return (
						<div key={step.number} className="flex items-center">
							<button
								onClick={() => handleStepClick(step.number)}
								disabled={!isAccessible}
								className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 min-w-fit ${
									isActive
										? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500 ring-opacity-50"
										: isCompleted
										? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800"
										: isAccessible
										? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
										: "bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 cursor-not-allowed"
								}`}
							>
								<div
									className={`flex items-center justify-center w-6 h-6 rounded-full ${
										isCompleted ? "bg-green-500 text-white" : isActive ? "bg-blue-500 text-white" : ""
									}`}
								>
									{isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
								</div>
								<span className="text-sm font-medium whitespace-nowrap">{step.title}</span>
								{isCompleted && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
							</button>
							{index < steps.length - 1 && (
								<ArrowRight
									className={`h-4 w-4 mx-2 transition-colors ${
										isCompleted ? "text-green-400" : "text-gray-400"
									}`}
								/>
							)}
						</div>
					);
				})}
			</div>

			{/* Step Progress Bar */}
			<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
				<div
					className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
					style={{
						width: `${(currentStep / steps.length) * 100}%`,
					}}
				/>
			</div>

			{/* Step Content */}
			<div className="mb-8 min-h-[400px]">
				<div className="animate-fadeIn">{renderStepContent()}</div>
			</div>

			{/* Navigation */}
			<div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
				<button
					onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
					disabled={currentStep === 1}
					className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
						currentStep === 1
							? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
							: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105"
					}`}
				>
					<ArrowRight className="h-4 w-4 mr-2 rotate-180" />
					Previous
				</button>

				<div className="flex items-center space-x-2">
					<span className="text-sm text-gray-500 dark:text-gray-400">
						Step {currentStep} of {steps.length}
					</span>
				</div>

				{currentStep < 4 ? (
					<button
						onClick={() => setCurrentStep(currentStep + 1)}
						disabled={!isStepValid(currentStep)}
						className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
							isStepValid(currentStep)
								? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg"
								: "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
						}`}
					>
						Next
						<ArrowRight className="h-4 w-4 ml-2" />
					</button>
				) : (
					<button
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 hover:scale-105 shadow-lg"
					>
						<Check className="h-4 w-4 mr-2" />
						Complete
					</button>
				)}
			</div>
		</div>
	);
};

export default ContractWizard;
