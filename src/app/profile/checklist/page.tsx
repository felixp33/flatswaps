// src/app/profile/checklist/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { ExpandedChecklist } from "@/components/dashboard";

export default function ChecklistPage() {
	// In a real app, this state would be managed globally (context/Redux/Zustand)
	// and persisted to your backend/Supabase
	const [completedItems, setCompletedItems] = useState(new Set<string>());

	const handleToggleItem = (itemId: string) => {
		const newCompleted = new Set(completedItems);
		if (newCompleted.has(itemId)) {
			newCompleted.delete(itemId);
		} else {
			newCompleted.add(itemId);
		}
		setCompletedItems(newCompleted);

		// In real app, persist to backend:
		// await updateChecklistProgress(userId, Array.from(newCompleted));
	};

	return (
		<ProfileLayout>
			<div className="p-6">
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

				{/* Checklist Component */}
				<ExpandedChecklist completedItems={completedItems} onToggleItem={handleToggleItem} />
			</div>
		</ProfileLayout>
	);
}
