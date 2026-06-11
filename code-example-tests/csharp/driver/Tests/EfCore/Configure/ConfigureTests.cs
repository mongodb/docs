namespace Tests.EfCore.Configure;

using Examples.EfCore.Configure;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

[TestFixture]
public class ConfigureTests
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
        _client.DropDatabase("test_ef_configure");
        _client.Dispose();
    }

    [Test]
    [Description("Verifies that UseMongoDB() returns a valid DbContext instance.")]
    public void TestUseMongoDB()
    {
        var db = Configure.UseMongoDB();
        Expect.That(db.GetType().Name).ShouldMatch("MyDbContext");
    }

    [Test]
    [Description("Verifies that ConfigureEFProvider() inserts a customer document.")]
    public void TestConfigureEFProvider()
    {
        Configure.ConfigureEFProvider();

        var customers = _client.GetDatabase("test_ef_configure")
            .GetCollection<BsonDocument>("customers");
        var filter = Builders<BsonDocument>.Filter.And(
            Builders<BsonDocument>.Filter.Eq("Name", "John Doe"),
            Builders<BsonDocument>.Filter.Eq("Order", "1 Green Tea"));
        var count = customers.CountDocuments(filter);
        Expect.That(count).ShouldMatch(1);
    }
}

