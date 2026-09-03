import { ICONS_BASE_URL, INTERNAL_IMAGE_API_PATH, ONLINE_IMAGE_PREFIX } from '@/constants';
import { isDevMode } from '@/utils/isDevBuild';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

// Mirrors blob-path-remap.ts stripDocsPrefix (kept inline — that file uses fs, client-unsafe).
function stripDocsPrefix(prefix: string): string {
  if (prefix === 'docs') return '';
  if (prefix.startsWith('docs/')) return prefix.slice(5);
  return prefix;
}

/**
 * Content images are staged under their on-disk docset directory
 * (copy-images-to-next-static.ts keys them on the content-mdx-relative path),
 * which for most docsets is spelled the same as the stripped URL prefix. landing
 * and manual publish at prefix `docs`, so stripDocsPrefix() returns '' and the
 * docset directory drops out of the URL entirely — every `/images/...` icon 404s.
 * DOCS_PROJECT names the on-disk path this deploy was built from, so it recovers
 * that directory. Single-version deploys (landing) carry the whole path; a
 * multi-version deploy (`DOCS_PROJECT=manual`) has no per-page version segment
 * to give, so manual still needs the plumbed-through projectPath that <Image>
 * uses.
 */
function buildDocsetDir(): string {
  return process.env.NEXT_PUBLIC_BUILD_DOCS_PROJECT ?? '';
}

export const getSuitableIcon = ({
  icon,
  iconDark,
  isDarkMode,
  siteBasePrefix,
}: {
  icon?: string;
  iconDark?: string;
  isDarkMode?: boolean;
  siteBasePrefix: string;
}) => {
  if (typeof icon === 'string') {
    if (icon.startsWith('/')) {
      const selectedIcon = isDarkMode && iconDark ? iconDark : icon;
      const blobPrefix = stripDocsPrefix(siteBasePrefix) || buildDocsetDir();
      const imagePath = blobPrefix ? `${blobPrefix}${selectedIcon}` : selectedIcon.replace(/^\//, '');
      // Mirrors Image/index.tsx's formatImageUrl: dev/offline images are staged
      // under public/ (INTERNAL_IMAGE_API_PATH); online, they're staged under
      // _next/static/images (ONLINE_IMAGE_PREFIX) — the only location that
      // actually exists in a production build.
      const prefix = isDevMode || isOfflineBuild ? INTERNAL_IMAGE_API_PATH : ONLINE_IMAGE_PREFIX;
      return `${prefix}${imagePath}`;
    }

    const getIcon = `${icon}${isDarkMode ? '_inverse' : ''}`;
    // ICONS_BASE_URL already has trailing slash, so just concatenate
    return `${ICONS_BASE_URL}${getIcon}.svg`;
  }

  return '';
};
