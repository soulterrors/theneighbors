import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const updateSession = async (request: NextRequest) => {
  // 🛡️ Sentinel: Fail securely if credentials are missing
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Sentinel Warning: Missing Supabase environment variables. Session management disabled.');
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }

  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      },
    );

    await supabase.auth.getUser();
  } catch (error) {
    // 🛡️ Sentinel: Catch auth errors to prevent 500 crashes
    console.error('⚠️ Sentinel Error: Failed to refresh Supabase session', error);
  }

  return supabaseResponse;
};
