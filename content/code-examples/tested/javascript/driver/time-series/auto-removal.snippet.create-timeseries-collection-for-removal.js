const createCommand = {
  create: 'weather24h',
  timeseries: {
    timeField: 'timestamp',
    metaField: 'sensorId',
    granularity: 'seconds',
  },
  expireAfterSeconds: 86400,
};

// Execute the command to create the collection
await database.command(createCommand);
