namespace Tests.EfCore.Faq;

using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

[TestFixture]
public class FaqTests
{
    private IMongoClient _client = null!;

    [SetUp]
    public void SetUp()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        _client = new MongoClient(connectionString);
    }

    [TearDown]
    public void TearDown()
    {
        // Drop the index we created so each test run is clean
        try
        {
            var database = _client.GetDatabase("sample_mflix");
            database.GetCollection<BsonDocument>("movies").Indexes.DropAll();
        }
        catch
        {
            // Ignore cleanup errors
        }

        _client.Dispose();
    }

    [Test]
    [Description("Creates a compound index on the movies collection and verifies it exists.")]
    public async Task TestCreateIndex()
    {
        // Ensure the collection exists
        var database = _client.GetDatabase("sample_mflix");
        try
        {
            await database.CreateCollectionAsync("movies");
        }
        catch (MongoCommandException)
        {
            // Collection already exists
        }

        await Examples.EfCore.Faq.Faq.CreateIndex();

        var indexes = await database.GetCollection<BsonDocument>("movies")
            .Indexes.ListAsync();
        var indexList = await indexes.ToListAsync();

        // Verify the compound index on Title and Genres was created
        var compoundIndex = indexList.FirstOrDefault(i =>
            i["key"].AsBsonDocument.Contains("Title") &&
            i["key"].AsBsonDocument.Contains("Genres"));

        Expect.That(compoundIndex?["key"]?.ToJson()).ShouldMatch("{ \"Title\" : 1, \"Genres\" : 1 }");
    }
}

