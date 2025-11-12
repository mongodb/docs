var timeSeriesOptions = new TimeSeriesOptions(
    timeField: "date",
    metaField: "ticker",
    bucketMaxSpanSeconds: 3600,
    bucketRoundingSeconds: 3600
);

var options = new CreateCollectionOptions
{
    TimeSeriesOptions = timeSeriesOptions
};
