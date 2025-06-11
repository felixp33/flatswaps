// src/lib/auth/validation.ts

import { ValidationErrors } from "@/types/auth";

export const validateEmail = (email: string): string | null => {
	if (!email) return "Email is required";
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) return "Please enter a valid email address";
	return null;
};

export const validatePassword = (password: string): string | null => {
	if (!password) return "Password is required";
	if (password.length < 8) return "Password must be at least 8 characters";
	if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter";
	if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter";
	if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
	// Special character requirement removed
	return null;
};

export const validateFullName = (name: string): string | null => {
	if (!name.trim()) return "Full name is required";
	if (name.trim().length < 2) return "Name must be at least 2 characters";
	if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name)) return "Name contains invalid characters";
	const nameParts = name.trim().split(/\s+/);
	if (nameParts.length < 2) return "Please enter your full name (first and last name)";
	return null;
};

export const validatePhoneNumber = (phone: string): string | null => {
	if (!phone) return null; // Phone is optional
	const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
	if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""))) {
		return "Please enter a valid phone number";
	}
	return null;
};

export const validateBio = (bio: string): string | null => {
	if (bio && bio.length > 500) return "Bio must be less than 500 characters";
	return null;
};

export const validateLocation = (city: string, country: string): ValidationErrors => {
	const errors: ValidationErrors = {};
	if (!city.trim()) errors.city = "City is required";
	if (!country.trim()) errors.country = "Country is required";
	return errors;
};

export const getPasswordStrength = (
	password: string
): {
	score: number;
	feedback: string;
	color: string;
} => {
	let score = 0;
	let feedback = "";
	let color = "bg-red-500";

	if (password.length >= 8) score += 1;
	if (/(?=.*[a-z])/.test(password)) score += 1;
	if (/(?=.*[A-Z])/.test(password)) score += 1;
	if (/(?=.*\d)/.test(password)) score += 1;
	// Special character check removed from scoring

	switch (score) {
		case 0:
		case 1:
			feedback = "Very weak";
			color = "bg-red-500";
			break;
		case 2:
			feedback = "Weak";
			color = "bg-orange-500";
			break;
		case 3:
			feedback = "Fair";
			color = "bg-yellow-500";
			break;
		case 4:
			feedback = "Strong";
			color = "bg-green-500";
			break;
	}

	return { score, feedback, color };
};

export const validateSignUpForm = (data: {
	fullName: string;
	email: string;
	password: string;
	acceptTerms: boolean;
}): ValidationErrors => {
	const errors: ValidationErrors = {};

	const nameError = validateFullName(data.fullName);
	if (nameError) errors.fullName = nameError;

	const emailError = validateEmail(data.email);
	if (emailError) errors.email = emailError;

	const passwordError = validatePassword(data.password);
	if (passwordError) errors.password = passwordError;

	if (!data.acceptTerms) {
		errors.acceptTerms = "You must accept the terms and conditions";
	}

	return errors;
};

export const validateProfileForm = (data: {
	location: { city: string; country: string };
	bio: string;
	languages: string[];
}): ValidationErrors => {
	const errors: ValidationErrors = {};

	const locationErrors = validateLocation(data.location.city, data.location.country);
	Object.assign(errors, locationErrors);

	const bioError = validateBio(data.bio);
	if (bioError) errors.bio = bioError;

	if (data.languages.length === 0) {
		errors.languages = "Please select at least one language";
	}

	return errors;
};

export const validateVerificationCode = (code: string): string | null => {
	if (!code) return "Verification code is required";
	if (!/^\d{6}$/.test(code)) return "Verification code must be 6 digits";
	return null;
};
