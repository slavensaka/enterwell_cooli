// API endpoint
export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/v1/';

// CDN base URL - auto-detect Vercel URL if not explicitly set
export const CDN_BASE_URL =
  process.env.NEXT_PUBLIC_CDN_BASE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000');
