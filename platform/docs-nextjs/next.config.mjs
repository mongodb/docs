// import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  trailingSlash: true,
  compiler: {
    emotion: true,
  },
  experimental: {
    optimizePackageImports: ['@leafygreen-ui/emotion'],
  },
};

export default nextConfig;
