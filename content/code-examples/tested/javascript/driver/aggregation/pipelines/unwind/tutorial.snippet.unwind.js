pipeline.push({
  $unwind: {
    path: '$products',
  },
});
