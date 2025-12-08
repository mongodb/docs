import { assertLeadingSlash } from '@/utils/assert-leading-slash';
import { removeTrailingSlash } from '@/utils/remove-trailing-slash';
import type { TocItem, BreadCrumb } from '@/components/unified-sidenav/types';

// Goes through toc.toml and builds parent breadcrumb data for each entry
export function createParentFromToc(tree: TocItem[] | undefined, breadcrumbs: BreadCrumb[]): TocItem[] | undefined {
  return tree?.map((item) => {
    const newCrumbs = [...breadcrumbs];

    if (item.newUrl) {
      const newBreadCrumb: BreadCrumb = {
        path: assertLeadingSlash(removeTrailingSlash(item.newUrl)),
        title: item.label,
      };
      newCrumbs.push(newBreadCrumb);
    }

    const items = createParentFromToc(item.items, newCrumbs);

    return {
      ...item,
      items,
      breadcrumbs: newCrumbs,
    };
  });
}

// Finds breadcrumb through slug
export function findParentBreadCrumb(slug: string, tocTree: TocItem[]): BreadCrumb[] | undefined {
  for (const item of tocTree) {
    if (
      item.newUrl &&
      assertLeadingSlash(removeTrailingSlash(item.newUrl)) === assertLeadingSlash(removeTrailingSlash(slug))
    ) {
      return item.breadcrumbs?.slice(0, -1); // Removes last item which is the current item
    }

    if (item.items) {
      const found = findParentBreadCrumb(slug, item.items);
      if (found) return found;
    }
  }

  return undefined;
}
