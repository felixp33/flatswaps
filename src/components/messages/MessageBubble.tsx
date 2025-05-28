// src/components/messages/MessageBubble.tsx
import { Download, ImageIcon, FileText } from "lucide-react";
import { Message, Attachment } from "@/types/messages";

interface MessageBubbleProps {
	message: Message;
}

interface AttachmentPreviewProps {
	attachment: Attachment;
	fromMe: boolean;
}

function AttachmentPreview({ attachment, fromMe }: AttachmentPreviewProps) {
	const Icon = attachment.type === "image" ? ImageIcon : FileText;

	return (
		<div
			className={`flex items-center space-x-2 p-2 rounded-lg mt-1 ${
				fromMe ? "bg-blue-500/20" : "bg-gray-200 dark:bg-gray-600"
			}`}
		>
			<Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
			<div className="flex-1 min-w-0">
				<p className={`text-xs font-medium truncate ${fromMe ? "text-blue-100" : "text-gray-900 dark:text-white"}`}>
					{attachment.name}
				</p>
				<p className={`text-xs ${fromMe ? "text-blue-200" : "text-gray-500 dark:text-gray-400"}`}>
					{attachment.size}
				</p>
			</div>
			<button
				className={`p-1 ${
					fromMe
						? "text-blue-200 hover:text-blue-100"
						: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
				}`}
			>
				<Download className="h-3 w-3" />
			</button>
		</div>
	);
}

export default function MessageBubble({ message }: MessageBubbleProps) {
	return (
		<div className={`flex ${message.fromMe ? "justify-end" : "justify-start"}`}>
			<div
				className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
					message.fromMe ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
				}`}
			>
				{message.text && <p className="text-sm">{message.text}</p>}

				{/* Attachments */}
				{message.attachments && message.attachments.length > 0 && (
					<div className="mt-2 space-y-1">
						{message.attachments.map((attachment) => (
							<AttachmentPreview key={attachment.id} attachment={attachment} fromMe={message.fromMe} />
						))}
					</div>
				)}

				<p className={`text-xs mt-1 ${message.fromMe ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
					{message.timestamp}
				</p>
			</div>
		</div>
	);
}
