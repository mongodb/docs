const nextConfig = {
  // `versioning` is shipped as TypeScript, not built to JS, so Next
  // has to compile it like first-party code.
  transpilePackages: ['versioning'],
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
      // Canonical public paths for Next.js API routes under /docs/platform/api/*
      {
        source: '/docs/platform/api/:path*',
        destination: '/api/:path*',
      },
      {
        source: '/docs/:path*/manpages.tar.gz',
        destination: '/api/manpages/:path*/manpages.tar.gz',
      },
      {
        source: '/docs/sitemap-:n.xml',
        destination: '/api/sitemap/sitemap-:n.xml',
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

export default nextConfig;
