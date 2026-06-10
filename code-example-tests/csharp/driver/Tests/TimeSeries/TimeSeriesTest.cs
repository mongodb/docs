using DotNetEnv;
using Examples.TimeSeries;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

namespace Tests.TimeSeries;

/*
  These examples use a far future date to prevent a bug where documents are
  deleted almost immediately after being inserted due to the default
  expireAfterSeconds value of 0.

  For details, see https://jira.mongodb.org/browse/DOCSP-58779.
*/
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
        await Expect.That(findResult.Count).ShouldMatchAsync(expected);
        await Expect.That(findResult[0]["temp"]).ShouldMatchAsync(45.200000000000003);
    }

    [Test]
    public async Task TestTimeSeriesFindOne()
    {
        var findResult = await QueryTimeSeriesCollection.TimeSeriesFindOne();
        var expected = new BsonDocument
        {
            { "timestamp", DateTime.Parse("2045-11-19T08:00:00Z").ToUniversalTime() },
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
        await Expect.That(subfieldResult.Count).ShouldMatchAsync(7);
    }

    [Test]
    public async Task TestTimeSeriesAggregate()
    {
        var aggResult = await QueryTimeSeriesCollection.TimeSeriesAggregate();
        await Expect.That(aggResult.Count).ShouldMatchAsync(1);
        await Expect.That(aggResult[0]["avgTemp"]).ShouldMatchAsync(47.357142857142854);
    }

    [TearDown]
    public void TearDown()
    {
        using var client = new MongoClient(Uri);
        var database = client.GetDatabase("timeseries");
        database.DropCollection("weather");
    }
}