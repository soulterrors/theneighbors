## 2024-05-22 - [Permissive Remote Patterns]
**Vulnerability:** Next.js `remotePatterns` configuration allows images from `**.supabase.co`.
**Learning:** Using wildcard subdomains for cloud storage providers allows any user to host malicious content on their own Supabase instance and have it rendered by this application's image optimizer.
**Prevention:** Restrict `remotePatterns` to the specific project ID subdomain (e.g., `xyz123.supabase.co`) instead of using wildcards.

## 2026-01-23 - [Dynamic Remote Patterns]
**Vulnerability:** Wildcard subdomains in Next.js image config allow unauthorized external content.
**Learning:** Next.js config files are standard Node.js modules that can read `process.env`. We can dynamically build the `remotePatterns` array based on environment variables to restrict access to only the specific project domain, rather than hardcoding a wildcard.
**Prevention:** Use `process.env.NEXT_PUBLIC_SUPABASE_URL` (or similar) to extract the specific hostname for `remotePatterns`.
