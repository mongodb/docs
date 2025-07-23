pipeline.push({
  $unset: ['_id', 'description'],
});
