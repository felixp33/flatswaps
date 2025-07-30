// src/app/auth/callback/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");
	const origin = requestUrl.origin;

	if (code) {
		const cookieStore = cookies();
		const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

		try {
			const { data, error } = await supabase.auth.exchangeCodeForSession(code);

			if (error) {
				console.error("OAuth callback error:", error);
				return NextResponse.redirect(`${origin}/auth/signin?error=oauth_callback_error`);
			}

			// Check if this is a new user (just signed up)
			const user = data.user;
			const isNewUser = !user.user_metadata?.onboarding_completed;

			if (isNewUser) {
				// Redirect to onboarding for new OAuth users
				return NextResponse.redirect(`${origin}/auth/onboarding/step-1`);
			} else {
				// Existing user, go to profile
				return NextResponse.redirect(`${origin}/profile`);
			}
		} catch (error) {
			console.error("Unexpected error in OAuth callback:", error);
			return NextResponse.redirect(`${origin}/auth/signin?error=unexpected_error`);
		}
	}

	// No code parameter, redirect to home with error
	return NextResponse.redirect(`${origin}/auth/signin?error=no_code_provided`);
}
