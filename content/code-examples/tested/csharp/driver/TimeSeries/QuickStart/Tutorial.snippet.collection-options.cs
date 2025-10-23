var timeSeriesOptions = new TimeSeriesOptions(
    timeField: "date",
    metaField: "ticker",
    TimeSeriesGranularity.Seconds
);

var options = new CreateCollectionOptions
{
    TimeSeriesOptions = timeSeriesOptions
};
