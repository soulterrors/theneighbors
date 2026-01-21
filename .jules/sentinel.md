## 2024-05-22 - [Permissive Remote Patterns]
**Vulnerability:** Next.js `remotePatterns` configuration allows images from `**.supabase.co`.
**Learning:** Using wildcard subdomains for cloud storage providers allows any user to host malicious content on their own Supabase instance and have it rendered by this application's image optimizer.
**Prevention:** Restrict `remotePatterns` to the specific project ID subdomain (e.g., `xyz123.supabase.co`) instead of using wildcards.
