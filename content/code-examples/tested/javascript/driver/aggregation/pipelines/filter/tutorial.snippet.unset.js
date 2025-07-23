pipeline.push({
  $unset: ['_id', 'address'],
});
