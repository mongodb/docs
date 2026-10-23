// Register the driver's ActivitySource with an OpenTelemetry
// TracerProvider in a generic host.
var exportedSpans = new List<Activity>();
var builder = Host.CreateApplicationBuilder();

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .AddSource(MongoTelemetry.ActivitySourceName)
        .AddInMemoryExporter(exportedSpans));

var host = builder.Build();
