// Subscribe to the driver's ActivitySource by using an ActivityListener.
// This approach avoids a dependency on the OpenTelemetry SDK.
var exportedSpans = new List<Activity>();
using var listener = new ActivityListener
{
    ShouldListenTo = source => source.Name == MongoTelemetry.ActivitySourceName,
    Sample = (ref ActivityCreationOptions<ActivityContext> _) =>
        ActivitySamplingResult.AllDataAndRecorded,
    ActivityStopped = exportedSpans.Add
};
ActivitySource.AddActivityListener(listener);
