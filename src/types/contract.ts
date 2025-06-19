// src/types/contract.ts

export interface ContractFormData {
	tenant1Name: string;
	tenant1Email: string;
	tenant1Phone: string;
	tenant2Name: string;
	tenant2Email: string;
	tenant2Phone: string;
	property1Address: string;
	property1Rent: string;
	property1Description: string;
	property2Address: string;
	property2Rent: string;
	property2Description: string;
	startDate: string;
	endDate: string;
	duration: string;
	specialTerms: string;
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
