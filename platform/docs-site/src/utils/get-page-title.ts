import type { TextNode } from '@/types/ast';
import { formatText } from './format-text';

/*
 * Given slug and a property's slug-title mapping, look up the title for a given page.
 * Returns array of text nodes with formatting or a plaintext string.
 */
export const getPageTitle = (slug: string, slugTitleMapping?: Record<string, string | [TextNode]>) => {
  const slugLookup = slug === '/' ? 'index' : slug;
  const title = slugTitleMapping?.[slugLookup];
  return title ? formatText(title as string) : null;
};
