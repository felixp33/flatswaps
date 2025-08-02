// src/app/api/delete-account/route.ts

// OLD IMPORTS (remove these)
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// NEW IMPORTS
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
	const cookieStore = await cookies();

	// OLD WAY (replace this)
	// const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

	// NEW WAY
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				set(name: string, value: string, options: any) {
					cookieStore.set({ name, value, ...options });
				},
				remove(name: string, options: any) {
					cookieStore.set({ name, value: "", ...options });
				},
			},
		}
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

	const { error } = await admin.auth.admin.deleteUser(user.id);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	await supabase.auth.signOut();

	return NextResponse.json({ success: true });
}
