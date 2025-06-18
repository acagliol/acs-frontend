import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignores ESLint errors during AWS Amplify builds
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignores TypeScript errors during production builds
  },
  // Add React strict mode for better error detection
  reactStrictMode: true,
  // Ensure proper transpilation
  transpilePackages: ['@splinetool/react-spline'],
  // Optimize for production
  swcMinify: true,
  // Add experimental features for better React 18 support
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material', 'lucide-react'],
  },
};

export default nextConfig;