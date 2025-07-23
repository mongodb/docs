pipeline.push(
  {
    $set: {
      product_mapping: { $first: '$product_mapping' },
    },
  },
  {
    $set: {
      product_name: '$product_mapping.name',
      product_category: '$product_mapping.category',
    },
  }
);
