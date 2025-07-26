// src/components/profile/VisibilityPremiumBanner.tsx
"use client";

import { useState } from "react";
import { Crown, X, Eye, Zap, TrendingUp, Star } from "lucide-react";

interface VisibilityPremiumBannerProps {
	onClose?: () => void;
	onUpgrade?: () => void;
}

export default function VisibilityPremiumBanner({ onClose, onUpgrade }: VisibilityPremiumBannerProps) {
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) return null;

	const handleClose = () => {
		setIsVisible(false);
		onClose?.();
	};

	const handleUpgrade = () => {
		onUpgrade?.();
		// In a real app, this would redirect to upgrade flow or open a modal
		console.log("Opening upgrade flow...");
	};

	return (
		<div className="relative bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6 mb-6">
			<div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
				{/* Icon and main content */}
				<div className="flex items-start space-x-4 flex-1">
					<div className="flex-shrink-0">
						<div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
							<Crown className="h-6 w-6 text-white" />
						</div>
					</div>

					<div className="flex-1">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
							Get Priority Access to New Matches
						</h3>
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							Be the <span className="font-semibold text-orange-600 dark:text-orange-400">first to know</span>{" "}
							when a new listing matches your search criteria. Priority users get notified before everyone else.
						</p>

						{/* Benefits list */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
							<div className="flex items-center space-x-2">
								<Eye className="h-4 w-4 text-orange-500" />
								<span className="text-sm text-gray-700 dark:text-gray-300">Early match notifications</span>
							</div>
							<div className="flex items-center space-x-2">
								<Zap className="h-4 w-4 text-orange-500" />
								<span className="text-sm text-gray-700 dark:text-gray-300">First access to listings</span>
							</div>
							<div className="flex items-center space-x-2">
								<TrendingUp className="h-4 w-4 text-orange-500" />
								<span className="text-sm text-gray-700 dark:text-gray-300">Higher match success rate</span>
							</div>
						</div>
					</div>
				</div>

				{/* Action section */}
				<div className="flex flex-col items-end space-y-3">
					<div className="text-right">
						<div className="text-2xl font-bold text-gray-900 dark:text-white">€4.99</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">One-time payment</div>
					</div>

					<button
						onClick={handleUpgrade}
						className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
					>
						<Star className="h-4 w-4 mr-2" />
						Upgrade Now
					</button>
				</div>
			</div>
		</div>
	);
}
