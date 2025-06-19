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
			default:
				return true;
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
			<div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4">
				{steps.map((step, index) => {
					const Icon = step.icon;
					const isActive = currentStep === step.number;
					const isCompleted = currentStep > step.number;

					return (
						<div key={step.number} className="flex items-center">
							<div
								className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
									isActive
										? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
										: isCompleted
										? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
										: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
								}`}
							>
								{isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
								<span className="text-sm font-medium whitespace-nowrap">{step.title}</span>
							</div>
							{index < steps.length - 1 && <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />}
						</div>
					);
				})}
			</div>

			{/* Step Content */}
			<div className="mb-8">{renderStepContent()}</div>

			{/* Navigation */}
			<div className="flex justify-between items-center">
				<button
					onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
					disabled={currentStep === 1}
					className={`px-6 py-2 rounded-lg transition-colors ${
						currentStep === 1
							? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
							: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
					}`}
				>
					Previous
				</button>

				{currentStep < 4 ? (
					<button
						onClick={() => setCurrentStep(currentStep + 1)}
						disabled={!isStepValid(currentStep)}
						className={`px-6 py-2 rounded-lg transition-colors ${
							isStepValid(currentStep)
								? "bg-blue-600 text-white hover:bg-blue-700"
								: "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
						}`}
					>
						Next
					</button>
				) : (
					<button
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
					>
						Complete
					</button>
				)}
			</div>
		</div>
	);
};

export default ContractWizard;
