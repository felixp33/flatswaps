// src/app/profile/matches/page.tsx
import ProfileLayout from "@/components/profile/ProfileLayout";
import {
	Heart,
	MapPin,
	Star,
	MessageCircle,
	Eye,
	Filter,
	Search,
	Home,
	Clock,
	CheckCircle,
	XCircle,
} from "lucide-react";
import Link from "next/link";

export default function MatchesPage() {
	// Mock matches data
	const matches = [
		{
			id: "1",
			type: "mutual", // mutual, incoming, outgoing
			status: "pending", // pending, accepted, declined, expired
			user: {
				name: "Sarah Johnson",
				location: "Barcelona, Spain",
				rating: 4.8,
				reviews: 34,
				initials: "SJ",
			},
			property: {
				title: "Cozy Apartment Near Beach",
				location: "Barcelona, Spain",
				bedrooms: 2,
				bathrooms: 1,
				guests: 4,
			},
			swapDates: {
				requested: "Mar 15-25, 2024",
				offered: "Apr 10-20, 2024",
			},
			matchScore: 95,
			messagePreview: "Hi! I love your Manhattan loft and would love to arrange a swap...",
			lastActivity: "2 hours ago",
		},
		{
			id: "2",
			type: "incoming",
			status: "pending",
			user: {
				name: "Marco Rodriguez",
				location: "Rome, Italy",
				rating: 4.9,
				reviews: 67,
				initials: "MR",
			},
			property: {
				title: "Historic Villa in Trastevere",
				location: "Rome, Italy",
				bedrooms: 3,
				bathrooms: 2,
				guests: 6,
			},
			swapDates: {
				requested: "Jun 5-15, 2024",
				offered: "N/A",
			},
			matchScore: 87,
			messagePreview: "Your property would be perfect for our summer vacation...",
			lastActivity: "1 day ago",
		},
		{
			id: "3",
			type: "outgoing",
			status: "accepted",
			user: {
				name: "Emma Wilson",
				location: "London, UK",
				rating: 4.7,
				reviews: 28,
				initials: "EW",
			},
			property: {
				title: "Modern Flat in Shoreditch",
				location: "London, UK",
				bedrooms: 1,
				bathrooms: 1,
				guests: 2,
			},
			swapDates: {
				requested: "Feb 20-28, 2024",
				offered: "Feb 20-28, 2024",
			},
			matchScore: 92,
			messagePreview: "Confirmed! Looking forward to the swap. Here are the details...",
			lastActivity: "3 days ago",
		},
	];

	const getMatchTypeLabel = (type: string) => {
		switch (type) {
			case "mutual":
				return "Mutual Interest";
			case "incoming":
				return "Incoming Request";
			case "outgoing":
				return "Your Request";
			default:
				return "";
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "accepted":
				return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300";
			case "declined":
				return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300";
			case "expired":
				return "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300";
			default:
				return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300";
		}
	};

	const getMatchScoreColor = (score: number) => {
		if (score >= 90) return "text-green-600";
		if (score >= 75) return "text-yellow-600";
		return "text-orange-600";
	};

	return (
		<ProfileLayout>
			<div className="p-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Matches & Swaps</h1>
					</div>
					<div className="flex gap-3 mt-4 sm:mt-0">
						<button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
							<Filter className="h-4 w-4 mr-2" />
							Filter
						</button>
						<Link
							href="/find-swap"
							className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
						>
							<Search className="h-4 w-4 mr-2" />
							Find New Matches
						</Link>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
					{[
						{ label: "Active Matches", value: "12", icon: Heart, color: "text-pink-600" },
						{ label: "Pending Requests", value: "5", icon: Clock, color: "text-yellow-600" },
						{ label: "Confirmed Swaps", value: "3", icon: CheckCircle, color: "text-green-600" },
						{ label: "Total Swaps", value: "8", icon: Home, color: "text-blue-600" },
					].map((stat, index) => {
						const Icon = stat.icon;
						return (
							<div
								key={index}
								className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
							>
								<div className="flex items-center">
									<Icon className={`h-6 w-6 ${stat.color} mr-3`} />
									<div>
										<p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Matches List */}
				<div className="space-y-4">
					{matches.map((match) => (
						<div
							key={match.id}
							className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
						>
							<div className="flex flex-col lg:flex-row lg:items-center justify-between">
								<div className="flex-1">
									{/* Match Header */}
									<div className="flex items-start justify-between mb-4">
										<div className="flex items-center space-x-3">
											<div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
												{match.user.initials}
											</div>
											<div>
												<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
													{match.user.name}
												</h3>
												<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
													<MapPin className="h-4 w-4 mr-1" />
													{match.user.location}
												</div>
												<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
													<Star className="h-4 w-4 text-yellow-400 mr-1" />
													{match.user.rating} ({match.user.reviews} reviews)
												</div>
											</div>
										</div>
										<div className="flex flex-col items-end space-y-2">
											<span
												className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
													match.status
												)}`}
											>
												{match.status.charAt(0).toUpperCase() + match.status.slice(1)}
											</span>
											<span className="text-xs text-gray-500 dark:text-gray-400">
												{getMatchTypeLabel(match.type)}
											</span>
										</div>
									</div>

									{/* Property Info */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
										<div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
											<h4 className="font-medium text-gray-900 dark:text-white text-sm">Their Property</h4>
											<p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{match.property.title}</p>
											<div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
												<span>{match.property.bedrooms} bed</span>
												<span className="mx-2">•</span>
												<span>{match.property.bathrooms} bath</span>
												<span className="mx-2">•</span>
												<span>{match.property.guests} guests</span>
											</div>
										</div>
										<div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
											<h4 className="font-medium text-gray-900 dark:text-white text-sm">Swap Dates</h4>
											<p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
												Requested: {match.swapDates.requested}
											</p>
											{match.swapDates.offered !== "N/A" && (
												<p className="text-sm text-gray-600 dark:text-gray-300">
													Offered: {match.swapDates.offered}
												</p>
											)}
										</div>
									</div>

									{/* Match Score & Message Preview */}
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center space-x-4">
											<div className="flex items-center">
												<Heart className={`h-4 w-4 mr-1 ${getMatchScoreColor(match.matchScore)}`} />
												<span className={`text-sm font-medium ${getMatchScoreColor(match.matchScore)}`}>
													{match.matchScore}% match
												</span>
											</div>
											<span className="text-xs text-gray-500 dark:text-gray-400">
												Last activity: {match.lastActivity}
											</span>
										</div>
									</div>

									{/* Message Preview */}
									<div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
										<p className="text-sm text-gray-700 dark:text-gray-300 italic">
											&ldquo;{match.messagePreview}&rdquo;
										</p>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex flex-col lg:flex-col space-y-2 lg:ml-4 mt-4 lg:mt-0">
									<Link
										href={`/profile/messages/${match.id}`}
										className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
									>
										<MessageCircle className="h-4 w-4 mr-2" />
										Message
									</Link>
									<Link
										href={`/properties/${match.id}`}
										className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
									>
										<Eye className="h-4 w-4 mr-2" />
										View Property
									</Link>
									{match.status === "pending" && match.type === "incoming" && (
										<div className="flex space-x-2">
											<button className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
												<CheckCircle className="h-4 w-4 mr-1" />
												Accept
											</button>
											<button className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
												<XCircle className="h-4 w-4 mr-1" />
												Decline
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Empty State */}
				{matches.length === 0 && (
					<div className="text-center py-12">
						<div className="mx-auto h-24 w-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
							<Heart className="h-8 w-8 text-gray-400" />
						</div>
						<h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">No matches yet</h3>
						<p className="text-gray-500 dark:text-gray-400 mt-2">
							Start exploring properties to find your perfect swap partners.
						</p>
						<Link
							href="/find-swap"
							className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
						>
							<Search className="h-4 w-4 mr-2" />
							Find Matches
						</Link>
					</div>
				)}
			</div>
		</ProfileLayout>
	);
}
