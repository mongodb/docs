using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Examples.Aggregation.Builders;

// :snippet-start: weather-measurement-class
[BsonIgnoreExtraElements]
public class WeatherMeasurement
{
    [BsonId]
    public ObjectId Id { get; set; }
    [BsonElement("localityId")]
    public string LocalityId { get; set; } = null!;
    [BsonElement("measurementDateTime")]
    public DateTime MeasurementDateTime { get; set; }
    [BsonElement("rainfall")]
    public float Rainfall { get; set; }
    [BsonElement("temperature")]
    public float Temperature { get; set; }
}
// :snippet-end:

public class SetWindowFieldsExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");

    public void LoadSampleData()
    {
        using var client = new MongoClient(_uri);
        var db = client.GetDatabase("test_setwindowfields");
        db.DropCollection("weather");
        var collection = db.GetCollection<WeatherMeasurement>("weather");

        collection.InsertMany(new[]
        {
            new WeatherMeasurement
            {
                LocalityId = "L1",
                MeasurementDateTime = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                Rainfall = 5.0f,
                Temperature = 20.0f
            },
            new WeatherMeasurement
            {
                LocalityId = "L1",
                MeasurementDateTime = new DateTime(2025, 2, 15, 0, 0, 0, DateTimeKind.Utc),
                Rainfall = 10.0f,
                Temperature = 25.0f
            },
            new WeatherMeasurement
            {
                LocalityId = "L1",
                MeasurementDateTime = new DateTime(2025, 3, 20, 0, 0, 0, DateTimeKind.Utc),
                Rainfall = 8.0f,
                Temperature = 22.0f
            },
            new WeatherMeasurement
            {
                LocalityId = "L2",
                MeasurementDateTime = new DateTime(2025, 1, 10, 0, 0, 0, DateTimeKind.Utc),
                Rainfall = 6.0f,
                Temperature = 18.0f
            },
            new WeatherMeasurement
            {
                LocalityId = "L2",
                MeasurementDateTime = new DateTime(2025, 1, 25, 0, 0, 0, DateTimeKind.Utc),
                Rainfall = 6.0f,
                Temperature = 18.0f
            }
        });
    }

    public List<BsonDocument> RunSetWindowFieldsPipeline()
    {
        using var client = new MongoClient(_uri);
        var collection = client
            .GetDatabase("test_setwindowfields")
            .GetCollection<WeatherMeasurement>("weather");

        // :snippet-start: set-window-fields
        var pipeline = new EmptyPipelineDefinition<WeatherMeasurement>()
            .SetWindowFields(
                partitionBy: w => w.LocalityId,
                sortBy: Builders<WeatherMeasurement>.Sort.Ascending(
                    w => w.MeasurementDateTime),
                output: o => new
                {
                    MonthlyRainfall = o.Sum(
                        w => w.Rainfall, RangeWindow.Create(
                            RangeWindow.Months(-1),
                            RangeWindow.Current)
                    ),
                    TemperatureAvg = o.Average(
                        w => w.Temperature, RangeWindow.Create(
                            RangeWindow.Months(-1),
                            RangeWindow.Current)
                    ),
                    MedianTemperature = o.Median(
                        w => w.Temperature,
                        RangeWindow.Create(
                            RangeWindow.Months(-1),
                            RangeWindow.Current)
                    ),
                    NinetiethPercentileRainfall = o.Percentile(
                        w => w.Rainfall,
                        new[] { 0.9 },
                        RangeWindow.Create(
                            RangeWindow.Months(-1),
                            RangeWindow.Current)
                    )
                }
            );
        // :snippet-end:
        var bsonPipeline = pipeline.As(BsonDocumentSerializer.Instance);
        return collection.Aggregate(bsonPipeline).ToList();
    }
}
