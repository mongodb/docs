import { createRequire } from 'module';

const requireFile = createRequire(import.meta.url);
const atlasRedirects = requireFile('./src/redirects/atlas-redirects.json');
const appServicesRedirects = requireFile('./src/redirects/app-services-redirects.json');
const atlasArchitectureRedirects = requireFile('./src/redirects/atlas-architecture-redirects.json');
const atlasCliRedirects = requireFile('./src/redirects/atlas-cli-redirects.json');
const atlasGovernmentRedirects = requireFile('./src/redirects/atlas-government-redirects.json');
const atlasOperatorRedirects = requireFile('./src/redirects/atlas-operator-redirects.json');
const realmRedirects = requireFile('./src/redirects/realm-redirects.json');
const nodeRedirects = requireFile('./src/redirects/node-redirects.json');

// Only redirects with explicit force: true go here. These always fire regardless
// of whether a page exists at the source path. All other redirects are checked in
// page.tsx as a fallback when the page would otherwise 404, replicating Netlify's
// default force=false behavior.
const allRedirects = [...atlasRedirects, ...appServicesRedirects, ...atlasArchitectureRedirects, ...atlasCliRedirects, ...atlasGovernmentRedirects, ...atlasOperatorRedirects, ...realmRedirects, ...nodeRedirects];
const forceRedirects = allRedirects
  .filter((r) => r.force === true)
  .map(({ force, ...rest }) => rest);

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
  async redirects() {
    return forceRedirects;
  },
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
        source: '/docs/:path*.md',
        destination: '/api/markdown/:path*',
      },
      {
        source: '/docs/:path*/objects.inv',
        destination: '/api/inventory/:path*/objects.inv',
      },
      // Canonical public paths for Next.js API routes under /docs/platform/api/*
      {
        source: '/docs/platform/api/:path*',
        destination: '/api/:path*',
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

const staticExportConfig = {
  output: 'export',
  trailingSlash: true,
  // Only files with extension .offline.tsx / .offline.ts are built for static export.
  // See: https://github.com/vercel/next.js/discussions/51891#discussioncomment-6297178
  pageExtensions: ['offline.tsx', 'offline.ts'],
  compiler: {
    emotion: true,
  },
  experimental: {
    optimizePackageImports: ['@leafygreen-ui/emotion'],
  },
  images: {
    unoptimized: true,
  },
};

export default process.env.BUILD_STATIC_PAGES === 'true' ? staticExportConfig : nextConfig;
