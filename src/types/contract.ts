// src/types/contract.ts

export interface ContractFormData {
	tenant1Name: string;
	tenant1Email: string;
	// Removed tenant1Phone
	tenant2Name: string;
	tenant2Email: string;
	// Removed tenant2Phone
	property1Address: string;
	property1Rent: string;
	property1Description: string;
	property2Address: string;
	property2Rent: string;
	property2Description: string;
	startDate: string;
	endDate: string;
	// Removed duration preset - calculated from dates
	specialTerms: string;
	// New fields for pricing and terms
  platformFeePercentage: number; // 4.5%
  hasReadTerms: boolean;
  hasReadSpecialTerms: boolean;
}

export interface PricingBreakdown {
	property1Rent: number;
	property1PlatformFee: number;
	property1Total: number;
	property2Rent: number;
	property2PlatformFee: number;
	property2Total: number;
}

export interface UserProperty {
	id: string;
	title: string;
	location: string;
	bedrooms: number;
	bathrooms: number;
	rent?: number;
	description?: string;
}

export interface ContractUser {
	name: string;
	email?: string;
	location: string;
	property?: UserProperty;
}

export interface ConversationData {
	currentUser: ContractUser;
	otherUser: ContractUser;
}

export interface ContractStep {
	number: number;
	title: string;
	icon: any; // Lucide React icon component
}
