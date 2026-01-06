import contentstack from '@contentstack/delivery-sdk';
import envConfig from '@/utils/env-config';
import { normalizeDate } from '../utils/to-date';
import { generateProductUpdatesSlug } from '@/app/products/updates/utils/generate-product-updates-slug';
import type { FilterOptions } from '../consts/filters';

export interface ProductUpdateEntry {
  uid: string;
  title: string;
  created_at: string; // "2025-09-17T14:01:31.391Z"
  description: string; // Rich text field as HTML string
  is_featured: boolean;
  tags: string[];
  tags_category?: string[];
  tags_offerings?: string[];
  tags_product?: string[];
  link_with_label?: LinkWithLabelItem[];
  beamer_created_at?: string | null; // "2025-09-17"
}

export interface LinkWithLabelItem {
  link: {
    title: string;
    href: string;
  };
  label: string;
}

const stack = contentstack.stack({
  apiKey: envConfig.CONTENTSTACK_API_KEY,
  deliveryToken: envConfig.CONTENTSTACK_DELIVERY_TOKEN,
  environment: envConfig.CONTENTSTACK_ENVIRONMENT,
});

let cachedEntries: ProductUpdateEntry[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

let cachedFilterOptions: FilterOptions | null = null;
let lastFilterFetchTime: number = 0;
const FILTER_CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day

export async function getProductUpdates(): Promise<ProductUpdateEntry[]> {
  const now = Date.now();

  // Return cached data if it's still fresh
  if (cachedEntries && now - lastFetchTime < CACHE_DURATION) {
    return cachedEntries;
  }

  try {
    const result = await stack.contentType('product_update').entry().query().limit(1000).find();
    const entries = (result.entries || []) as ProductUpdateEntry[];

    // Sort entries by creation date (most recent first)
    // Prioritize beamer_created_at if available, otherwise use created_at
    const sortedEntries = entries.sort((a, b) => {
      // We need to normalize the beamer_created_at date since that is a string date and not an actual Date type
      // and in some cases the output can result in a day behind
      const dateA = a.beamer_created_at ? normalizeDate(a.beamer_created_at) : new Date(a.created_at);
      const dateB = b.beamer_created_at ? normalizeDate(b.beamer_created_at) : new Date(b.created_at);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });

    // Cache the results
    cachedEntries = sortedEntries;
    lastFetchTime = now;

    return sortedEntries;
  } catch (error) {
    console.error('Error fetching product updates:', error);
    throw error;
  }
}

export async function getProductUpdateBySlug(slug: string): Promise<ProductUpdateEntry | null> {
  const entries = await getProductUpdates();

  return (
    entries.find((entry: ProductUpdateEntry) => {
      const entrySlug = generateProductUpdatesSlug(entry.title);
      return entrySlug === slug;
    }) || null
  );
}

export async function getFilterOptions(): Promise<FilterOptions> {
  const now = Date.now();

  // Return cached data if it's still fresh
  if (cachedFilterOptions && now - lastFilterFetchTime < FILTER_CACHE_DURATION) {
    return cachedFilterOptions;
  }

  try {
    // Fetch all product updates to extract used filter values
    const allEntries = await getProductUpdates();

    // Helper function to extract all unique values used in entries for a field
    const getUsedValuesFromEntries = (fieldName: 'tags_category' | 'tags_offerings' | 'tags_product'): string[] => {
      const usedValues = new Set<string>();
      allEntries.forEach((entry) => {
        const fieldValues = entry[fieldName] || [];
        fieldValues.forEach((value) => {
          if (value) {
            usedValues.add(value);
          }
        });
      });
      return Array.from(usedValues).sort();
    };

    // Map entry field names to filter categories
    const fieldMapping: Record<keyof FilterOptions, 'tags_category' | 'tags_offerings' | 'tags_product'> = {
      offering: 'tags_offerings',
      category: 'tags_category',
      product: 'tags_product',
    };

    // Build filter options from actual used values in entries
    const filterOptions = Object.entries(fieldMapping).reduce((acc, [category, entryField]) => {
      acc[category as keyof FilterOptions] = getUsedValuesFromEntries(entryField);
      return acc;
    }, {} as FilterOptions);

    // Cache the results
    cachedFilterOptions = filterOptions;
    lastFilterFetchTime = now;

    return filterOptions;
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
}
