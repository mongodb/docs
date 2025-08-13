// Specify the time series options to configure the collection
TimeSeriesOptions timeSeriesOptions = new TimeSeriesOptions("date")
        .metaField("ticker")
        .granularity(TimeSeriesGranularity.SECONDS);

CreateCollectionOptions options = new CreateCollectionOptions()
        .timeSeriesOptions(timeSeriesOptions);
