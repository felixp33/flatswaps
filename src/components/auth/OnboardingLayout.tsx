// src/components/auth/OnboardingLayout.tsx
"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import StepIndicator from "./StepIndicator";

interface OnboardingLayoutProps {
	children: ReactNode;
	currentStep: number;
	totalSteps: number;
	completedSteps: boolean[];
	stepLabels: string[];
	title: string;
	subtitle?: string;
	showBackButton?: boolean;
	onBack?: () => void;
}

export default function OnboardingLayout({
	children,
	currentStep,
	totalSteps,
	completedSteps,
	stepLabels,
	title,
	subtitle,
	showBackButton = true,
	onBack,
}: OnboardingLayoutProps) {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
			{/* Header */}
			<div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo */}
						<div className="flex items-center">
							{showBackButton && onBack && (
								<button
									onClick={onBack}
									className="mr-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
								>
									<ArrowLeft className="h-5 w-5" />
								</button>
							)}
							<Link href="/" className="text-2xl font-bold text-blue-600">
								flatswaps
							</Link>
						</div>

						{/* Help Link */}
						<div className="text-sm">
							<Link
								href="/help"
								className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
							>
								Need help?
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
				<div className="w-full max-w-4xl">
					{/* Step Indicator */}
					<StepIndicator
						currentStep={currentStep}
						totalSteps={totalSteps}
						completedSteps={completedSteps}
						stepLabels={stepLabels}
					/>

					{/* Content Card */}
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
						{/* Title */}
						<div className="text-center mb-8">
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
							{subtitle && <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>}
						</div>

						{/* Content */}
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
