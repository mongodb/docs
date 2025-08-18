var timeSeriesOptions = new TimeSeriesOptions(
    timeField: "date",
    metaField: "ticker",
    granularity: TimeSeriesGranularity.Seconds
);

var options = new CreateCollectionOptions
{
    TimeSeriesOptions = timeSeriesOptions
};
