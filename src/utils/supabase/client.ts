import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      "❌ Supabase Client Error: Environment variables are missing. " +
      "Ensure they start with NEXT_PUBLIC_ in your .env.local file."
    )
  }

  return createBrowserClient(
    supabaseUrl!,
    supabaseAnonKey!
  )
}