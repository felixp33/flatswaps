// src/types/auth.ts

export interface User {
	id: string;
	email: string;
	fullName: string;
	profilePhoto?: string;
	location?: {
		city: string;
		country: string;
	};
	bio?: string;
	languages?: string[];
	phoneNumber?: string;
	verified: {
		email: boolean;
		phone: boolean;
		identity: boolean;
		university: boolean;
	};
	preferences: {
		contactMethod: "email" | "phone" | "both";
		notifications: boolean;
		marketing: boolean;
	};
	memberSince: string;
	lastActive?: string;
}

export interface SignUpData {
	fullName: string;
	email: string;
	password: string;
	acceptTerms: boolean;
}

export interface ProfileSetupData {
	profilePhoto?: File;
	location: {
		city: string;
		country: string;
	};
	bio: string;
	languages: string[];
	contactMethod: "email" | "phone" | "both";
}

export interface VerificationData {
	emailCode?: string;
	phoneNumber?: string;
	phoneCode?: string;
	universityEmail?: string;
}

export interface OnboardingState {
	currentStep: number;
	totalSteps: number;
	completedSteps: boolean[];
	signUpData: Partial<SignUpData>;
	profileData: Partial<ProfileSetupData>;
	verificationData: Partial<VerificationData>;
	isLoading: boolean;
	errors: Record<string, string>;
}

export interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (data: SignUpData) => Promise<void>;
	signOut: () => Promise<void>;
	updateProfile: (data: Partial<User>) => Promise<void>;
	sendVerificationEmail: () => Promise<void>;
	verifyEmail: (code: string) => Promise<void>;
	sendPhoneVerification: (phoneNumber: string) => Promise<void>;
	verifyPhone: (code: string) => Promise<void>;
}

export interface ValidationErrors {
	[key: string]: string;
}

export interface FormFieldProps {
	label: string;
	name: string;
	type?: string;
	value: string;
	onChange: (value: string) => void;
	error?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
}

export interface SocialProvider {
        id: "google" | "apple" | "linkedin";
	name: string;
	icon: string;
	color: string;
}
