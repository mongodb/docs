export const PRODUCT_UPDATE_FILTERS = {
  offering: [
    'MongoDB Atlas',
    'MongoDB Community Edition',
    'MongoDB Enterprise Advanced',
    'Voyage AI by MongoDB',
    'MongoDB Atlas for Government',
  ],
  category: [
    'DevOps Tooling',
    'Security',
    'Durability',
    'Availability',
    'Performance',
    'Observability',
    'AI Retrieval',
    'Data Services',
    'Developer Tooling',
    'Developer Acceleration',
    'AI-powered tooling',
    'Multi-cloud',
    'Migration',
    'Compliance',
    'Pricing',
  ],
  product: [
    'Ops Manager',
    'Cloud Manager',
    'Kubernetes Operator (Enterprise & Atlas)',
    'MongoDB Compass',
    'MongoDB Shell',
    'Atlas CLI',
    'MongoDB Relational Migrator',
    'MongoDB IDE Extensions',
    'Performance Advisor',
    'Query Insights',
    'Query Profiler',
    'Schema Advisor',
    'Alerts',
    'Atlas Search',
    'Vector Search',
    'Full-text Search',
    'Hybrid Search',
    'Search Nodes',
    'Embedding Models',
    'MongoDB AI Frameworks',
    'Atlas SQL Interface',
    'Atlas Data Federation',
    'Atlas Charts',
    'Atlas Stream Processing',
    'Atlas Online Archive',
    'Time Series',
    'Multi-cloud Clusters',
    'Terraform Provider for MongoDB',
    'Compliance Certifications',
  ],
} as const;

// Type for the filter categories
export type FilterCategory = keyof typeof PRODUCT_UPDATE_FILTERS;

// Type for individual filter values
export type FilterValue = (typeof PRODUCT_UPDATE_FILTERS)[FilterCategory][number];

// Helper function to get all filter values for a category
export const getFilterValues = (category: FilterCategory): readonly string[] => {
  return PRODUCT_UPDATE_FILTERS[category];
};

// Helper function to get all available filter categories
export const getFilterCategories = (): readonly FilterCategory[] => {
  return Object.keys(PRODUCT_UPDATE_FILTERS) as readonly FilterCategory[];
};
