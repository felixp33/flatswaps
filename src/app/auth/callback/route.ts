// src/app/auth/callback/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");
	const error = requestUrl.searchParams.get("error");
	const origin = requestUrl.origin;

	console.log("🔄 Callback route hit:", {
		url: requestUrl.toString(),
		hasCode: !!code,
		error: error,
		origin: origin,
	});

	if (error) {
		console.error("❌ OAuth error in callback:", error);
		return NextResponse.redirect(`${origin}/auth/signin?error=${error}`);
	}

	if (code) {
		const cookieStore = cookies();
		const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

		try {
			console.log("🔄 Exchanging code for session...");
			const { data, error } = await supabase.auth.exchangeCodeForSession(code);

			if (error) {
				console.error("❌ OAuth callback error:", error);
				return NextResponse.redirect(`${origin}/auth/signin?error=oauth_callback_error`);
			}

			console.log("✅ Session exchange successful:", {
				userId: data.user?.id,
				email: data.user?.email,
				provider: data.user?.app_metadata?.provider,
				onboardingCompleted: data.user?.user_metadata?.onboarding_completed,
			});

			// Check if this is a new user (just signed up)
			const user = data.user;
			const isNewUser = !user.user_metadata?.onboarding_completed;

			if (isNewUser) {
				console.log("🚀 New user - redirecting to onboarding");
				return NextResponse.redirect(`${origin}/auth/onboarding/step-1`);
			} else {
				console.log("🚀 Existing user - redirecting to profile");
				return NextResponse.redirect(`${origin}/profile`);
			}
		} catch (error) {
			console.error("💥 Unexpected error in OAuth callback:", error);
			return NextResponse.redirect(`${origin}/auth/signin?error=unexpected_error`);
		}
	}

	console.warn("⚠️ No code parameter provided");
	return NextResponse.redirect(`${origin}/auth/signin?error=no_code_provided`);
}
