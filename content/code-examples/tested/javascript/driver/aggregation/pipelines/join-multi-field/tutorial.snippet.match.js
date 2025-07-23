pipeline.push({
  $match: {
    orders: { $ne: [] },
  },
});
