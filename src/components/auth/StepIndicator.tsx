// src/components/auth/StepIndicator.tsx
"use client";

import { Check } from "lucide-react";

interface StepIndicatorProps {
	currentStep: number;
	totalSteps: number;
	completedSteps: boolean[];
	stepLabels: string[];
}

export default function StepIndicator({ currentStep, totalSteps, completedSteps, stepLabels }: StepIndicatorProps) {
	return (
		<div className="w-full max-w-3xl mx-auto mb-8">
			{/* Progress Bar */}
			<div className="relative mb-6">
				<div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2"></div>
				<div
					className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-500"
					style={{
						width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
					}}
				></div>
				<div className="relative flex justify-between">
					{Array.from({ length: totalSteps }, (_, index) => {
						const stepNumber = index + 1;
						const isCompleted = completedSteps[index] || stepNumber < currentStep;
						const isCurrent = stepNumber === currentStep;

						return (
							<div key={stepNumber} className="flex flex-col items-center">
								<div
									className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
										isCompleted
											? "bg-blue-600 border-blue-600 text-white"
											: isCurrent
											? "bg-white border-blue-600 text-blue-600 ring-4 ring-blue-100"
											: "bg-white border-gray-300 text-gray-400"
									}`}
								>
									{isCompleted ? (
										<Check className="h-4 w-4" />
									) : (
										<span className="text-sm font-medium">{stepNumber}</span>
									)}
								</div>
								<div className="mt-2 text-center">
									<span
										className={`text-xs font-medium ${
											isCurrent
												? "text-blue-600 dark:text-blue-400"
												: isCompleted
												? "text-gray-900 dark:text-white"
												: "text-gray-500 dark:text-gray-400"
										}`}
									>
										{stepLabels[index]}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Step Counter */}
			<div className="text-center">
				<span className="text-sm text-gray-500 dark:text-gray-400">
					Step {currentStep} of {totalSteps}
				</span>
			</div>
		</div>
	);
}
