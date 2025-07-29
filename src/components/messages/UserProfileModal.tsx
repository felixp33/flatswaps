// src/components/messages/UserProfileModal.tsx
import { X, MapPin } from "lucide-react";
import { UserProfile } from "@/types/messages";

interface UserProfileModalProps {
	user: UserProfile;
	onClose: () => void;
}

export default function UserProfileModal({ user, onClose }: UserProfileModalProps) {
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
							<X className="h-5 w-5" />
						</button>
					</div>
				</div>

				{/* Profile Content */}
				<div className="p-6 space-y-6">
					{/* User Info */}
					<div className="flex items-start space-x-4">
						<div className="relative">
							<div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
								{user.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</div>
							{user.online && (
								<div className="absolute bottom-0 right-0 h-5 w-5 bg-green-400 border-2 border-white rounded-full"></div>
							)}
						</div>
						<div className="flex-1">
							<div className="flex items-center space-x-2 mb-2">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
								{user.verified && (
									<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
										Verified
									</span>
								)}
							</div>
							<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
								<MapPin className="h-4 w-4 mr-1" />
								{user.location}
							</div>
                                                        <div className="flex items-center space-x-4 text-sm">
                                                                <div className="text-gray-500 dark:text-gray-400">{user.responseRate}% response rate</div>
                                                        </div>
						</div>
					</div>

					{/* Bio */}
					<div>
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">About</h4>
						<p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{user.bio}</p>
					</div>

					{/* Languages */}
					<div>
						<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Languages</h4>
						<div className="flex flex-wrap gap-2">
							{user.languages.map((language, index) => (
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
							{user.properties.map((property) => (
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
                                                                               {/* Rating removed until review system is implemented */}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}
