// src/app/profile/messages/page.tsx
"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import ConversationList from "@/components/messages/ConversationList";
import ChatArea from "@/components/messages/ChatArea";
import UserProfileModal from "@/components/messages/UserProfileModal";
import { Conversation, ConversationMessages, UserProfile } from "@/types/messages";

export default function MessagesPage() {
	const [selectedConversationId, setSelectedConversationId] = useState("1");
	const [showUserProfile, setShowUserProfile] = useState(false);

	// Mock conversations data
	const conversations: Conversation[] = [
		{
			id: "1",
			user: {
				name: "Sarah Johnson",
				location: "Barcelona, Spain",
				avatar: "/images/avatar-1.png",
				online: true,
			},
			lastMessage: {
				text: "Great! I'll send you the house details and we can finalize the dates.",
				timestamp: "2 min ago",
				isRead: true,
				fromMe: false,
			},
			unread: 0,
		},
		{
			id: "2",
			user: {
				name: "Marco Rodriguez",
				location: "Rome, Italy",
				avatar: "/images/avatar-2.png",
				online: false,
			},
			lastMessage: {
				text: "Your property looks amazing! Are you available for a swap in June?",
				timestamp: "1 hour ago",
				isRead: false,
				fromMe: false,
			},
			unread: 2,
		},
		{
			id: "3",
			user: {
				name: "Emma Wilson",
				location: "London, UK",
				avatar: "/images/avatar-3.png",
				online: true,
			},
			lastMessage: {
				text: "Perfect! I'll prepare the welcome guide for you.",
				timestamp: "3 hours ago",
				isRead: true,
				fromMe: true,
			},
			unread: 0,
		},
		{
			id: "4",
			user: {
				name: "Alex Chen",
				location: "Tokyo, Japan",
				avatar: "/images/avatar-1.png",
				online: false,
			},
			lastMessage: {
				text: "Thank you for the wonderful stay! Left a 5-star review.",
				timestamp: "2 days ago",
				isRead: true,
				fromMe: false,
			},
			unread: 0,
		},
	];

	// Mock messages for each conversation with some having attachments
	const conversationMessages: ConversationMessages = {
		"1": [
			{
				id: "1",
				text: "Hi! I'm interested in your Manhattan loft for a potential swap.",
				timestamp: "10:30 AM",
				fromMe: false,
			},
			{
				id: "2",
				text: "Hello Sarah! Thanks for reaching out. I'd love to learn more about your place in Barcelona.",
				timestamp: "10:45 AM",
				fromMe: true,
			},
			{
				id: "3",
				text: "It's a 2-bedroom apartment just 5 minutes from the beach. I can send you some photos!",
				timestamp: "10:47 AM",
				fromMe: false,
				attachments: [
					{
						id: "att1",
						name: "living-room.jpg",
						type: "image",
						size: "2.3 MB",
						url: "/images/barcelona-living.jpg",
					},
					{
						id: "att2",
						name: "bedroom.jpg",
						type: "image",
						size: "1.8 MB",
						url: "/images/barcelona-bedroom.jpg",
					},
				],
			},
			{
				id: "4",
				text: "That sounds perfect! I'm planning to visit Barcelona in March. What dates work for you?",
				timestamp: "11:02 AM",
				fromMe: true,
			},
			{
				id: "5",
				text: "March 15-25 would be ideal for me. How about you? I'm attaching my house rules document.",
				timestamp: "11:15 AM",
				fromMe: false,
				attachments: [
					{
						id: "att3",
						name: "house-rules.pdf",
						type: "document",
						size: "245 KB",
					},
				],
			},
			{
				id: "6",
				text: "Great! I'll send you the house details and we can finalize the dates.",
				timestamp: "Just now",
				fromMe: false,
			},
		],
		"2": [
			{
				id: "1",
				text: "Your property looks amazing! Are you available for a swap in June?",
				timestamp: "1 hour ago",
				fromMe: false,
			},
			{
				id: "2",
				text: "Hi Marco! Thank you for your interest. June could work - what dates specifically?",
				timestamp: "45 min ago",
				fromMe: true,
			},
		],
		"3": [
			{
				id: "1",
				text: "Hi! I saw your listing and I'm very interested in a swap for April.",
				timestamp: "Yesterday",
				fromMe: true,
			},
			{
				id: "2",
				text: "Hello! April sounds great. My flat in London is available then.",
				timestamp: "Yesterday",
				fromMe: false,
			},
			{
				id: "3",
				text: "Perfect! I'll prepare the welcome guide for you.",
				timestamp: "3 hours ago",
				fromMe: true,
			},
		],
		"4": [
			{
				id: "1",
				text: "Thank you for the wonderful stay! Left a 5-star review.",
				timestamp: "2 days ago",
				fromMe: false,
			},
			{
				id: "2",
				text: "Thank you so much Alex! Your place was amazing too. Hope to swap again soon!",
				timestamp: "2 days ago",
				fromMe: true,
			},
		],
	};

	const selectedConversation = conversations.find((conv) => conv.id === selectedConversationId);
	const currentMessages = conversationMessages[selectedConversationId] || [];

	const handleSendMessage = (message: string, files: File[]) => {
		// In a real app, this would send the message and files to the backend
		console.log("Sending message:", message);
		console.log("Sending files:", files);

		// For demo purposes, we could add the message to the current conversation
		// This would typically be handled by your state management solution (Redux, Zustand, etc.)
	};

	const handleShowUserProfile = (conversationId?: string) => {
		if (conversationId) {
			setSelectedConversationId(conversationId);
		}
		setShowUserProfile(true);
	};

	// Mock user profile data - in real app this would be fetched based on user ID
	const getUserProfile = (): UserProfile => {
		const user = selectedConversation?.user;
		if (!user) {
			throw new Error("No selected conversation");
		}

		// In a real app, you'd fetch this data based on the user ID
		const profileDataMap: { [key: string]: Partial<UserProfile> } = {
			"1": {
				memberSince: "March 2023",
				rating: 4.8,
				reviewCount: 34,
				responseRate: 92,
				verified: true,
				bio: "Travel enthusiast and professional photographer. I love exploring new cultures and meeting people from around the world. My Barcelona apartment is perfect for couples looking to experience the city like locals.",
				languages: ["English", "Spanish", "French"],
				properties: [
					{
						id: "1",
						title: "Cozy Apartment Near Beach",
						location: "Barcelona, Spain",
						imageUrl: "/images/property-barcelona.png",
						bedrooms: 2,
						bathrooms: 1,
						rating: 4.9,
					},
				],
				reviews: [
					{
						id: "1",
						author: "John Smith",
						rating: 5,
						date: "2 weeks ago",
						text: "Sarah was an amazing host! Her place was exactly as described and the location was perfect.",
					},
					{
						id: "2",
						author: "Maria Garcia",
						rating: 5,
						date: "1 month ago",
						text: "Beautiful apartment with great amenities. Sarah was very responsive and helpful.",
					},
				],
			},
			"2": {
				memberSince: "January 2023",
				rating: 4.9,
				reviewCount: 67,
				responseRate: 88,
				verified: true,
				bio: "Architect and history lover living in the heart of Rome. My villa in Trastevere offers an authentic Roman experience with modern amenities.",
				languages: ["Italian", "English", "German"],
				properties: [
					{
						id: "2",
						title: "Historic Villa in Trastevere",
						location: "Rome, Italy",
						imageUrl: "/images/property-rome.png",
						bedrooms: 3,
						bathrooms: 2,
						rating: 4.9,
					},
				],
				reviews: [
					{
						id: "1",
						author: "Alice Johnson",
						rating: 5,
						date: "1 week ago",
						text: "Marco's place is absolutely stunning! Perfect location and incredible hospitality.",
					},
				],
			},
		};

		const profileData = profileDataMap[selectedConversationId] || profileDataMap["1"];

		return {
			...user,
			memberSince: profileData.memberSince || "2023",
			rating: profileData.rating || 4.5,
			reviewCount: profileData.reviewCount || 10,
			responseRate: profileData.responseRate || 90,
			verified: profileData.verified || false,
			bio: profileData.bio || "Home swap enthusiast",
			languages: profileData.languages || ["English"],
			properties: profileData.properties || [],
			reviews: profileData.reviews || [],
		};
	};

	return (
		<ProfileLayout>
			<div className="h-[calc(100vh-4rem)] flex">
				{/* Conversations List */}
				<ConversationList
					conversations={conversations}
					selectedConversationId={selectedConversationId}
					onSelectConversation={setSelectedConversationId}
					onShowUserProfile={handleShowUserProfile}
				/>

				{/* Chat Area or Empty State */}
				{selectedConversation ? (
					<ChatArea
						conversation={selectedConversation}
						messages={currentMessages}
						onShowUserProfile={() => setShowUserProfile(true)}
						onSendMessage={handleSendMessage}
					/>
				) : (
					<div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
						<div className="text-center">
							<MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a conversation</h3>
							<p className="text-gray-500 dark:text-gray-400">
								Choose a conversation from the sidebar to start messaging
							</p>
						</div>
					</div>
				)}

				{/* User Profile Modal */}
				{showUserProfile && selectedConversation && (
					<UserProfileModal user={getUserProfile()} onClose={() => setShowUserProfile(false)} />
				)}
			</div>
		</ProfileLayout>
	);
}
