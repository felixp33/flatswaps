"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { mockContracts, ContractSummary } from "@/lib/data/mockContracts";

export default function ContractsPage() {
  const getStatusConfig = (status: ContractSummary["status"]) => {
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
    } as const;
    return configs[status];
  };

  return (
    <ProfileLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/profile"
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Contracts</h1>

        <div className="space-y-3">
          {mockContracts.map((contract) => {
            const status = getStatusConfig(contract.status);
            const StatusIcon = status.icon;
            const href = contract.conversationId
              ? `/contract/${contract.conversationId}?from=profile`
              : `/profile/contracts/${contract.id}`;
            return (
              <Link
                key={contract.id}
                href={href}
                className="block"
              >
                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {contract.title}
                        </h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                        with {contract.otherParty}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
                        <span>Created {contract.createdDate}</span>
                        {contract.startDate && (
                          <>
                            <span>•</span>
                            <span>Starts {contract.startDate}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </ProfileLayout>
  );
}
