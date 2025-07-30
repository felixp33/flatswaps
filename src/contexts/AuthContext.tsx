// contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface AuthContextType {
	user: User | null;
	session: Session | null;
	loading: boolean;
	signUp: (email: string, password: string) => Promise<{ error?: any }>;
	signIn: (email: string, password: string) => Promise<{ error?: any }>;
	signOut: () => Promise<void>;
	signInWithProvider: (provider: "google") => Promise<{ error?: any }>;
	resetPassword: (email: string) => Promise<{ error?: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		// Get initial session
		const getInitialSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);
			setUser(session?.user ?? null);
			setLoading(false);
		};

		getInitialSession();

		// Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
			setLoading(false);

			// Redirect based on auth state
			if (event === "SIGNED_IN") {
				// Check if user is coming from OAuth and needs onboarding
				const user = session?.user;
				const isOAuthUser = user?.app_metadata?.provider === "google";

				if (isOAuthUser && !user?.user_metadata?.onboarding_completed) {
					// Redirect to onboarding for new OAuth users
					router.push("/auth/onboarding/step-1");
				} else {
					// Regular users or completed onboarding go to profile
					router.push("/profile");
				}
			} else if (event === "SIGNED_OUT") {
				router.push("/");
			}
		});

		return () => subscription.unsubscribe();
	}, [router]);

	const signUp = async (email: string, password: string) => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			});

			if (error) {
				return { error };
			}

			return { data };
		} catch (error) {
			return { error };
		}
	};

	const signIn = async (email: string, password: string) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				return { error };
			}

			return { data };
		} catch (error) {
			return { error };
		}
	};

	const signInWithProvider = async (provider: "google") => {
		try {
			const { error, data } = await supabase.auth.signInWithOAuth({
				provider,
				options: {
					redirectTo: `${window.location.origin}/auth/callback`,
					queryParams: {
						access_type: "offline",
						prompt: "consent",
					},
				},
			});

			if (error) {
				return { error };
			}

			return { data };
		} catch (error) {
			return { error };
		}
	};

	const signOut = async () => {
		await supabase.auth.signOut();
	};

	const resetPassword = async (email: string) => {
		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/auth/reset-password`,
			});

			if (error) {
				return { error };
			}

			return { error: null };
		} catch (error) {
			return { error };
		}
	};

	const value = {
		user,
		session,
		loading,
		signUp,
		signIn,
		signInWithProvider,
		signOut,
		resetPassword,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
