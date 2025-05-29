// src/components/auth/FormField.tsx
"use client";

import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

interface FormFieldProps {
	label: string;
	name: string;
	type?: string;
	value: string;
	onChange: (value: string) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	error?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	hint?: string;
	autoComplete?: string;
}

export default function FormField({
	label,
	name,
	type = "text",
	value,
	onChange,
	onFocus,
	onBlur,
	error,
	placeholder,
	required = false,
	disabled = false,
	hint,
	autoComplete,
}: FormFieldProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const isPasswordField = type === "password";
	const inputType = isPasswordField && showPassword ? "text" : type;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		onChange(e.target.value);
	};

	const handleFocus = () => {
		setIsFocused(true);
		onFocus?.();
	};

	const handleBlur = () => {
		setIsFocused(false);
		onBlur?.();
	};

	const inputClasses = `
		w-full px-4 py-3 border rounded-lg transition-all duration-200
		${
			error
				? "border-red-300 focus:border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:border-red-400"
				: isFocused
				? "border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/50"
				: "border-gray-300 focus:border-blue-500 focus:ring-blue-100 dark:border-gray-600 dark:focus:border-blue-400"
		}
		${disabled ? "bg-gray-50 cursor-not-allowed dark:bg-gray-700" : "bg-white dark:bg-gray-800"}
		text-gray-900 dark:text-white
		placeholder-gray-500 dark:placeholder-gray-400
		focus:outline-none focus:ring-4
		text-base
		disabled:opacity-50
	`
		.trim()
		.replace(/\s+/g, " ");

	return (
		<div className="space-y-2">
			{/* Label */}
			<label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
				{label}
				{required && <span className="text-red-500 ml-1">*</span>}
			</label>

			{/* Input Container */}
			<div className="relative">
				{type === "textarea" ? (
					<textarea
						id={name}
						name={name}
						value={value}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						placeholder={placeholder}
						disabled={disabled}
						required={required}
						autoComplete={autoComplete}
						rows={4}
						className={inputClasses}
					/>
				) : (
					<input
						id={name}
						name={name}
						type={inputType}
						value={value}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						placeholder={placeholder}
						disabled={disabled}
						required={required}
						autoComplete={autoComplete}
						className={inputClasses}
					/>
				)}

				{/* Password Toggle Button */}
				{isPasswordField && (
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
						tabIndex={-1}
					>
						{showPassword ? (
							<EyeOff className="h-5 w-5" aria-label="Hide password" />
						) : (
							<Eye className="h-5 w-5" aria-label="Show password" />
						)}
					</button>
				)}

				{/* Error Icon */}
				{error && !isPasswordField && (
					<div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
						<AlertCircle className="h-5 w-5" />
					</div>
				)}
			</div>

			{/* Error Message */}
			{error && (
				<div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
					<AlertCircle className="h-4 w-4 flex-shrink-0" />
					<span>{error}</span>
				</div>
			)}

			{/* Hint Text */}
			{hint && !error && <p className="text-sm text-gray-500 dark:text-gray-400">{hint}</p>}
		</div>
	);
}
