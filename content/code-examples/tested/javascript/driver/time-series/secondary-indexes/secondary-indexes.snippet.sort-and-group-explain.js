const explainResult = await database.command({
  explain: {
    aggregate: collectionName,
    pipeline: pipeline,
    cursor: {},
  },
  verbosity: 'executionStats',
});
