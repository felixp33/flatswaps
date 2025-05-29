"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { User, SignUpData, AuthContextType } from "@/types/auth";

// Create the Auth Context
const AuthContextObject = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		checkAuthState();
	}, []);

	const checkAuthState = async () => {
		try {
			if (typeof window !== "undefined") {
				const token = localStorage.getItem("auth_token");
				if (token) {
					await new Promise((resolve) => setTimeout(resolve, 500));
					// setUser(mockUser);
				}
			}
		} catch (error) {
			console.error("Auth check failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const signIn = async (email: string, password: string): Promise<void> => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			if (!response.ok) throw new Error("Sign in failed");

			const { user, token } = await response.json();
			if (typeof window !== "undefined") {
				localStorage.setItem("auth_token", token);
			}
			setUser(user);
		} catch (error) {
			console.error("Sign in error:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const signUp = async (data: SignUpData): Promise<void> => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!response.ok) throw new Error("Sign up failed");

			const { user, token } = await response.json();
			if (typeof window !== "undefined") {
				localStorage.setItem("auth_token", token);
			}
			setUser(user);
		} catch (error) {
			console.error("Sign up error:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const signOut = async (): Promise<void> => {
		try {
			await fetch("/api/auth/signout", { method: "POST" });
			if (typeof window !== "undefined") {
				localStorage.removeItem("auth_token");
			}
			setUser(null);
		} catch (error) {
			console.error("Sign out error:", error);
			if (typeof window !== "undefined") {
				localStorage.removeItem("auth_token");
			}
			setUser(null);
		}
	};

	const updateProfile = async (data: Partial<User>): Promise<void> => {
		if (!user) throw new Error("No authenticated user");

		try {
			const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
			const response = await fetch("/api/auth/profile", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) throw new Error("Profile update failed");

			const updatedUser = await response.json();
			setUser(updatedUser);
		} catch (error) {
			console.error("Profile update error:", error);
			throw error;
		}
	};

	const sendVerificationEmail = async (): Promise<void> => {
		if (!user) throw new Error("No authenticated user");

		try {
			const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
			await fetch("/api/auth/send-verification", {
				method: "POST",
				headers: { Authorization: `Bearer ${token}` },
			});
		} catch (error) {
			console.error("Send verification email error:", error);
			throw error;
		}
	};

	const verifyEmail = async (code: string): Promise<void> => {
		if (!user) throw new Error("No authenticated user");

		try {
			const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
			const response = await fetch("/api/auth/verify-email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ code }),
			});
			if (!response.ok) throw new Error("Email verification failed");

			const updatedUser = await response.json();
			setUser(updatedUser);
		} catch (error) {
			console.error("Email verification error:", error);
			throw error;
		}
	};

	const sendPhoneVerification = async (phoneNumber: string): Promise<void> => {
		if (!user) throw new Error("No authenticated user");

		try {
			const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
			await fetch("/api/auth/send-phone-verification", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ phoneNumber }),
			});
		} catch (error) {
			console.error("Send phone verification error:", error);
			throw error;
		}
	};

	const verifyPhone = async (code: string): Promise<void> => {
		if (!user) throw new Error("No authenticated user");

		try {
			const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
			const response = await fetch("/api/auth/verify-phone", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ code }),
			});
			if (!response.ok) throw new Error("Phone verification failed");

			const updatedUser = await response.json();
			setUser(updatedUser);
		} catch (error) {
			console.error("Phone verification error:", error);
			throw error;
		}
	};

	const value: AuthContextType = {
		user,
		isLoading,
		isAuthenticated: !!user,
		signIn,
		signUp,
		signOut,
		updateProfile,
		sendVerificationEmail,
		verifyEmail,
		sendPhoneVerification,
		verifyPhone,
	};

	return <AuthContextObject.Provider value={value}>{children}</AuthContextObject.Provider>;
}

// Custom hook to use the Auth Context
export function useAuth(): AuthContextType {
	const context = useContext(AuthContextObject);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

// Export the context for advanced usage if needed
export { AuthContextObject as AuthContext };
