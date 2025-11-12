var timeSeriesOptions = new TimeSeriesOptions(
    timeField: "timestamp", // Required: The field containing the date/time
    metaField: "sensorId", // Optional: The field containing metadata
    granularity: TimeSeriesGranularity.Hours // or 'seconds' | 'minutes' | 'hours'
);
