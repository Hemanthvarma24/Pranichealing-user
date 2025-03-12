import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/user',
  devIndicators: false,
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;
