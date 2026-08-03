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

// Force redirects always fire (page-existence-independent); other redirects are
// checked in page.tsx as a 404 fallback (Netlify's default force=false). Their
// *-redirects.json sources/destinations are absolute cross-docset `/docs/...`
// paths, so opt each out of basePath prefixing (else Next doubles it to
// `/docs/<prefix>/docs/...`).
const forceRedirects = allRedirects
  .filter((r) => r.force === true)
  .map(({ force, ...rest }) => ({ ...rest, basePath: false }));

// Per-project basePath = `/<rawPrefix>` from dir-name-to-prefix.json (which
// already includes a leading `docs/`; landing/manual → `docs`; unset DOCS_PROJECT
// → `/docs`). basePath makes Next serve pages and _next assets under the docset
// prefix b2k already routes on — no asset-prefix, no strip. Must match
// src/utils/base-path.ts. Also emit the full prefix list for sameProjectHref's
// longest-prefix match (nested/empty-prefix docsets defeat startsWith).
function getBuildBasePathEnv() {
  const docsProject = process.env.DOCS_PROJECT;
  if (!docsProject) return { basePath: '/docs', prefixes: [] };

  const mapPath = join(__dirname, 'src/generated/dir-name-to-prefix.json');
  const dirNameToPrefix = requireFile(mapPath);
  const rawPrefix = dirNameToPrefix[docsProject.split('/')[0]];
  if (!rawPrefix) {
    throw new Error(`DOCS_PROJECT "${docsProject}" has no entry in dir-name-to-prefix.json`);
  }
  const prefixes = [...new Set(Object.values(dirNameToPrefix).map((p) => `/${p}`))].sort(
    (a, b) => b.length - a.length,
  );
  return { basePath: `/${rawPrefix}`, prefixes };
}

const { basePath: BASE_PATH, prefixes: DOCS_PREFIXES } = getBuildBasePathEnv();

const nextConfig = {
  pageExtensions: ['mdx', 'tsx', 'ts'],
  trailingSlash: true,
  basePath: BASE_PATH,
  // Expose to server + client for manual prefixing where Next doesn't auto-apply
  // basePath (raw <img> src, client fetches). See src/utils/base-path.ts.
  env: {
    NEXT_PUBLIC_DOCS_BASE_PATH: BASE_PATH,
    NEXT_PUBLIC_DOCS_PREFIXES: JSON.stringify(DOCS_PREFIXES),
  },
  compiler: {
    emotion: true,
  },
  experimental: {
    optimizePackageImports: ['@leafygreen-ui/emotion'],
  },
  async redirects() {
    return forceRedirects;
  },
  async rewrites() {
    return [
      // Serve the Markdown export of a page. The route is prerendered at build
      // time (see src/app/api/markdown/[...path]/route.ts). basePath prefixes
      // the source, so `/:path*.md` becomes `/docs/<prefix>/:path*.md`.
      {
        source: '/:path*.md',
        destination: '/api/markdown/:path*',
      },
    ];
  },
  images: {
    // The /_next/image optimizer 500s on this deploy (sharp isn't bundled into
    // the SSG-extension function), so we don't use it: unoptimized makes
    // next/image emit a plain <img>. Content images are served as static files
    // under <basePath>/_next/static/images (see the <Image> component and
    // scripts/copy-images-to-next-static.ts). Also clears the Icon/error-page
    // next/image 500s.
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
