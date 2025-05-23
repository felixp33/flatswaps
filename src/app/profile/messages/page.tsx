// src/app/profile/messages/page.tsx
import ProfileLayout from "@/components/profile/ProfileLayout";
import { MessageCircle, Search, Phone, Video, MoreVertical, Send, Paperclip, Smile, Star, MapPin } from "lucide-react";
import Image from "next/image";

export default function MessagesPage() {
	// Mock conversations data
	const conversations = [
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

	// Mock current conversation messages
	const currentMessages = [
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
	];

	const currentUser = conversations[0].user;

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
								className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
									conversation.id === "1" ? "bg-blue-50 dark:bg-blue-900/20" : ""
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
				<div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
					{/* Chat Header */}
					<div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<div className="relative">
									<div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
										<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
											{currentUser.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</span>
									</div>
									{currentUser.online && (
										<div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
									)}
								</div>
								<div>
									<h3 className="text-sm font-medium text-gray-900 dark:text-white">{currentUser.name}</h3>
									<div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
										<MapPin className="h-3 w-3 mr-1" />
										{currentUser.location}
									</div>
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
									className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
									<Smile className="h-5 w-5" />
								</button>
							</div>
							<button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
								<Send className="h-5 w-5" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</ProfileLayout>
	);
}
