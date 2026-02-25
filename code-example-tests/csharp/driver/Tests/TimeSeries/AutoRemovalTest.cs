using DotNetEnv;
using Examples.TimeSeries;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

namespace Tests.TimeSeries;

public class AutoRemovalTest
{
    private static readonly string Uri = DotNetEnv.Env.GetString("CONNECTION_STRING",
        "Env variable not found. Verify you have a .env file with a valid connection string.");

    [Test]
    public async Task TestCollectionOptionsUpdate()
    {
        var expected = new[]
        {
            new Dictionary<string, object> { { "ok", 1 } }
        };

        var updateCommandResult = await AutoRemoval.UpdateCollectionOptions();

        Expect.That(updateCommandResult)
            .ShouldResemble(expected)
            .WithSchema(new SchemaValidationOptions
            {
                Count = 1,
                RequiredFields = new[] { "ok" },
                FieldValues =
                    new Dictionary<string, object?>() { { "ok", 1 } }
            });
    }

    [Test]
    public async Task TestCollectionExpiry()
    {
        var result = await AutoRemoval.GetCollectionInfo();
        Expect.That(result).ShouldMatch(86400);
    }

    [Test]
    public async Task TestRemoveRemoval()
    {
        var result = await AutoRemoval.RemoveRemoval();
        Expect.That(result).ShouldMatch(true);
    }

    [TearDown]
    public void TearDown()
    {
        AutoRemoval.Cleanup();
    }
}