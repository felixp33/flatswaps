// src/app/profile/messages/page.tsx
"use client";

import { useState } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { MessageCircle, Search, Phone, Video, MoreVertical, Send, Paperclip, Smile, MapPin, User } from "lucide-react";
import Image from "next/image";

// Type definitions
interface Message {
	id: string;
	text: string;
	timestamp: string;
	fromMe: boolean;
}

interface User {
	name: string;
	location: string;
	avatar: string;
	online: boolean;
}

interface Conversation {
	id: string;
	user: User;
	lastMessage: {
		text: string;
		timestamp: string;
		isRead: boolean;
		fromMe: boolean;
	};
	unread: number;
}

interface ConversationMessages {
	[key: string]: Message[];
}

export default function MessagesPage() {
	const [selectedConversationId, setSelectedConversationId] = useState("1");
	const [showUserProfile, setShowUserProfile] = useState(false);
	const [messageInput, setMessageInput] = useState("");

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

	// Mock messages for each conversation
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
			},
			{
				id: "4",
				text: "That sounds perfect! I'm planning to visit Barcelona in March. What dates work for you?",
				timestamp: "11:02 AM",
				fromMe: true,
			},
			{
				id: "5",
				text: "March 15-25 would be ideal for me. How about you?",
				timestamp: "11:15 AM",
				fromMe: false,
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

	const handleSendMessage = () => {
		if (messageInput.trim()) {
			// In a real app, this would send the message to the backend
			console.log("Sending message:", messageInput);
			setMessageInput("");
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<ProfileLayout>
			<div className="h-[calc(100vh-4rem)] flex">
				{/* Conversations List */}
				<div className="w-1/3 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
					{/* Messages Header */}
					<div className="p-4 border-b border-gray-200 dark:border-gray-700">
						<div className="flex items-center justify-between mb-4">
							<h1 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h1>
							<button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
								<MoreVertical className="h-5 w-5" />
							</button>
						</div>
						{/* Search */}
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
							<input
								type="text"
								placeholder="Search conversations..."
								className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>

					{/* Conversations */}
					<div className="overflow-y-auto h-full">
						{conversations.map((conversation) => (
							<div
								key={conversation.id}
								onClick={() => setSelectedConversationId(conversation.id)}
								className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
									conversation.id === selectedConversationId ? "bg-blue-50 dark:bg-blue-900/20" : ""
								}`}
							>
								<div className="flex items-start space-x-3">
									<div className="relative">
										<div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
											<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
												{conversation.user.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</span>
										</div>
										{conversation.user.online && (
											<div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
										)}
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between">
											<p className="text-sm font-medium text-gray-900 dark:text-white truncate">
												{conversation.user.name}
											</p>
											<div className="flex items-center space-x-1">
												{conversation.unread > 0 && (
													<span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium leading-none text-white bg-blue-600 rounded-full">
														{conversation.unread}
													</span>
												)}
												<span className="text-xs text-gray-500 dark:text-gray-400">
													{conversation.lastMessage.timestamp}
												</span>
											</div>
										</div>
										<div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
											<MapPin className="h-3 w-3 mr-1" />
											{conversation.user.location}
										</div>
										<p
											className={`text-sm truncate ${
												conversation.lastMessage.isRead
													? "text-gray-600 dark:text-gray-400"
													: "text-gray-900 dark:text-white font-medium"
											}`}
										>
											{conversation.lastMessage.fromMe && "You: "}
											{conversation.lastMessage.text}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Chat Area */}
				{selectedConversation ? (
					<div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
						{/* Chat Header */}
						<div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div className="relative">
										<div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
											<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
												{selectedConversation.user.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</span>
										</div>
										{selectedConversation.user.online && (
											<div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
										)}
									</div>
									<div>
										<button
											onClick={() => setShowUserProfile(true)}
											className="text-left hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded transition-colors"
										>
											<h3 className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
												{selectedConversation.user.name}
											</h3>
											<div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
												<MapPin className="h-3 w-3 mr-1" />
												{selectedConversation.user.location}
											</div>
										</button>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
										<Phone className="h-5 w-5" />
									</button>
									<button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
										<Video className="h-5 w-5" />
									</button>
									<button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
										<MoreVertical className="h-5 w-5" />
									</button>
								</div>
							</div>
						</div>

						{/* Messages */}
						<div className="flex-1 overflow-y-auto p-4 space-y-4">
							{currentMessages.map((message) => (
								<div key={message.id} className={`flex ${message.fromMe ? "justify-end" : "justify-start"}`}>
									<div
										className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
											message.fromMe
												? "bg-blue-600 text-white"
												: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
										}`}
									>
										<p className="text-sm">{message.text}</p>
										<p
											className={`text-xs mt-1 ${
												message.fromMe ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
											}`}
										>
											{message.timestamp}
										</p>
									</div>
								</div>
							))}
						</div>

						{/* Message Input */}
						<div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
							<div className="flex items-center space-x-2">
								<button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
									<Paperclip className="h-5 w-5" />
								</button>
								<div className="flex-1 relative">
									<input
										type="text"
										placeholder="Type a message..."
										value={messageInput}
										onChange={(e) => setMessageInput(e.target.value)}
										onKeyPress={handleKeyPress}
										className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									<button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
										<Smile className="h-5 w-5" />
									</button>
								</div>
								<button
									onClick={handleSendMessage}
									className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
									disabled={!messageInput.trim()}
								>
									<Send className="h-5 w-5" />
								</button>
							</div>
						</div>
					</div>
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
					<UserProfileModal user={selectedConversation.user} onClose={() => setShowUserProfile(false)} />
				)}
			</div>
		</ProfileLayout>
	);
}

// User Profile Modal Component
interface UserProfileModalProps {
	user: User;
	onClose: () => void;
}

function UserProfileModal({ user, onClose }: UserProfileModalProps) {
	// Mock user profile data - in real app this would be fetched based on user ID
	const profileData = {
		...user,
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
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-bold text-gray-900 dark:text-white">User Profile</h2>
						<button
							onClick={onClose}
							className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
						>
							<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				{/* Profile Content */}
				<div className="p-6 space-y-6">
					{/* User Info */}
					<div className="flex items-start space-x-4">
						<div className="relative">
							<div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
								{profileData.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</div>
							{profileData.online && (
								<div className="absolute bottom-0 right-0 h-5 w-5 bg-green-400 border-2 border-white rounded-full"></div>
							)}
						</div>
						<div className="flex-1">
							<div className="flex items-center space-x-2 mb-2">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{profileData.name}</h3>
								{profileData.verified && (
									<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
										Verified
									</span>
								)}
							</div>
							<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
								<MapPin className="h-4 w-4 mr-1" />
								{profileData.location}
							</div>
							<div className="flex items-center space-x-4 text-sm">
								<div className="flex items-center">
									<span className="text-yellow-400 mr-1">★</span>
									<span className="text-gray-900 dark:text-white font-medium">{profileData.rating}</span>
									<span className="text-gray-500 dark:text-gray-400 ml-1">
										({profileData.reviewCount} reviews)
									</span>
								</div>
								<div className="text-gray-500 dark:text-gray-400">
									{profileData.responseRate}% response rate
								</div>
							</div>
						</div>
					</div>

					{/* Bio */}
					<div>
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">About</h4>
						<p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{profileData.bio}</p>
					</div>

					{/* Languages */}
					<div>
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Languages</h4>
						<div className="flex flex-wrap gap-2">
							{profileData.languages.map((language, index) => (
								<span
									key={index}
									className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
								>
									{language}
								</span>
							))}
						</div>
					</div>

					{/* Properties */}
					<div>
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Properties</h4>
						<div className="space-y-3">
							{profileData.properties.map((property) => (
								<div key={property.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
									<div className="flex items-start space-x-3">
										<div className="w-16 h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
										<div className="flex-1">
											<h5 className="text-sm font-medium text-gray-900 dark:text-white">{property.title}</h5>
											<p className="text-xs text-gray-500 dark:text-gray-400">{property.location}</p>
											<div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
												<span>
													{property.bedrooms} bed • {property.bathrooms} bath
												</span>
												<span className="ml-2 flex items-center">
													<span className="text-yellow-400 mr-1">★</span>
													{property.rating}
												</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Recent Reviews */}
					<div>
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Recent Reviews</h4>
						<div className="space-y-3">
							{profileData.reviews.map((review) => (
								<div key={review.id} className="border-l-2 border-blue-200 dark:border-blue-800 pl-3">
									<div className="flex items-center space-x-2 mb-1">
										<span className="text-sm font-medium text-gray-900 dark:text-white">{review.author}</span>
										<div className="flex text-yellow-400">
											{[...Array(review.rating)].map((_, i) => (
												<span key={i}>★</span>
											))}
										</div>
										<span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-300">{review.text}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
