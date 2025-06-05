// src/components/matches/MatchCard.tsx
import Link from "next/link";
import {
	Heart,
	MapPin,
	Star,
	MessageCircle,
	Eye,
	Users,
	Shield,
	Phone,
	Mail,
	Calendar,
	Clock,
	CheckCircle,
	XCircle,
} from "lucide-react";

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

	const getMatchScoreColor = (score: number) => {
		if (score >= 90) return "text-green-600";
		if (score >= 75) return "text-yellow-600";
		return "text-orange-600";
	};

	const getParticipantStatus = (participant: any) => {
		if (participant.id === "currentUser") return null;
		if (participant.hasAccepted === null) return "waiting";
		if (participant.hasAccepted === true) return "accepted";
		if (participant.hasAccepted === false) return "pending";
		return "unknown";
	};

	const canShowContactInfo = (match: any) => {
		return match.status === "accepted";
	};

	const canShowPersonalInfo = (match: any) => {
		return match.status === "accepted";
	};

	const statusInfo = getStatusInfo(match.status);
	const otherParticipants = match.participants.filter((p: any) => p.id !== "currentUser");

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
			{/* Match Header */}
			<div className="flex items-start justify-between mb-6">
				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-2">
						<span className={`px-3 py-1 text-sm font-medium rounded-full ${statusInfo.color}`}>
							{statusInfo.label}
						</span>
						{match.type === "multilateral" && (
							<span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
								<Users className="h-3 w-3 mr-1" />
								{match.participants.length} people
							</span>
						)}
					</div>
					<div className="flex items-center">
						<Heart className={`h-4 w-4 mr-1 ${getMatchScoreColor(match.matchScore)}`} />
						<span className={`text-sm font-medium ${getMatchScoreColor(match.matchScore)}`}>
							{match.matchScore}% match
						</span>
					</div>
				</div>
				<div className="text-right">
					<p className="text-sm text-gray-500 dark:text-gray-400">{match.createdAt}</p>
					<p className="text-xs text-gray-400 dark:text-gray-500">{statusInfo.description}</p>
				</div>
			</div>

			{/* Participants */}
			<div className="space-y-4 mb-6">
				{otherParticipants.map((participant: any, index: number) => {
					const participantStatus = getParticipantStatus(participant);

					return (
						<div key={participant.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
							{/* Show participant info only when accepted */}
							{canShowPersonalInfo(match) && (
								<div className="flex items-start justify-between mb-3">
									<div className="flex items-center space-x-3">
										<div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold relative">
											{participant.initials}
											{participantStatus === "accepted" && (
												<div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
													<CheckCircle className="h-3 w-3 text-white" />
												</div>
											)}
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
												{participant.name}
											</h3>
											<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
												<MapPin className="h-4 w-4 mr-1" />
												{participant.location}
											</div>
											<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
												<Star className="h-4 w-4 text-yellow-400 mr-1" />
												{participant.rating} ({participant.reviews} reviews)
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
											?
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
												Partner {index + 1}
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
											{participantStatus === "accepted" ? "Accepted" : "Waiting"}
										</span>
									)}
								</div>
							)}

							{/* Property Info - Always visible */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
									<h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
										{participant.property.title}
									</h4>
									<p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
										{participant.property.location}
									</p>
									<div className="flex items-center justify-between">
										<div className="flex items-center text-xs text-gray-600 dark:text-gray-300 space-x-3">
											<span>{participant.property.bedrooms} bed</span>
											<span>{participant.property.bathrooms} bath</span>
											<span>{participant.property.guests} guests</span>
										</div>
										<Link
											href={`/properties/${match.id}`}
											className="inline-flex items-center px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-xs font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500"
										>
											<Eye className="h-3 w-3 mr-1" />
											View
										</Link>
									</div>
								</div>
								<div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
									<h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">Swap Dates</h4>
									<div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
										<Calendar className="h-4 w-4 mr-2" />
										{participant.swapDates}
									</div>
								</div>
							</div>

							{/* Contact Information (only shown when match is accepted) */}
							{canShowContactInfo(match) && participant.contactInfo && (
								<div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
									<h4 className="font-medium text-green-900 dark:text-green-200 text-sm mb-2 flex items-center">
										<Shield className="h-4 w-4 mr-2" />
										Contact Information
									</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
										<div className="flex items-center text-sm text-green-800 dark:text-green-300">
											<Mail className="h-4 w-4 mr-2" />
											<a href={`mailto:${participant.contactInfo.email}`} className="hover:underline">
												{participant.contactInfo.email}
											</a>
										</div>
										<div className="flex items-center text-sm text-green-800 dark:text-green-300">
											<Phone className="h-4 w-4 mr-2" />
											<a href={`tel:${participant.contactInfo.phone}`} className="hover:underline">
												{participant.contactInfo.phone}
											</a>
										</div>
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* Information message for non-accepted matches */}
			{!canShowPersonalInfo(match) && (
				<div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
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
			<div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
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
							className="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium"
						>
							<XCircle className="h-4 w-4 mr-2" />
							Decline
						</button>
						<button
							onClick={() => onAccept(match.id)}
							className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
						>
							<CheckCircle className="h-4 w-4 mr-2" />
							Accept Match
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
