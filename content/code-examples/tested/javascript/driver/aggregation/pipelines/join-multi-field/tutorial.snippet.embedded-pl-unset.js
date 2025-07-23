embedded_pl.push({
  $unset: ['_id', 'product_name', 'product_variation'],
});
