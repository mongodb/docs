import type { useRouter } from 'next/navigation';
import { isRelativeUrl } from '@/utils/is-relative-url';
import { sameProjectHref } from '@/utils/base-path';

/**
 * Programmatic counterpart to the Link component, for click handlers that
 * navigate to a full `/docs/...` path (or an external URL).
 *
 * Same-deploy links route client-side: sameProjectHref strips this deploy's
 * basePath and next/router re-adds it. Handing router.push the full path instead
 * doubles the basePath (`/docs/docs/development`). Cross-deploy and external
 * links use window.location so Next never prepends the basePath — b2k routes the
 * full path.
 */
export const navigateToDocsPath = (router: ReturnType<typeof useRouter>, url: string) => {
  const clientHref = isRelativeUrl(url) ? sameProjectHref(url) : null;
  if (clientHref) {
    router.push(clientHref);
    return;
  }
  window.location.assign(url);
};
