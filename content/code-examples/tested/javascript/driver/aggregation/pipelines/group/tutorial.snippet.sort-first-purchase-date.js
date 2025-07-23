pipeline.push({
  $sort: {
    first_purchase_date: 1,
  },
});
