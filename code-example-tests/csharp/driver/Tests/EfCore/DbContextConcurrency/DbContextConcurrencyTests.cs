namespace Tests.EfCore.DbContextConcurrency;

using Examples.EfCore.DbContextConcurrency;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using MongoDB.Driver;
using Utilities.Comparison;

[TestFixture]
public class DbContextConcurrencyTests
{
    private IMongoClient _client = null!;
    private const string DbName = "test_concurrency";

    [SetUp]
    public void SetUp()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        _client = new MongoClient(connectionString);
    }

    [TearDown]
    public void TearDown()
    {
        _client.DropDatabase(DbName);
        _client.Dispose();
    }

    [Test]
    [Description("Verifies that ConcurrencyTokenDbContext configures the concurrency token without error.")]
    public void TestConcurrencyToken()
    {
        var options = new DbContextOptionsBuilder<ConcurrencyTokenDbContext>()
            .UseMongoDB(_client, DbName)
            .ConfigureWarnings(w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning))
            .Options;

        using var db = new ConcurrencyTokenDbContext(options);
        Expect.That(db.Model.FindEntityType(typeof(Customer))?.ShortName()).ShouldMatch("Customer");
    }

    [Test]
    [Description("Verifies that RowVersionDbContext configures row versioning without error.")]
    public void TestRowVersion()
    {
        var options = new DbContextOptionsBuilder<RowVersionDbContext>()
            .UseMongoDB(_client, DbName)
            .ConfigureWarnings(w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning))
            .Options;

        using var db = new RowVersionDbContext(options);
        Expect.That(db.Model.FindEntityType(typeof(Customer))?.ShortName()).ShouldMatch("Customer");
    }
}

