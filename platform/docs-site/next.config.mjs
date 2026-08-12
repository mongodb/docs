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
//
// Inactive/EOL manual (v4.4/v5.0/v6.0) deploys on a separate Netlify site from
// active manual. Set NEXT_PUBLIC_INACTIVE_MANUAL=true on that site so its asset
// bucket does not collide with active's docs_static_manual path in b2k.
function isInactiveManualBuild() {
  return process.env.NEXT_PUBLIC_INACTIVE_MANUAL === 'true';
}

function getBuildBasePathEnv() {
  const docsProject = process.env.DOCS_PROJECT;
  if (!docsProject) return { basePath: '/docs', prefixes: [], assetBucketSuffix: '' };

  const mapPath = join(__dirname, 'src/generated/dir-name-to-prefix.json');
  const dirNameToPrefix = requireFile(mapPath);
  const dirName = docsProject.split('/')[0];
  const rawPrefix = dirNameToPrefix[dirName];
  if (!rawPrefix) {
    throw new Error(`DOCS_PROJECT "${docsProject}" has no entry in dir-name-to-prefix.json`);
  }
  const prefixes = [...new Set(Object.values(dirNameToPrefix).map((p) => `/${p}`))].sort(
    (a, b) => b.length - a.length,
  );

  // manual and landing both resolve to the empty prefix ("docs") and would
  // otherwise be indistinguishable to b2k's asset routing. landing is the
  // permanent fallback and keeps plain `_next`; manual gets a distinguishing
  // bucket (routed in b2k via MANUAL_SLUGS, separate repo). Inactive manual
  // uses a second bucket so its chunks don't collide with active manual.
  // Fail loudly if a third empty-prefix project shows up unhandled.
  let assetBucketSuffix = '';
  if (rawPrefix === 'docs') {
    switch (dirName) {
      case 'landing':
        assetBucketSuffix = '';
        break;
      case 'manual':
        assetBucketSuffix = isInactiveManualBuild()
          ? '/docs_static_manual_inactive'
          : '/docs_static_manual';
        break;
      default:
        throw new Error(
          `DOCS_PROJECT "${docsProject}" resolves to the empty prefix ("docs") but is neither ` +
            `"manual" nor "landing" — it needs its own asset bucket suffix to avoid colliding ` +
            `with landing's _next assets in b2k.`,
        );
    }
  }

  return { basePath: `/${rawPrefix}`, prefixes, assetBucketSuffix };
}

const {
  basePath: BASE_PATH,
  prefixes: DOCS_PREFIXES,
  assetBucketSuffix: ASSET_BUCKET_SUFFIX,
} = getBuildBasePathEnv();

const nextConfig = {
  pageExtensions: ['mdx', 'tsx', 'ts'],
  trailingSlash: true,
  basePath: BASE_PATH,
  // Next won't auto-combine assetPrefix with basePath once assetPrefix is set
  // explicitly, so write the full path. Empty suffix (everything but manual)
  // makes this a no-op: assetPrefix === basePath, Next's default.
  assetPrefix: `${BASE_PATH}${ASSET_BUCKET_SUFFIX}`,
  // Expose to server + client for manual prefixing where Next doesn't auto-apply
  // basePath/assetPrefix (raw <img> src, client fetches). See src/utils/base-path.ts.
  env: {
    NEXT_PUBLIC_DOCS_BASE_PATH: BASE_PATH,
    NEXT_PUBLIC_DOCS_PREFIXES: JSON.stringify(DOCS_PREFIXES),
    // Keep getAssetBucketSuffix() in lockstep with assetPrefix for this build
    // (active vs inactive manual, or empty for every other project).
    NEXT_PUBLIC_DOCS_ASSET_BUCKET_SUFFIX: ASSET_BUCKET_SUFFIX,
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
      // Resolve manual's bucketed asset path back to the real _next location.
      // Basepath-relative, like the rewrite above.
      ...(ASSET_BUCKET_SUFFIX
        ? [
            {
              source: `${ASSET_BUCKET_SUFFIX}/_next/:path*`,
              destination: '/_next/:path*',
            },
          ]
        : []),
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
