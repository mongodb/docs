import contentstack from '@contentstack/delivery-sdk';
import envConfig from '@/utils/env-config';
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
  published_date: string; // "2025-09-17T14:01:31.391Z"
}

export interface LinkWithLabelItem {
  link: {
    title: string;
    href: string;
  };
  label: string;
}

const CONTENT_TYPE = 'product_update';

const stack = contentstack.stack({
  apiKey: envConfig.CONTENTSTACK_API_KEY,
  deliveryToken: envConfig.CONTENTSTACK_DELIVERY_TOKEN,
  environment: envConfig.CONTENTSTACK_ENVIRONMENT,
});

const cachedEntries: Map<string, { entries: ProductUpdateEntry[]; timestamp: number; totalCount: number }> = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

let cachedFilterOptions: FilterOptions | null = null;
let lastFilterFetchTime: number = 0;
const FILTER_CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day

interface GetProductUpdatesParams {
  limit: number;
  skip: number;
  search?: string;
  categories?: string[];
  offerings?: string[];
  products?: string[];
}

export async function getProductUpdates({
  limit,
  skip,
  search = '',
}: GetProductUpdatesParams): Promise<{ entries: ProductUpdateEntry[]; totalCount: number }> {
  const now = Date.now();
  const cacheKey = `${limit}-${skip}-${search}`;

  // Return cached data if it's still fresh
  const cached = cachedEntries.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return { entries: cached.entries, totalCount: cached.totalCount };
  }

  try {
    const result = await stack
      .contentType(CONTENT_TYPE)
      .entry()
      .query()
      .search(search)
      .orderByDescending('published_date')
      .limit(limit)
      .skip(skip)
      .includeCount()
      .find<ProductUpdateEntry>();

    const entries = result.entries || [];

    // Cache the results with key
    cachedEntries.set(cacheKey, { entries, timestamp: now, totalCount: result.count ?? 0 });

    return { entries, totalCount: result.count ?? 0 };
  } catch (error) {
    console.error('Error fetching product updates:', error);
    throw error;
  }
}

export async function getFeaturedProductUpdates(): Promise<ProductUpdateEntry[]> {
  const response = await stack
    .contentType(CONTENT_TYPE)
    .entry()
    .query({
      is_featured: true,
    })
    .orderByDescending('published_date')
    .limit(3)
    .find<ProductUpdateEntry>();

  return response.entries || [];
}

export async function getProductUpdateBySlug(slug: string): Promise<ProductUpdateEntry | null> {
  const { entries } = await getProductUpdates({ limit: 1000, skip: 0 });

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
    const { entries } = await getProductUpdates({ limit: 1000, skip: 0 });

    // Helper function to extract all unique values used in entries for a field
    const getUsedValuesFromEntries = (fieldName: 'tags_category' | 'tags_offerings' | 'tags_product'): string[] => {
      const usedValues = new Set<string>();
      entries.forEach((entry) => {
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
