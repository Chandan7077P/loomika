import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'cdn.jsdelivr.net'], // ✅ both supported
  },
}

export default nextConfig
