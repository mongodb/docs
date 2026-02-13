const hintPipeline = [
  { $sort: { 'metadata.sensorId': 1, timestamp: -1 } },
  {
    $group: {
      _id: '$metadata.sensorId',
      ts: { $first: '$timestamp' },
      temperatureF: { $first: '$currentConditions.tempF' },
    },
  },
];

const hintResult = await collection
  .aggregate(hintPipeline, {
    hint: { 'metadata.sensorId': 1, timestamp: -1 },
  })
  .toArray();
