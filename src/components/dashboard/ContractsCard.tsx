// src/components/dashboard/ContractsCard.tsx

import Link from "next/link";
import { FileText, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";

interface Contract {
	id: string;
	title: string;
	otherParty: string;
	status: "draft" | "pending" | "signed" | "active" | "completed" | "cancelled";
	createdDate: string;
	startDate?: string;
	endDate?: string;
	conversationId?: string;
}

interface ContractsCardProps {
	contracts?: Contract[];
}

export default function ContractsCard({ contracts = [] }: ContractsCardProps) {
	const getStatusConfig = (status: Contract["status"]) => {
		const configs = {
			draft: {
				label: "Draft",
				color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
				icon: FileText,
			},
			pending: {
				label: "Pending Signature",
				color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
				icon: Clock,
			},
			signed: {
				label: "Signed",
				color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
				icon: CheckCircle,
			},
			active: {
				label: "Active",
				color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
				icon: CheckCircle,
			},
			completed: {
				label: "Completed",
				color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
				icon: CheckCircle,
			},
			cancelled: {
				label: "Cancelled",
				color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
				icon: AlertCircle,
			},
		};
		return configs[status];
	};

	// Find active contracts
	const activeContracts = contracts.filter((contract) => contract.status === "active");

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
			<div className="p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
						<FileText className="h-5 w-5 mr-2" />
						Active Contract
					</h2>
					{contracts.length > 0 && (
						<Link
							href="/profile/contracts"
							className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
						>
							View All ({contracts.length})
						</Link>
					)}
				</div>

				{/* Show active contract or no active contract message */}
				{activeContracts.length > 0 ? (
					<div className="space-y-3">
						{activeContracts.slice(0, 1).map((contract) => {
							const statusConfig = getStatusConfig(contract.status);
							const StatusIcon = statusConfig.icon;

							return (
								<Link
									key={contract.id}
									href={
										contract.conversationId
											? `/contract/${contract.conversationId}?from=profile`
											: `/profile/contracts/${contract.id}`
									}
									className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
								>
									<div className="flex items-center justify-between">
										<div className="flex-1">
											<div className="flex items-center justify-between mb-2">
												<h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
													{contract.title}
												</h4>
												<span
													className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
												>
													<StatusIcon className="h-3 w-3 mr-1" />
													{statusConfig.label}
												</span>
											</div>
											<p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
												with {contract.otherParty}
											</p>
											<div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
												<span>Created {contract.createdDate}</span>
												{contract.startDate && (
													<>
														<span>•</span>
														<span>Started {contract.startDate}</span>
													</>
												)}
												{contract.endDate && (
													<>
														<span>•</span>
														<span>Ends {contract.endDate}</span>
													</>
												)}
											</div>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				) : (
					/* No Active Contract State */
					<div className="text-center py-8">
						<FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">No active contract</h3>
						<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
							{contracts.length > 0
								? "You have contracts but none are currently active"
								: "Start matching with other users to create swap contracts"}
						</p>
						<div className="flex justify-center space-x-3">
							{contracts.length > 0 ? (
								<Link
									href="/profile/contracts"
									className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
								>
									View All Contracts
								</Link>
							) : (
								<>
									<Link
										href="/profile/matches"
										className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
									>
										Browse Matches
									</Link>
									<Link
										href="/search"
										className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
									>
										<Plus className="h-4 w-4 mr-2" />
										Start Search
									</Link>
								</>
							)}
						</div>
					</div>
				)}

				{/* Quick Actions - only show if there are active contracts */}
				{activeContracts.length > 0 && (
					<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
						<div className="flex space-x-2">
							<Link
								href="/profile/contracts"
								className="flex-1 text-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
							>
								View All Contracts
							</Link>
							<Link
								href="/profile/matches"
								className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
							>
								Create New Contract
							</Link>
						</div>
					</div>
				)}

				{/* Contract Stats - only show if there are contracts */}
				{contracts.length > 0 && (
					<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
						<div className="grid grid-cols-3 gap-4 text-center">
							<div>
								<p className="text-lg font-semibold text-gray-900 dark:text-white">
									{contracts.filter((c) => c.status === "active").length}
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
							</div>
							<div>
								<p className="text-lg font-semibold text-gray-900 dark:text-white">
									{contracts.filter((c) => c.status === "pending").length}
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
							</div>
							<div>
								<p className="text-lg font-semibold text-gray-900 dark:text-white">
									{contracts.filter((c) => c.status === "completed").length}
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
