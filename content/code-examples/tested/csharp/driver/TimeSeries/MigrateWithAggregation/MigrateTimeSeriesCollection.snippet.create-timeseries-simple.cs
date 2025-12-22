var timeSeriesOptions = new TimeSeriesOptions(
    timeField: "ts",
    metaField: "metaData",
    granularity: TimeSeriesGranularity.Seconds
);

database.CreateCollection(weather_new,
    new CreateCollectionOptions { TimeSeriesOptions = timeSeriesOptions });
