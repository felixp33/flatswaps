// src/components/matches/MatchCard.tsx
import Link from "next/link";
import { MapPin, MessageCircle, Eye, Users, Shield, Calendar, Clock, CheckCircle, XCircle } from "lucide-react";

interface MatchCardProps {
	match: any;
	onAccept: (matchId: string) => void;
	onReject: (matchId: string) => void;
}

export default function MatchCard({ match, onAccept, onReject }: MatchCardProps) {
	const getStatusInfo = (status: string) => {
		switch (status) {
			case "new":
				return {
					label: "New Match",
					color: "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
					description: "Waiting for your response",
				};
			case "pending":
				return {
					label: "Pending",
					color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300",
					description: "Waiting for all participants",
				};
			case "accepted":
				return {
					label: "Confirmed",
					color: "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300",
					description: "Ready to contact",
				};
			case "rejected":
				return {
					label: "Cancelled",
					color: "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300",
					description: "Match was declined",
				};
			default:
				return {
					label: "Unknown",
					color: "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300",
					description: "",
				};
		}
	};

	const getParticipantStatus = (participant: any) => {
		if (participant.id === "currentUser") return null;
		if (match.status === "new") return "waiting";
		return participant.hasAccepted ? "accepted" : "pending";
	};

	const canShowPersonalInfo = (match: any) => {
		return match.status === "accepted";
	};

	const canShowContactInfo = (match: any) => {
		return match.status === "accepted";
	};

	const statusInfo = getStatusInfo(match.status);

	// Filter out current user to show only other participants
	const otherParticipants = match.participants.filter((p: any) => p.id !== "currentUser");

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
			{/* Header */}
			<div className="p-6 border-b border-gray-200 dark:border-gray-700">
				<div className="flex flex-col gap-4">
					{/* Top row with match info and search name */}
					<div className="flex flex-col sm:flex-row justify-between items-start gap-2">
						<div className="flex items-center space-x-3">
							<span
								className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}
							>
								{statusInfo.label}
							</span>
						</div>
						<div className="text-sm text-gray-500 dark:text-gray-400 text-right">
							<div className="font-medium">{match.searchName}</div>
							<div className="text-xs">{statusInfo.description}</div>
						</div>
					</div>

					{/* Bottom row with search info */}
					<div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
						<Eye className="h-4 w-4 mr-2" />
						<span>Created {match.createdAt}</span>
					</div>
				</div>
			</div>

			{/* Participants */}
			<div className="p-6">
				{otherParticipants.map((participant: any, index: number) => {
					const participantStatus = getParticipantStatus(participant);

					return (
						<div
							key={participant.id}
							className={`${index > 0 ? "border-t border-gray-100 dark:border-gray-700 pt-6 mt-6" : ""}`}
						>
							{/* Show full info for accepted matches */}
							{canShowPersonalInfo(match) && (
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center space-x-4">
										<div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
											{participant.initials || participant.name?.charAt(0) || "?"}
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
												{participant.name}
											</h3>
											<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
												<MapPin className="h-4 w-4 mr-1" />
												{participant.location}
											</div>
										</div>
									</div>
									{participantStatus && (
										<div className="flex flex-col items-end space-y-1">
											{participantStatus === "accepted" && (
												<span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
													<CheckCircle className="h-3 w-3 mr-1" />
													Accepted
												</span>
											)}
											{participantStatus === "pending" && (
												<span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
													<Clock className="h-3 w-3 mr-1" />
													Waiting
												</span>
											)}
											{participantStatus === "waiting" && (
												<span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
													<Clock className="h-3 w-3 mr-1" />
													Not responded
												</span>
											)}
										</div>
									)}
								</div>
							)}

							{/* Show anonymous header for non-accepted matches */}
							{!canShowPersonalInfo(match) && (
								<div className="flex items-center justify-between mb-3">
									<div className="flex items-center space-x-3">
										<div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-semibold">
											{participant.initials || "?"}
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
												{participant.name || `Partner ${index + 1}`}
											</h3>
											<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
												<MapPin className="h-4 w-4 mr-1" />
												{participant.location}
											</div>
										</div>
									</div>
									{match.status === "pending" && (
										<span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
											<Clock className="h-3 w-3 mr-1" />
											{participantStatus === "accepted" ? "Waiting for others" : "Waiting for response"}
										</span>
									)}
								</div>
							)}

							{/* Property Info */}
							<div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
								<div className="flex items-center justify-between mb-2">
									<h4 className="font-medium text-gray-900 dark:text-white">
										{participant.property?.title || "Property"}
									</h4>
									<Link
										href={`/listing/${participant.property?.id || participant.id}`}
										className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
									>
										<Eye className="h-4 w-4 inline mr-1" />
										View
									</Link>
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
									{participant.property?.location}
								</div>
								<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4 mb-2">
									<div className="flex items-center">
										<Users className="h-4 w-4 mr-1" />
										{participant.property?.guests} guests
									</div>
									<div>{participant.property?.bedrooms} bed</div>
									<div>{participant.property?.bathrooms} bath</div>
								</div>
								{participant.swapDates && (
									<div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
										<Calendar className="h-4 w-4 mr-2" />
										{participant.swapDates}
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>

			{/* Information message for non-accepted matches */}
			{!canShowPersonalInfo(match) && (
				<div className="mb-6 mx-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="flex items-center">
						<Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
						<div>
							<h4 className="font-medium text-blue-900 dark:text-blue-200 text-sm">Privacy Protection Active</h4>
							<p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
								Personal details and contact information will be revealed once all participants accept the
								match.
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Action Buttons */}
			<div className="flex justify-between items-center p-6 pt-4 border-t border-gray-200 dark:border-gray-700">
				<div className="flex items-center space-x-4">
					{canShowContactInfo(match) && (
						<Link
							href={`/profile/messages?match=${match.id}`}
							className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
						>
							<MessageCircle className="h-4 w-4 mr-2" />
							Start Conversation
						</Link>
					)}
				</div>

				{/* Accept/Reject buttons for new matches */}
				{match.status === "new" && (
					<div className="flex space-x-3">
						<button
							onClick={() => onReject(match.id)}
							className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
						>
							<XCircle className="h-4 w-4 mr-2" />
							Decline
						</button>
						<button
							onClick={() => onAccept(match.id)}
							className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
						>
							<CheckCircle className="h-4 w-4 mr-2" />
							Accept
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
