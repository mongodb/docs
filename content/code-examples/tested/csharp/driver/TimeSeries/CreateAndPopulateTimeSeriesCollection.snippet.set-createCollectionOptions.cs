// Define CreateCollectionOptions with TimeSeriesOptions
var createCollectionOptions = new CreateCollectionOptions
{
    TimeSeriesOptions = timeSeriesOptions,
    ExpireAfter = TimeSpan.FromHours(24) // Optional: Expire documents after a specified time period.
};
