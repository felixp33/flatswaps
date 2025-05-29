// src/components/auth/PasswordStrength.tsx
"use client";

import { getPasswordStrength } from "@/lib/auth/validation";

interface PasswordStrengthProps {
	password: string;
	show: boolean;
}

export default function PasswordStrength({ password, show }: PasswordStrengthProps) {
	if (!show || !password) return null;

	const { score, feedback, color } = getPasswordStrength(password);
	const percentage = (score / 5) * 100;

	const requirements = [
		{ text: "At least 8 characters", met: password.length >= 8 },
		{ text: "One lowercase letter", met: /(?=.*[a-z])/.test(password) },
		{ text: "One uppercase letter", met: /(?=.*[A-Z])/.test(password) },
		{ text: "One number", met: /(?=.*\d)/.test(password) },
		{ text: "One special character", met: /(?=.*[@$!%*?&])/.test(password) },
	];

	return (
		<div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
			{/* Strength Bar */}
			<div className="mb-3">
				<div className="flex justify-between items-center mb-2">
					<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Password Strength</span>
					<span
						className={`text-sm font-medium ${
							score >= 4
								? "text-green-600"
								: score >= 3
								? "text-blue-600"
								: score >= 2
								? "text-yellow-600"
								: "text-red-600"
						}`}
					>
						{feedback}
					</span>
				</div>
				<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
					<div
						className={`h-2 rounded-full transition-all duration-300 ${color}`}
						style={{ width: `${percentage}%` }}
					></div>
				</div>
			</div>

			{/* Requirements Checklist */}
			<div className="space-y-2">
				<p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Password must contain:</p>
				{requirements.map((requirement, index) => (
					<div key={index} className="flex items-center space-x-2">
						<div
							className={`w-4 h-4 rounded-full flex items-center justify-center ${
								requirement.met
									? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
									: "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
							}`}
						>
							{requirement.met ? (
								<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							) : (
								<div className="w-2 h-2 rounded-full bg-current"></div>
							)}
						</div>
						<span
							className={`text-xs ${
								requirement.met ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
							}`}
						>
							{requirement.text}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
