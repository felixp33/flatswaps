// src/types/messages.ts

export interface Attachment {
	id: string;
	name: string;
	type: "image" | "document" | "other";
	size: string;
	url?: string;
}

export interface Message {
	id: string;
	text: string;
	timestamp: string;
	fromMe: boolean;
	attachments?: Attachment[];
}

export interface MessageUser {
	name: string;
	location: string;
	avatar: string;
	online: boolean;
}

export interface Conversation {
	id: string;
	user: MessageUser;
	lastMessage: {
		text: string;
		timestamp: string;
		isRead: boolean;
		fromMe: boolean;
	};
	unread: number;
}

export interface ConversationMessages {
	[key: string]: Message[];
}

export interface UserProfile extends MessageUser {
	memberSince: string;
	rating: number;
	reviewCount: number;
	responseRate: number;
	verified: boolean;
	bio: string;
	languages: string[];
	properties: Property[];
	reviews: Review[];
}

export interface Property {
        id: string;
        title: string;
        location: string;
        imageUrl: string;
        rooms: number;
        bathrooms: number;
        rating: number;
}

export interface Review {
	id: string;
	author: string;
	rating: number;
	date: string;
	text: string;
}
