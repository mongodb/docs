using Examples.TimeSeries;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

namespace Tests.TimeSeries;

public class TimeSeriesTest
{
    private static readonly string Uri = DotNetEnv.Env.GetString("CONNECTION_STRING",
        "Env variable not found. Verify you have a .env file with a valid connection string.");

    [SetUp]
    public void Setup()
    {
        CreateAndPopulateTimeSeriesCollection.CreateTimeSeriesCollection();
    }

    [Test]
    public async Task TestQueryByTimeRange()
    {
        var expected = 4;
        var findResult = await QueryTimeSeriesCollection.TimeSeriesFindByTimeRange();
        var result1 = await ComparisonEngine.CompareAsync(expected, findResult.Count);
        Assert.That(result1.IsSuccess, Is.True);
        var result2 = await ComparisonEngine.CompareAsync(45.200000000000003, findResult[0]["temp"]);
        Assert.That(result2.IsSuccess, Is.True);
    }

    [Test]
    public async Task TestTimeSeriesFindOne()
    {
        var findResult = await QueryTimeSeriesCollection.TimeSeriesFindOne();
        var expected = new BsonDocument
        {
            { "timestamp", DateTime.Parse("2021-11-19T08:00:00Z").ToUniversalTime() },
            { "temp", 43.299999999999997 },
            {
                "sensor", new BsonDocument
                {
                    { "sensor_id", 5578 },
                    { "type", "temperature" }
                }
            }
        };

        var subfieldResult = await QueryTimeSeriesCollection.TimeSeriesFindBySubfield();
        var result = await ComparisonEngine.CompareAsync(7, subfieldResult.Count);
        Assert.That(result.IsSuccess, Is.True);
    }

    [Test]
    public async Task TestTimeSeriesAggregate()
    {
        var aggResult = await QueryTimeSeriesCollection.TimeSeriesAggregate();
        var result1 = await ComparisonEngine.CompareAsync(1, aggResult.Count);
        Assert.That(result1.IsSuccess, Is.True);
        var result2 = await ComparisonEngine.CompareAsync(47.357142857142854, aggResult[0]["avgTemp"]);
        Assert.That(result2.IsSuccess, Is.True);
    }

    [TearDown]
    public void TearDown()
    {
        var client = new MongoClient(Uri);
        var database = client.GetDatabase("timeseries");
        database.DropCollection("weather");
    }
}