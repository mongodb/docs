pipeline.push({
  $lookup: {
    from: 'products',
    localField: 'product_id',
    foreignField: 'id',
    as: 'product_mapping',
  },
});
