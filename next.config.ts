import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseHostname = '';

if (supabaseUrl) {
  try {
    const url = new URL(supabaseUrl);
    supabaseHostname = url.hostname;
  } catch (error) {
    console.warn('⚠️ Sentinel Warning: Invalid NEXT_PUBLIC_SUPABASE_URL', error);
  }
} else {
  console.warn('⚠️ Sentinel Warning: NEXT_PUBLIC_SUPABASE_URL is missing. Images from Supabase may not load.');
}

const remotePatterns = [
  {
    protocol: 'https' as const,
    hostname: 'images.unsplash.com',
    port: '',
    pathname: '/**',
  },
];

if (supabaseHostname) {
  remotePatterns.push({
    protocol: 'https' as const,
    hostname: supabaseHostname,
    port: '',
    pathname: '/**',
  });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: remotePatterns,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
