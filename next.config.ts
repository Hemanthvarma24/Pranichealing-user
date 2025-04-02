import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/user',
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;
