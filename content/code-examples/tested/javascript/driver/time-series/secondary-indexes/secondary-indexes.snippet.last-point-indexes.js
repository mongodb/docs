// Indexes on ``timeField`` descending are more performant because they
// enable ``DISTINCT_SCAN`` optimizations.
const indexes = [
  { key: { 'metadata.sensorId': 1, timestamp: 1 } },
  { key: { 'metadata.sensorId': 1, timestamp: -1 } },
  { key: { 'metadata.sensorId': -1, timestamp: 1 } },
  { key: { 'metadata.sensorId': -1, timestamp: -1 } },
];
