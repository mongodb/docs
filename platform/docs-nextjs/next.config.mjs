import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

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
  async rewrites() {
    return [
      {
        source: '/products/updates/webhook/contentstack',
        destination: '/api/products/updates/webhook/contentstack',
      },
      {
        source: '/products/updates/rss',
        destination: '/api/products/updates/rss',
      },
      {
        source: '/mdx/:path*.md',
        destination: '/api/markdown/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.mongodb.com',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'mongodbcom-cdn.staging.corp.mongodb.com',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'webimages.mongodb.com',
        port: '',
        pathname: '/_com_assets/icons/**',
        search: '',
      },
    ],
  },
};

export default withPWA(nextConfig);
