// Type for the filter categories
export type FilterCategory = 'offering' | 'category' | 'product';

// Type for filter options (dynamic, fetched from Contentstack schema)
export type FilterOptions = Record<FilterCategory, string[]>;
