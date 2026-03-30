namespace Tests.EfCore.Configure;

using Examples.EfCore.Configure;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

[TestFixture]
public class ConfigureTests
{
    private IMongoClient _client = null!;
    private IMongoCollection<BsonDocument> _customers = null!;

    private static FilterDefinition<BsonDocument> TestCustomerFilter =>
        Builders<BsonDocument>.Filter.And(
            Builders<BsonDocument>.Filter.Eq("Name", "John Doe"),
            Builders<BsonDocument>.Filter.Eq("Order", "1 Green Tea"));

    [SetUp]
    public void SetUp()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        _client = new MongoClient(connectionString);
        _customers = _client.GetDatabase("sample_guides").GetCollection<BsonDocument>("customers");
        _customers.DeleteMany(TestCustomerFilter);
    }

    [TearDown]
    public void TearDown()
    {
        _customers.DeleteMany(TestCustomerFilter);
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

        var count = _customers.CountDocuments(TestCustomerFilter);
        Expect.That(count).ShouldMatch(1);
    }
}

