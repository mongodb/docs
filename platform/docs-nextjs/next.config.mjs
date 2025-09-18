// import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig = {
  pageExtensions: ['mdx', 'tsx', 'ts'],
  trailingSlash: true,
  compiler: {
    emotion: true,
  },
  experimental: {
    optimizePackageImports: ['@leafygreen-ui/emotion'],
  },
  assetPrefix: '/docs/docs_static_nextjs',
};

const withMDX = createMDX({
  /* MDX plugins/config here */
});

export default withMDX(nextConfig);
