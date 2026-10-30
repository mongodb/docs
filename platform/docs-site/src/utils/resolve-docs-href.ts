import { isRelativeUrl } from '@/utils/is-relative-url';
import { assertLeadingAndTrailingSlash } from '@/utils/assert-leading-and-trailing-slash';
import { isOfflineBuild } from '@/utils/isOfflineBuild';
import { getBasePath, sameProjectHref } from '@/utils/base-path';

export type ResolvedDocsHref = {
  href: string;
  /** Set only for same-deploy links. basePath-relative, for next/link or router.push, which re-add basePath. */
  clientHref: string | null;
};

function addOfflineIndexHtml(url: string): string {
  const hashIdx = url.indexOf('#');
  const rawPath = hashIdx === -1 ? url : url.slice(0, hashIdx);
  const hash = hashIdx === -1 ? '' : url.slice(hashIdx).replace(/\/$/, '');
  // Strip a trailing slash before checking so a path that already ends in
  // index.html (e.g. links pre-processed by useProcessedUnifiedToc, then given a
  // trailing slash by assertLeadingAndTrailingSlash) doesn't get a second one.
  const path = rawPath.replace(/\/$/, '');
  if (path.endsWith('/index.html')) return path + hash;
  return path + '/index.html' + hash;
}

// A full-path link to a section on the current page would reload the route,
// dropping the query string (e.g. composable `?deployment-type=...`) and skipping
// `hashchange`. A bare `#hash` keeps the query and fires hashchange, so in-page
// selectors (composable tutorials, tabs) can react.
function stripSamePageHash(to: string, pathname: string | null): string {
  if (!pathname || isOfflineBuild) return to;
  const hashIdx = to.indexOf('#');
  if (hashIdx <= 0) return to;
  // usePathname() is basePath-relative but `to` is a full `/docs/<prefix>/...` path.
  const fullPathname = `${getBasePath()}${pathname}`;
  return to.slice(0, hashIdx).replace(/\/+$/, '') === fullPathname.replace(/\/+$/, '') ? to.slice(hashIdx) : to;
}

/** `pathname` is the current `usePathname()` value. */
export function resolveDocsHref(to: string, pathname: string | null): ResolvedDocsHref {
  const target = stripSamePageHash(to, pathname);
  if (!target || !isRelativeUrl(target) || target.startsWith('#')) return { href: target, clientHref: null };

  const href = assertLeadingAndTrailingSlash(target);
  if (isOfflineBuild) return { href: addOfflineIndexHtml(href), clientHref: null };
  return { href, clientHref: sameProjectHref(href) };
}
