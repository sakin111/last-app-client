import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Compiler for better performance optimization
  reactCompiler: true,
  
  // Image optimization for Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "res.cloudinary.com",
      }
    ],
    // Enable image optimization
    formats: ['image/avif', 'image/webp'],
  },
  
  // Turbopack configuration for faster builds
  turbopack: {},
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
