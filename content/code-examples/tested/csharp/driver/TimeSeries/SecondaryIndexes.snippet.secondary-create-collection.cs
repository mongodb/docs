var createCollectionOptions = new CreateCollectionOptions
{
    TimeSeriesOptions = new TimeSeriesOptions(
        timeField: "timestamp",
        metaField: "metadata"),
    ExpireAfter = TimeSpan.FromHours(24)
};
