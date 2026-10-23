// Register the driver's ActivitySource with an OpenTelemetry
// TracerProvider.
var exportedSpans = new List<Activity>();
using var tracerProvider = Sdk.CreateTracerProviderBuilder()
    .AddSource(MongoTelemetry.ActivitySourceName)
    .AddInMemoryExporter(exportedSpans)
    .Build();
