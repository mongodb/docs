const pipeline = [
  { $sort: { 'metadata.sensorId': 1, timestamp: -1 } },
  {
    $group: {
      _id: '$metadata.sensorId',
      ts: { $first: '$timestamp' },
      temperatureF: { $first: '$currentConditions.tempF' },
    },
  },
];

const result = await collection.aggregate(pipeline).toArray();
