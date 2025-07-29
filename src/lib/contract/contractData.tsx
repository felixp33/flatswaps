// src/lib/contract/contractData.ts
import { ConversationData } from "@/types/contract";

export const getConversationData = (conversationId: string): ConversationData => {
	// This would be fetched from your backend based on conversationId
	const mockData: Record<string, ConversationData> = {
		"1": {
			currentUser: {
				name: "Alex Johnson",
				email: "alex.johnson@email.com",
				location: "Berlin, Germany",
				property: {
					id: "1",
					title: "Berlin Altbau",
					location: "Friedrichshain, Berlin, Germany",
					rooms: 2,
					bathrooms: 1,
					rent: 1200,
					description: "Beautiful Altbau flat in the heart of Berlin, perfect for couples or small families.",
				},
			},
			otherUser: {
				name: "Carlos Gomez",
				email: "carlos.gomez@email.com",
				location: "Barcelona, Spain",
				property: {
					id: "2",
					title: "Cozy Apartment Near Beach",
					location: "Barceloneta, Barcelona, Spain",
					rooms: 2,
					bathrooms: 1,
					rent: 950,
					description: "2-bedroom apartment just 5 minutes from the beach with modern amenities.",
				},
			},
		},
		"2": {
			currentUser: {
				name: "Alex Johnson",
				email: "alex.johnson@email.com",
				location: "Berlin, Germany",
				property: {
					id: "1",
					title: "Berlin Altbau",
					location: "Friedrichshain, Berlin, Germany",
					rooms: 2,
					bathrooms: 1,
					rent: 1200,
				},
			},
			otherUser: {
				name: "Marco Rodriguez",
				email: "marco.rodriguez@email.com",
				location: "Rome, Italy",
				property: {
					id: "3",
					title: "Historic Villa in Trastevere",
					location: "Trastevere, Rome, Italy",
					rooms: 3,
					bathrooms: 2,
					rent: 1400,
				},
			},
		},
	};

	return mockData[conversationId] || mockData["1"];
};
