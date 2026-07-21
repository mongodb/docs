import { readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const requireFile = createRequire(import.meta.url);

// Auto-discovers all *-redirects.json files — no manual import needed when adding a new product.
const redirectsDir = join(__dirname, 'src/redirects');
const allRedirects = readdirSync(redirectsDir)
  // Skip the generated aggregate to avoid double-counting entries.
  .filter((f) => f.endsWith('-redirects.json') && f !== 'all-redirects.json')
  .flatMap((f) => requireFile(join(redirectsDir, f)));

// Only redirects with explicit force: true go here. These always fire regardless
// of whether a page exists at the source path. All other redirects are checked in
// page.tsx as a fallback when the page would otherwise 404, replicating Netlify's
// default force=false behavior.
const forceRedirects = allRedirects
  .filter((r) => r.force === true)
  .map(({ force, ...rest }) => rest);

// When a zone is built standalone (DOCS_PROJECT set), nest its _next assets
// under its own docset prefix so multiple independently-deployed zones never
// collide on the same shared asset bucket. Page routing is untouched — pages
// still route through the existing /docs/[[...path]] catch-all exactly as in
// the monolith build, so there's no basePath/static-param interaction to
// account for. Unset for the monolith build, which keeps using the shared
// /docs/docs_static_nextjs bucket.
//
// assetPrefix only rewrites the URLs emitted in HTML; the built files still
// live at the root (/_next/*). The b2k proxy strips the prefix ahead of
// /_next/ when forwarding, so the deploy serves the asset from its root — see
// pathRewrite in b2k's create-proxy-middleware-options.ts.
function getZoneAssetPrefix() {
  const docsProject = process.env.DOCS_PROJECT;
  if (!docsProject) return undefined;

  const mapPath = join(__dirname, 'src/generated/dir-name-to-prefix.json');
  const dirNameToPrefix = requireFile(mapPath);
  const rawPrefix = dirNameToPrefix[docsProject];
  if (!rawPrefix) {
    throw new Error(`DOCS_PROJECT "${docsProject}" has no entry in dir-name-to-prefix.json`);
  }
  return `/${rawPrefix}/docs_static_nextjs`;
}

const ZONE_ASSET_PREFIX = getZoneAssetPrefix();

const nextConfig = {
  pageExtensions: ['mdx', 'tsx', 'ts'],
  trailingSlash: true,
  compiler: {
    emotion: true,
  },
  experimental: {
    optimizePackageImports: ['@leafygreen-ui/emotion'],
  },
  assetPrefix: ZONE_ASSET_PREFIX,
  async redirects() {
    return forceRedirects;
  },
  async rewrites() {
    return [];
  },
  images: {
    // The /_next/image optimizer 500s on this deploy (sharp isn't bundled into
    // the SSG-extension function), so we don't use it: unoptimized makes
    // next/image emit a plain <img>. Content images are served as static files
    // under _next/static/images (see the <Image> component and
    // scripts/copy-images-to-next-static.ts), riding the existing
    // /docs/docs_static_nextjs/_next/* rewrite + b2k strip — out of the /docs/*
    // soft-redirect page path. Also clears the Icon/error-page next/image 500s.
    unoptimized: true,
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
