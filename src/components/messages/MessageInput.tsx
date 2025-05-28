// src/components/messages/MessageInput.tsx
"use client";

import { useState, useRef } from "react";
import { Send, Paperclip, Smile, X, ImageIcon, FileText } from "lucide-react";

interface MessageInputProps {
	onSendMessage: (message: string, files: File[]) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
	const [messageInput, setMessageInput] = useState("");
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);
		setSelectedFiles((prev) => [...prev, ...files]);
	};

	const removeSelectedFile = (index: number) => {
		setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSendMessage = () => {
		if (messageInput.trim() || selectedFiles.length > 0) {
			onSendMessage(messageInput, selectedFiles);
			setMessageInput("");
			setSelectedFiles([]);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const getFileIcon = (type: string) => {
		if (type.startsWith("image/")) return ImageIcon;
		return FileText;
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	return (
		<div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
			{/* File Preview */}
			{selectedFiles.length > 0 && (
				<div className="mb-3 space-y-2">
					{selectedFiles.map((file, index) => {
						const FileIcon = getFileIcon(file.type);
						return (
							<div
								key={index}
								className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
							>
								<FileIcon className="h-4 w-4 text-gray-500" />
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
								</div>
								<button
									onClick={() => removeSelectedFile(index)}
									className="p-1 text-gray-400 hover:text-red-500"
								>
									<X className="h-4 w-4" />
								</button>
							</div>
						);
					})}
				</div>
			)}

			<div className="flex items-end space-x-2">
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileSelect}
					multiple
					className="hidden"
					accept="image/*,.pdf,.doc,.docx,.txt"
				/>
				<button
					onClick={() => fileInputRef.current?.click()}
					className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<Paperclip className="h-5 w-5" />
				</button>
				<div className="flex-1 relative">
					<textarea
						placeholder="Type a message..."
						value={messageInput}
						onChange={(e) => setMessageInput(e.target.value)}
						onKeyPress={handleKeyPress}
						rows={1}
						className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
						style={{ minHeight: "40px", maxHeight: "120px" }}
					/>
					<button className="absolute right-2 bottom-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
						<Smile className="h-5 w-5" />
					</button>
				</div>
				<button
					onClick={handleSendMessage}
					className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={!messageInput.trim() && selectedFiles.length === 0}
				>
					<Send className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
}
