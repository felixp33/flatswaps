// src/components/messages/ConversationList.tsx
"use client";

import { Search, MoreVertical, MapPin } from "lucide-react";
import { Conversation } from "@/types/messages";

interface ConversationListProps {
	conversations: Conversation[];
	selectedConversationId: string;
	onSelectConversation: (id: string) => void;
	onShowUserProfile: (conversationId: string) => void;
}

export default function ConversationList({
	conversations,
	selectedConversationId,
	onSelectConversation,
	onShowUserProfile,
}: ConversationListProps) {
	return (
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
						onClick={() => onSelectConversation(conversation.id)}
						className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
							conversation.id === selectedConversationId ? "bg-blue-50 dark:bg-blue-900/20" : ""
						}`}
					>
						<div className="flex items-start space-x-3">
							<div className="relative">
								<button
									onClick={(e) => {
										e.stopPropagation();
										onShowUserProfile(conversation.id);
									}}
									className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center hover:ring-2 hover:ring-blue-500 transition-all"
								>
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
										{conversation.user.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</span>
								</button>
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
	);
}
