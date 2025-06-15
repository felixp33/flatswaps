// src/components/messages/ContractTemplate.tsx
"use client";

import React, { useState } from "react";
import { X, Download, FileText } from "lucide-react";

interface ContractFormData {
	tenant1Name: string;
	tenant1Email: string;
	tenant2Name: string;
	tenant2Email: string;
	property1Address: string;
	property1Rent: string;
	property2Address: string;
	property2Rent: string;
	startDate: string;
	duration: string;
}

interface ContractTemplateProps {
	isOpen: boolean;
	onClose: () => void;
	userName: string;
	userEmail?: string;
}

const ContractTemplate: React.FC<ContractTemplateProps> = ({ isOpen, onClose, userName, userEmail = "" }) => {
	const [formData, setFormData] = useState<ContractFormData>({
		tenant1Name: "",
		tenant1Email: "",
		tenant2Name: userName,
		tenant2Email: userEmail,
		property1Address: "",
		property1Rent: "",
		property2Address: "",
		property2Rent: "",
		startDate: "",
		duration: "6 months",
	});

	const handleInputChange = (field: keyof ContractFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const generateContract = (): string => {
		const currentDate = new Date().toLocaleDateString();

		return `FLAT SWAP AGREEMENT

Date: ${currentDate}

TENANT A:
Name: ${formData.tenant1Name}
Email: ${formData.tenant1Email}
Property: ${formData.property1Address}
Monthly Rent: €${formData.property1Rent}

TENANT B:
Name: ${formData.tenant2Name}
Email: ${formData.tenant2Email}
Property: ${formData.property2Address}
Monthly Rent: €${formData.property2Rent}

SWAP DETAILS:
Start Date: ${formData.startDate}
Duration: ${formData.duration}

TERMS:
1. Each tenant pays the rent of the property they occupy
2. Properties must be returned in original condition
3. Both parties responsible for utilities during their stay
4. 30-day notice required for early termination

SIGNATURES:
Tenant A: _________________ Date: _______
Tenant B: _________________ Date: _______

Generated via FlatSwaps - ${currentDate}`;
	};

	const downloadContract = () => {
		const contract = generateContract();
		const blob = new Blob([contract], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `flat-swap-contract-${new Date().toISOString().split("T")[0]}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
							<h2 className="text-xl font-bold text-gray-900 dark:text-white">Contract Template</h2>
						</div>
						<button
							onClick={onClose}
							className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
				</div>

				{/* Form */}
				<div className="p-6 space-y-6">
					{/* Tenant Information */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-3">
							<h3 className="font-semibold text-gray-900 dark:text-white">Tenant A</h3>
							<input
								type="text"
								placeholder="Full Name"
								value={formData.tenant1Name}
								onChange={(e) => handleInputChange("tenant1Name", e.target.value)}
								className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
							/>
							<input
								type="email"
								placeholder="Email"
								value={formData.tenant1Email}
								onChange={(e) => handleInputChange("tenant1Email", e.target.value)}
								className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
							/>
							<input
								type="text"
								placeholder="Property Address"
								value={formData.property1Address}
								onChange={(e) => handleInputChange("property1Address", e.target.value)}
								className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
							/>
							<input
								type="number"
								placeholder="Monthly Rent (€)"
								value={formData.property1Rent}
								onChange={(e) => handleInputChange("property1Rent", e.target.value)}
								className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
							/>
						</div>

						<div className="space-y-3">
							<h3 className="font-semibold text-gray-900 dark:text-white">Tenant B</h3>
							<input
								type="text"
								placeholder="Full Name"
								value={formData.tenant2Name}
								onChange={(e) => handleInputChange("tenant2Name", e.target.value)}
								className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
							/>
							<input
								type="email"
								placeholder="Email"
								value={formData.tenant2Email}
								onChange={(e) => handleInputChange("tenant2Email", e.target.value)}
								className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
							/>
							<input
								type="text"
								placeholder="Property Address"
								value={formData.property2Address}
								onChange={(e) => handleInputChange("property2Address", e.target.value)}
								className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
							/>
							<input
								type="number"
								placeholder="Monthly Rent (€)"
								value={formData.property2Rent}
								onChange={(e) => handleInputChange("property2Rent", e.target.value)}
								className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
							/>
						</div>
					</div>

					{/* Swap Details */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Start Date
							</label>
							<input
								type="date"
								value={formData.startDate}
								onChange={(e) => handleInputChange("startDate", e.target.value)}
								className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</label>
							<select
								value={formData.duration}
								onChange={(e) => handleInputChange("duration", e.target.value)}
								className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
							>
								<option value="1 month">1 month</option>
								<option value="3 months">3 months</option>
								<option value="6 months">6 months</option>
								<option value="12 months">12 months</option>
							</select>
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
					<button
						onClick={onClose}
						className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
					>
						Cancel
					</button>
					<button
						onClick={downloadContract}
						className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
					>
						<Download className="h-4 w-4 mr-2" />
						Download Contract
					</button>
				</div>
			</div>
		</div>
	);
};

export default ContractTemplate;
