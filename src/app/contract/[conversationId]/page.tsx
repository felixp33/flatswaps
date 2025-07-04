// src/app/contract/[conversationId]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import ContractWizard from "@/components/contract/ContractWizard";
import { ContractFormData } from "@/types/contract";
import { getConversationData } from "@/lib/contract/contractData";

const ContractPage: React.FC = () => {
        const params = useParams();
        const searchParams = useSearchParams();
        const conversationId = params.conversationId as string;
        const from = searchParams.get("from");

	const [formData, setFormData] = useState<ContractFormData>({
		tenant1Name: "",
		tenant1Email: "",
		tenant1Phone: "",
		tenant2Name: "",
		tenant2Email: "",
		tenant2Phone: "",
		property1Address: "",
		property1Rent: "",
		property1Description: "",
		property2Address: "",
		property2Rent: "",
		property2Description: "",
		startDate: "",
		endDate: "",
		duration: "6 months",
		specialTerms: "",
	});

	// Pre-populate form data when page loads
	useEffect(() => {
		if (conversationId) {
			const { currentUser, otherUser } = getConversationData(conversationId);

			setFormData((prev) => ({
				...prev,
				// Current user as Tenant A
				tenant1Name: currentUser?.name || "",
				tenant1Email: currentUser?.email || "",
				property1Address: currentUser?.property?.location || "",
				property1Rent: currentUser?.property?.rent?.toString() || "",
				property1Description:
					currentUser?.property?.description ||
					(currentUser?.property
						? `${currentUser.property.bedrooms} bedroom, ${currentUser.property.bathrooms} bathroom apartment - ${currentUser.property.title}`
						: ""),

				// Other user as Tenant B
				tenant2Name: otherUser?.name || "",
				tenant2Email: otherUser?.email || "",
				property2Address: otherUser?.property?.location || otherUser?.location || "",
				property2Rent: otherUser?.property?.rent?.toString() || "",
				property2Description:
					otherUser?.property?.description ||
					(otherUser?.property
						? `${otherUser.property.bedrooms} bedroom, ${otherUser.property.bathrooms} bathroom apartment - ${otherUser.property.title}`
						: ""),
			}));
		}
	}, [conversationId]);

	const handleFormDataChange = (field: keyof ContractFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<>
			<Header />
			<main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="mb-8">
                                                <div className="flex items-center mb-4">
                                                        <Link
                                                                href={from === "profile" ? "/profile" : "/profile/messages"}
                                                                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mr-4"
                                                        >
                                                                <ArrowLeft className="h-4 w-4 mr-1" />
                                                                {from === "profile" ? "Back to Dashboard" : "Back to Messages"}
                                                        </Link>
                                                </div>
						<div className="text-center">
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Flat Swap Contract</h1>
							<p className="text-lg text-gray-600 dark:text-gray-400">
								Create a legally binding agreement for your flat swap
							</p>
						</div>
					</div>

					{/* Contract Wizard */}
					<ContractWizard formData={formData} onFormDataChange={handleFormDataChange} />
				</div>
			</main>
			<Footer />
		</>
	);
};

export default ContractPage;
