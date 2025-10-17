import { assertTrailingSlash } from './assert-trailing-slash';
import { generateVersionedPrefix } from './generate-versioned-prefix';
import { localizePath } from './locale';

export const getUrl = (branchUrlSlug: string | undefined, project: string, siteBasePrefix: string, slug?: string) => {
  if (branchUrlSlug === 'legacy') {
    // Avoid trailing slash to ensure query param remains valid
    return localizePath(`/docs/legacy/?site=${project}`);
  }
  const prefixWithVersion = generateVersionedPrefix(siteBasePrefix, branchUrlSlug);
  return assertTrailingSlash(localizePath(`${prefixWithVersion}/${slug}`));
};
