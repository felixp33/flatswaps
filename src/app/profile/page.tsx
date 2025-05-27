// src/app/profile/page.tsx
import ProfileLayout from "@/components/profile/ProfileLayout";
import {
	Edit,
	MapPin,
	Calendar,
	Star,
	Shield,
	Home,
	MessageCircle,
	Heart,
	TrendingUp,
	Award,
	Users,
	Clock,
	Search,
} from "lucide-react";
import Link from "next/link";

export default function ProfileOverview() {
	// Mock user data - in real app, this would come from your auth/user context
	const user = {
		name: "John Doe",
		email: "john.doe@example.com",
		location: "New York, USA",
		memberSince: "March 2023",
		bio: "Travel enthusiast and home swap veteran. I love exploring new cultures and meeting people from around the world. My Manhattan loft is perfect for couples or small families looking to experience NYC like a local.",
		verified: true,
		responseRate: 95,
		rating: 4.9,
		reviewCount: 23,
		swapCount: 8,
		hostingSince: "2023",
	};

	const stats = [
		{ label: "Total Swaps", value: "8", icon: Home, color: "text-blue-600" },
		{ label: "Reviews", value: "23", icon: Star, color: "text-yellow-600" },
		{ label: "Response Rate", value: "95%", icon: MessageCircle, color: "text-green-600" },
		{ label: "Rating", value: "4.9", icon: Award, color: "text-purple-600" },
	];

	const recentActivity = [
		{
			type: "swap_completed",
			message: "Completed swap with Sarah in Barcelona",
			time: "2 days ago",
			icon: Home,
		},
		{
			type: "review_received",
			message: "Received 5-star review from Marco",
			time: "1 week ago",
			icon: Star,
		},
		{
			type: "new_match",
			message: "New match found in Paris",
			time: "2 weeks ago",
			icon: Heart,
		},
		{
			type: "search_created",
			message: "Created new search for London trip",
			time: "3 weeks ago",
			icon: Search,
		},
	];

	return (
		<ProfileLayout>
			<div className="p-6 space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Overview</h1>
						<p className="text-gray-600 dark:text-gray-300 mt-1">Manage your personal information and account</p>
					</div>
					<Link
						href="/profile/edit"
						className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						<Edit className="h-4 w-4 mr-2" />
						Edit Profile
					</Link>
				</div>

				{/* Profile Card */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
					<div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
						{/* Avatar */}
						<div className="relative">
							<div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
								{user.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</div>
							{user.verified && (
								<div className="absolute -bottom-1 -right-1 h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
									<Shield className="h-4 w-4 text-white" />
								</div>
							)}
						</div>

						{/* User Info */}
						<div className="flex-1">
							<div className="flex items-center space-x-3 mb-2">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
								{user.verified && (
									<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
										<Shield className="h-3 w-3 mr-1" />
										Verified
									</span>
								)}
							</div>

							<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
								<MapPin className="h-4 w-4 mr-1" />
								{user.location}
							</div>

							<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
								<Calendar className="h-4 w-4 mr-1" />
								Member since {user.memberSince}
							</div>

							<div className="flex items-center space-x-4">
								<div className="flex items-center">
									<Star className="h-4 w-4 text-yellow-400 mr-1" />
									<span className="text-sm font-medium text-gray-900 dark:text-white">
										{user.rating} ({user.reviewCount} reviews)
									</span>
								</div>
								<div className="text-sm text-gray-500 dark:text-gray-400">
									{user.responseRate}% response rate
								</div>
							</div>
						</div>
					</div>

					{/* Bio */}
					<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
						<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">About</h3>
						<p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{user.bio}</p>
					</div>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
					{stats.map((stat, index) => {
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

				{/* Quick Actions */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						<Link
							href="/profile/properties"
							className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
						>
							<Home className="h-5 w-5 text-blue-600 mr-3" />
							<div>
								<p className="text-sm font-medium text-gray-900 dark:text-white">My Properties</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">Manage listings</p>
							</div>
						</Link>

						<Link
							href="/profile/searches"
							className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
						>
							<Search className="h-5 w-5 text-orange-600 mr-3" />
							<div>
								<p className="text-sm font-medium text-gray-900 dark:text-white">My Searches</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">Find swap partners</p>
							</div>
						</Link>

						<Link
							href="/profile/messages"
							className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
						>
							<MessageCircle className="h-5 w-5 text-green-600 mr-3" />
							<div>
								<p className="text-sm font-medium text-gray-900 dark:text-white">Messages</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">3 unread</p>
							</div>
						</Link>

						<Link
							href="/profile/matches"
							className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
						>
							<Heart className="h-5 w-5 text-pink-600 mr-3" />
							<div>
								<p className="text-sm font-medium text-gray-900 dark:text-white">Matches</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">5 new matches</p>
							</div>
						</Link>
					</div>
				</div>

				{/* Recent Activity */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
					<div className="space-y-4">
						{recentActivity.map((activity, index) => {
							const Icon = activity.icon;
							return (
								<div key={index} className="flex items-start space-x-3">
									<div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
										<Icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
										<div className="flex items-center mt-1">
											<Clock className="h-3 w-3 text-gray-400 mr-1" />
											<p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</ProfileLayout>
	);
}
