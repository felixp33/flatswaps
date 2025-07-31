// src/components/BasicTest.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchProfile, addSampleData, fetchDashboardData } from "@/lib/api";

export function BasicTest() {
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>(null);

	const testProfile = async () => {
		if (!user) return;

		setLoading(true);
		try {
			const profile = await fetchProfile(user.id);
			setResult({ type: "profile", data: profile });
		} catch (error) {
			setResult({ type: "error", data: error });
		} finally {
			setLoading(false);
		}
	};

	const testAddSampleData = async () => {
		setLoading(true);
		try {
			const result = await addSampleData();
			setResult({ type: "sample", data: result });
		} catch (error) {
			setResult({ type: "error", data: error });
		} finally {
			setLoading(false);
		}
	};

	const testDashboard = async () => {
		setLoading(true);
		try {
			const dashboard = await fetchDashboardData();
			setResult({ type: "dashboard", data: dashboard });
		} catch (error) {
			setResult({ type: "error", data: error });
		} finally {
			setLoading(false);
		}
	};

	if (!user) {
		return (
			<div className="p-6 border rounded-lg bg-white dark:bg-gray-800">
				<p>Please log in to test the database connection.</p>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto space-y-6">
			{/* Test Buttons */}
			<div className="p-6 border rounded-lg bg-white dark:bg-gray-800">
				<h2 className="text-xl font-bold mb-4">Database Test</h2>

				<div className="flex flex-wrap gap-3 mb-6">
					<button
						onClick={testProfile}
						disabled={loading}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Test Profile
					</button>
					<button
						onClick={testAddSampleData}
						disabled={loading}
						className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Add Sample Data
					</button>
					<button
						onClick={testDashboard}
						disabled={loading}
						className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Test Dashboard
					</button>
				</div>

				{/* Current User Info */}
				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border">
					<h3 className="font-bold mb-2">Current User:</h3>
					<p className="text-sm">
						<strong>ID:</strong> {user.id}
					</p>
					<p className="text-sm">
						<strong>Email:</strong> {user.email}
					</p>
				</div>
			</div>

			{/* Loading State */}
			{loading && (
				<div className="p-6 border rounded-lg bg-white dark:bg-gray-800 text-center">
					<div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
					<span>Loading...</span>
				</div>
			)}

			{/* Results */}
			{result && (
				<div className="p-6 border rounded-lg bg-white dark:bg-gray-800">
					<h3 className="font-bold mb-4">Result ({result.type}):</h3>

					{result.type === "dashboard" && result.data && (
						<div className="space-y-4">
							{/* Summary */}
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
								<div className="p-4 bg-gray-50 dark:bg-gray-700 rounded text-center">
									<div className="text-2xl font-bold">{result.data.flats?.length || 0}</div>
									<div className="text-sm text-gray-600">Properties</div>
								</div>
								<div className="p-4 bg-gray-50 dark:bg-gray-700 rounded text-center">
									<div className="text-2xl font-bold">{result.data.searches?.length || 0}</div>
									<div className="text-sm text-gray-600">Searches</div>
								</div>
								<div className="p-4 bg-gray-50 dark:bg-gray-700 rounded text-center">
									<div className="text-2xl font-bold">{result.data.contracts?.length || 0}</div>
									<div className="text-sm text-gray-600">Contracts</div>
								</div>
								<div className="p-4 bg-gray-50 dark:bg-gray-700 rounded text-center">
									<div className="text-2xl font-bold">{result.data.profile ? "✓" : "✗"}</div>
									<div className="text-sm text-gray-600">Profile</div>
								</div>
							</div>

							{/* Profile Info */}
							{result.data.profile && (
								<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200">
									<h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">Profile Found:</h4>
									<p className="text-sm">
										Name: {result.data.profile.firstname} {result.data.profile.lastname}
									</p>
									<p className="text-sm">Location: {result.data.profile.location || "Not set"}</p>
								</div>
							)}

							{/* Flats */}
							{result.data.flats && result.data.flats.length > 0 && (
								<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200">
									<h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">
										Properties ({result.data.flats.length}):
									</h4>
									{result.data.flats.slice(0, 3).map((flat: any, index: number) => (
										<div key={index} className="text-sm mb-1">
											• {flat.title} - {flat.city} ({flat.rent_amount ? `€${flat.rent_amount}` : "No price"})
										</div>
									))}
								</div>
							)}

							{/* Error */}
							{result.data.error && (
								<div className="p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200">
									<h4 className="font-semibold mb-2 text-red-800 dark:text-red-200">Error:</h4>
									<p className="text-sm text-red-600">{result.data.error}</p>
								</div>
							)}
						</div>
					)}

					{/* Raw JSON for other results */}
					{result.type !== "dashboard" && (
						<div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
							<pre className="text-xs overflow-auto max-h-96">{JSON.stringify(result.data, null, 2)}</pre>
						</div>
					)}
				</div>
			)}

			{/* Instructions */}
			<div className="p-6 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
				<h3 className="font-bold mb-2 text-yellow-800 dark:text-yellow-200">Instructions:</h3>
				<ol className="text-sm space-y-1 text-yellow-700 dark:text-yellow-300">
					<li>1. First, click "Test Profile" to see if your profile exists</li>
					<li>2. If no profile, click "Add Sample Data" to create test data</li>
					<li>3. Click "Test Dashboard" to see all your data</li>
				</ol>
			</div>
		</div>
	);
}
