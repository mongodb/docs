using System.Diagnostics;
using DotNetEnv;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;
using OpenTelemetry;
using OpenTelemetry.Exporter;
using OpenTelemetry.Trace;

namespace Examples.Monitoring.OpenTelemetry;

/// <summary>
/// Demonstrates OpenTelemetry tracing with the MongoDB C# driver. The driver
/// emits spans through its "MongoDB.Driver" ActivitySource, so registering that
/// source with an OpenTelemetry TracerProvider is all it takes to start
/// collecting traces.
/// </summary>
public class OpenTelemetryExamples
{
    private const string DatabaseName = "sample_mflix";
    private const string CollectionName = "movies";

    private readonly string _uri = Env.GetString(
        "CONNECTION_STRING",
        "Env variable not found. Verify you have a .env file with a valid connection string.");

    // Returns the spans the driver emitted while running a find operation.
    public List<BsonDocument> RunExample()
    {
        // :snippet-start: enable-tracing
        // Register the driver's ActivitySource with an OpenTelemetry
        // TracerProvider.
        var exportedSpans = new List<Activity>();
        using var tracerProvider = Sdk.CreateTracerProviderBuilder()
            .AddSource(MongoTelemetry.ActivitySourceName)
            .AddInMemoryExporter(exportedSpans)
            .Build();
        // :snippet-end:

        // :snippet-start: create-client-and-collection
        // :uncomment-start:
        //var connectionString = "<connection string>";
        //var client = new MongoClient(connectionString);
        //var collection = client.GetDatabase("sample_mflix").GetCollection<BsonDocument>("movies");
        // :uncomment-end:
        var connectionString = _uri; // :remove:
        using var client = new MongoClient(connectionString); // :remove:
        var collection = client.GetDatabase(DatabaseName).GetCollection<BsonDocument>(CollectionName); // :remove:
        // :snippet-end:

        // :snippet-start: run-operations
        var filter = Builders<BsonDocument>.Filter.Eq("title", "Back to the Future");
        var movie = collection.Find(filter).First();
        // :snippet-end:

        // Flush any buffered spans before reading the collected data.
        tracerProvider.ForceFlush();

        return DescribeSpans(exportedSpans);
    }

    // Returns the spans the driver emitted while using a raw ActivityListener
    // instead of the OpenTelemetry SDK.
    public List<BsonDocument> RunExampleWithActivityListener()
    {
        // :snippet-start: enable-tracing-listener
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
        // :snippet-end:

        using var client = new MongoClient(_uri);
        var collection = client.GetDatabase(DatabaseName).GetCollection<BsonDocument>(CollectionName);
        var filter = Builders<BsonDocument>.Filter.Eq("title", "Back to the Future");
        collection.Find(filter).First();

        return DescribeSpans(exportedSpans);
    }

    // Returns the spans the driver emitted while running a find operation with
    // tracing configured in a generic host.
    public List<BsonDocument> RunExampleInGenericHost()
    {
        // :snippet-start: enable-tracing-host
        // Register the driver's ActivitySource with an OpenTelemetry
        // TracerProvider in a generic host.
        var exportedSpans = new List<Activity>();
        var builder = Host.CreateApplicationBuilder();

        builder.Services.AddOpenTelemetry()
            .WithTracing(tracing => tracing
                .AddSource(MongoTelemetry.ActivitySourceName)
                .AddInMemoryExporter(exportedSpans));

        var host = builder.Build();
        // :snippet-end:

        host.Start();
        var tracerProvider = host.Services.GetRequiredService<TracerProvider>();

        using (var client = new MongoClient(_uri))
        {
            var collection = client.GetDatabase(DatabaseName).GetCollection<BsonDocument>(CollectionName);
            var filter = Builders<BsonDocument>.Filter.Eq("title", "Back to the Future");
            collection.Find(filter).First();
        }

        tracerProvider.ForceFlush();
        host.StopAsync().GetAwaiter().GetResult();
        host.Dispose();

        return DescribeSpans(exportedSpans);
    }

    // Returns the db.query.text attribute captured for a find operation when
    // QueryTextMaxLength is configured.
    public string RunExampleWithQueryText()
    {
        var exportedSpans = new List<Activity>();
        using var tracerProvider = Sdk.CreateTracerProviderBuilder()
            .AddSource(MongoTelemetry.ActivitySourceName)
            .AddInMemoryExporter(exportedSpans)
            .Build();

        var connectionString = _uri;

        // :snippet-start: configure-tracing-options
        var settings = MongoClientSettings.FromConnectionString(connectionString);
        settings.TracingOptions = new TracingOptions
        {
            Disabled = false,
            QueryTextMaxLength = 1024
        };
        var client = new MongoClient(settings);
        // :snippet-end:

        var collection = client.GetDatabase(DatabaseName).GetCollection<BsonDocument>(CollectionName);
        var filter = Builders<BsonDocument>.Filter.Eq("title", "Back to the Future");
        collection.Find(filter).First();

        client.Dispose();
        tracerProvider.ForceFlush();

        var queryText = exportedSpans
            .Select(span => span.GetTagItem("db.query.text"))
            .FirstOrDefault(value => value is not null);

        return queryText?.ToString() ?? string.Empty;
    }

    private static List<BsonDocument> DescribeSpans(IEnumerable<Activity> spans) =>
        spans
            .Select(span => new BsonDocument
            {
                { "name", span.DisplayName },
                { "kind", GetSpanKind(span) },
            })
            .ToList();

    private static string GetSpanKind(Activity span)
    {
        if (span.GetTagItem("db.operation.name") is not null) return "operation";
        if (span.GetTagItem("db.command.name") is not null) return "command";
        return "other";
    }
}
