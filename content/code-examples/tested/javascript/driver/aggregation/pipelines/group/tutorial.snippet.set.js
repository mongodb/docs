pipeline.push({
  $set: {
    customer_id: '$_id',
  },
});
