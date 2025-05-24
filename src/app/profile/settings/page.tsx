// src/app/profile/settings/page.tsx
import ProfileLayout from "@/components/profile/ProfileLayout";
import { Bell, Shield, Eye, Globe, Trash2 } from "lucide-react";

export default function ProfileSettings() {
	return (
		<ProfileLayout>
			<div className="p-6 space-y-6">
				{/* Header */}
				<div>
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
					<p className="text-gray-600 dark:text-gray-300 mt-1">Manage your account preferences and privacy</p>
				</div>

				{/* Notification Settings */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="p-6">
						<div className="flex items-center mb-4">
							<Bell className="h-5 w-5 text-gray-400 mr-3" />
							<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
						</div>
						<div className="space-y-4">
							{[
								{ label: "Email notifications for new messages", checked: true },
								{ label: "Email notifications for booking confirmations", checked: true },
								{ label: "Email notifications for swap requests", checked: true },
								{ label: "Marketing emails and promotions", checked: false },
								{ label: "Push notifications on mobile", checked: true },
							].map((setting, index) => (
								<div key={index} className="flex items-center justify-between">
									<span className="text-sm text-gray-900 dark:text-white">{setting.label}</span>
									<label className="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" className="sr-only peer" defaultChecked={setting.checked} />
										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
									</label>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Privacy Settings */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="p-6">
						<div className="flex items-center mb-4">
							<Eye className="h-5 w-5 text-gray-400 mr-3" />
							<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy</h2>
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<span className="text-sm font-medium text-gray-900 dark:text-white">Profile visibility</span>
									<p className="text-xs text-gray-500 dark:text-gray-400">Who can see your profile</p>
								</div>
								<select className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
									<option>Everyone</option>
									<option>Members only</option>
									<option>Private</option>
								</select>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<span className="text-sm font-medium text-gray-900 dark:text-white">Show last active</span>
									<p className="text-xs text-gray-500 dark:text-gray-400">Display when you were last online</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input type="checkbox" className="sr-only peer" defaultChecked />
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
								</label>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<span className="text-sm font-medium text-gray-900 dark:text-white">
										Show contact info to verified members
									</span>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										Share email and phone with verified users
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input type="checkbox" className="sr-only peer" defaultChecked />
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
								</label>
							</div>
						</div>
					</div>
				</div>

				{/* Account Settings */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="p-6">
						<div className="flex items-center mb-4">
							<Shield className="h-5 w-5 text-gray-400 mr-3" />
							<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account</h2>
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<span className="text-sm font-medium text-gray-900 dark:text-white">Change password</span>
									<p className="text-xs text-gray-500 dark:text-gray-400">Update your account password</p>
								</div>
								<button className="text-sm text-blue-600 hover:text-blue-500 font-medium">Change</button>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<span className="text-sm font-medium text-gray-900 dark:text-white">
										Two-factor authentication
									</span>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										Add extra security to your account
									</p>
								</div>
								<button className="text-sm text-blue-600 hover:text-blue-500 font-medium">Enable</button>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<span className="text-sm font-medium text-gray-900 dark:text-white">Download your data</span>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										Get a copy of your account information
									</p>
								</div>
								<button className="text-sm text-blue-600 hover:text-blue-500 font-medium">Download</button>
							</div>
						</div>
					</div>
				</div>

				{/* Language & Region */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="p-6">
						<div className="flex items-center mb-4">
							<Globe className="h-5 w-5 text-gray-400 mr-3" />
							<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Language & Region</h2>
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-gray-900 dark:text-white">Language</span>
								<select className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
									<option>English</option>
									<option>Español</option>
									<option>Français</option>
									<option>Deutsch</option>
								</select>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-gray-900 dark:text-white">Currency</span>
								<select className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
									<option>USD ($)</option>
									<option>EUR (€)</option>
									<option>GBP (£)</option>
									<option>JPY (¥)</option>
								</select>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-gray-900 dark:text-white">Timezone</span>
								<select className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
									<option>Eastern Time (ET)</option>
									<option>Central Time (CT)</option>
									<option>Mountain Time (MT)</option>
									<option>Pacific Time (PT)</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				{/* Danger Zone */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-800">
					<div className="p-6">
						<div className="flex items-center mb-4">
							<Trash2 className="h-5 w-5 text-red-500 mr-3" />
							<h2 className="text-lg font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<span className="text-sm font-medium text-gray-900 dark:text-white">Deactivate account</span>
									<p className="text-xs text-gray-500 dark:text-gray-400">Temporarily disable your account</p>
								</div>
								<button className="text-sm text-red-600 hover:text-red-500 font-medium">Deactivate</button>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<span className="text-sm font-medium text-gray-900 dark:text-white">Delete account</span>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										Permanently delete your account and data
									</p>
								</div>
								<button className="text-sm text-red-600 hover:text-red-500 font-medium">Delete</button>
							</div>
						</div>
					</div>
				</div>

				{/* Save Button */}
				<div className="flex justify-end">
					<button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
						Save Changes
					</button>
				</div>
			</div>
		</ProfileLayout>
	);
}
