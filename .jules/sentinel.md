## 2024-05-22 - [Permissive Remote Patterns]
**Vulnerability:** Next.js `remotePatterns` configuration allows images from `**.supabase.co`.
**Learning:** Using wildcard subdomains for cloud storage providers allows any user to host malicious content on their own Supabase instance and have it rendered by this application's image optimizer.
**Prevention:** Restrict `remotePatterns` to the specific project ID subdomain (e.g., `xyz123.supabase.co`) instead of using wildcards.

## 2026-01-23 - [Dynamic Remote Patterns]
**Vulnerability:** Wildcard subdomains in Next.js image config allow unauthorized external content.
**Learning:** Next.js config files are standard Node.js modules that can read `process.env`. We can dynamically build the `remotePatterns` array based on environment variables to restrict access to only the specific project domain, rather than hardcoding a wildcard.
**Prevention:** Use `process.env.NEXT_PUBLIC_SUPABASE_URL` (or similar) to extract the specific hostname for `remotePatterns`.

## 2026-01-25 - [Dynamic CSP Configuration]
**Vulnerability:** Static CSP headers fail to account for environment-specific domains like Supabase project URLs, leading to either overly permissive policies (wildcards) or broken functionality in different environments.
**Learning:** Next.js `next.config.ts` allows dynamic header generation. We can use `process.env` to inject the specific Supabase hostname into the CSP at runtime, ensuring strict security without breaking valid integrations.
**Prevention:** Construct CSP headers dynamically in `next.config.ts` using environment variables for external services.

## 2026-03-05 - [Middleware Resilience]
**Vulnerability:** Missing environment variables or Supabase service outage caused the entire application to crash with a 500 error due to unhandled exceptions in middleware.
**Learning:** Middleware runs on every request. Asserting non-null environment variables (`!`) or failing to catch network errors in middleware creates a single point of failure that can take down the whole site.
**Prevention:** Always check for existence of critical environment variables in middleware and wrap external service calls (like auth) in `try/catch` blocks to ensure "fail-open" or "fail-secure" behavior without crashing.
