pipeline.push({
  $match: {
    'products.price': {
      $gt: 15,
    },
  },
});
