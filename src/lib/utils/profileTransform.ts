// src/lib/utils/profileTransform.ts

import { Profile } from "@/lib/api";

/**
 * Transform database profile data to match UI expectations
 */
export function transformProfileForUI(profile: Profile | null, authEmail?: string) {
	if (!profile) {
		return null;
	}

	const fullName = `${profile.firstname || ""} ${profile.lastname || ""}`.trim();
	const displayName = fullName || authEmail?.split("@")[0] || "User";

	return {
		// Core fields
		name: displayName,
		firstName: profile.firstname || "",
		lastName: profile.lastname || "",
		email: profile.email || authEmail || "",

		// Location
		location: profile.location || "Location not set",

		// Profile details
		bio: profile.bio || "",
		phone: profile.phone || "",
		languages: profile.languages || [],

		// Employment
		employmentType: profile.employment_type || "",
		incomeRange: profile.income_range || "",
		income: profile.income,

		// Metadata
		verified: true, // You can implement verification logic
		rating: 4.8, // Default - implement rating system
		reviewCount: 0, // Default - implement review system
		memberSince: profile.created_at || new Date().toISOString(),

		// Additional fields for compatibility
		avatar: undefined, // Implement avatar storage if needed
		responseRate: 95, // Default - implement tracking
	};
}

/**
 * Transform UI form data back to database format
 */
export function transformProfileForDB(formData: any): Partial<Profile> {
	return {
		firstname: formData.firstName,
		lastname: formData.lastName,
		email: formData.email,
		phone: formData.phone,
		bio: formData.bio,
		location: formData.workLocation || formData.location,
		employment_type: formData.employmentType,
		income_range: formData.incomeRange,
		languages: formData.languages,
		updated_at: new Date().toISOString(),
	};
}

/**
 * Get display name from profile or email
 */
export function getDisplayName(profile: Profile | null, email?: string): string {
	if (profile?.firstname || profile?.lastname) {
		return `${profile.firstname || ""} ${profile.lastname || ""}`.trim();
	}

	if (email) {
		return email.split("@")[0];
	}

	return "User";
}

/**
 * Get initials for avatar
 */
export function getInitials(name: string): string {
	return name
		.split(" ")
		.map((n) => n[0])
		.filter(Boolean)
		.join("")
		.toUpperCase()
		.slice(0, 2);
}
