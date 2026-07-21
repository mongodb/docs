import type { BreadcrumbType } from '@/types/data';
import { StructuredData } from './structured-data';

export interface BreadcrumbListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

export class BreadcrumbListSd extends StructuredData {
  itemListElement: BreadcrumbListItem[];

  constructor({ breadcrumbs }: { breadcrumbs: BreadcrumbType[] }) {
    super('BreadcrumbList');
    this.itemListElement = this.getBreadcrumbList(breadcrumbs);
  }

  /**
   * @param {object[]} breadcrumbs
   */

  getBreadcrumbList(breadcrumbs: BreadcrumbType[]): BreadcrumbListItem[] {
    return breadcrumbs.map(({ path, title }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: title,
      item: path,
    }));
  }
}
