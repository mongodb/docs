pipeline.push({
  $set: {
    product_id: '$_id',
  },
});
