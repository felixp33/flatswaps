import React from "react";

interface CardSkeletonProps {
  height?: string;
}

export default function CardSkeleton({ height = "h-32" }: CardSkeletonProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className={`w-full ${height} bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}></div>
    </div>
  );
}
