// src/components/messages/ChatArea.tsx
import { MoreVertical, MapPin, FileText } from "lucide-react";
import Link from "next/link";
import { Conversation, Message } from "@/types/messages";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

interface ChatAreaProps {
	conversation: Conversation;
	messages: Message[];
	onShowUserProfile: () => void;
	onSendMessage: (message: string, files: File[]) => void;
}

export default function ChatArea({ conversation, messages, onShowUserProfile, onSendMessage }: ChatAreaProps) {
	return (
		<div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
			{/* Chat Header */}
			<div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="relative">
							<button
								onClick={onShowUserProfile}
								className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center hover:ring-2 hover:ring-blue-500 transition-all"
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
						<div>
							<button
								onClick={onShowUserProfile}
								className="text-left hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded transition-colors"
							>
								<h3 className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
									{conversation.user.name}
								</h3>
								<div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
									<MapPin className="h-3 w-3 mr-1" />
									{conversation.user.location}
								</div>
							</button>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						{/* Contract Template Button - Now links to contract page */}
						<Link href={`/contract/${conversation.id}`}>
							<button className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
								<FileText className="h-4 w-4 mr-2" />
								Contract
							</button>
						</Link>
						<button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
							<MoreVertical className="h-5 w-5" />
						</button>
					</div>
				</div>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.map((message) => (
					<MessageBubble key={message.id} message={message} />
				))}
			</div>

			{/* Message Input */}
			<MessageInput onSendMessage={onSendMessage} />
		</div>
	);
}
