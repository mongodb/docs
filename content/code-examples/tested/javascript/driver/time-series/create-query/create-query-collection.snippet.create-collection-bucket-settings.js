const settings = {
  timeseries: {
    timeField: 'time',
    metaField: 'sensor',
    bucketMaxSpanSeconds: 3600,
    bucketRoundingSeconds: 3600,
  },
  expireAfterSeconds: 86400, // optional
};
