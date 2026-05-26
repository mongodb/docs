namespace Tests.EfCore.Transactions;

using Examples.EfCore.Transactions;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

[TestFixture]
public class TransactionsTests
{
    private IMongoClient _client = null!;
    private IMongoDatabase _database = null!;
    private const string DbName = "test_transactions";

    [SetUp]
    public void SetUp()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        _client = new MongoClient(connectionString);
        _database = _client.GetDatabase(DbName);

        _database.GetCollection<Planet>("planets").DeleteMany(new BsonDocument());

        var db = PlanetDbContext.Create(_database);
        db.Planets.Add(new Planet { Name = "Mercury" });
        db.SaveChanges();
    }

    [TearDown]
    public void TearDown()
    {
        _client.DropDatabase(DbName);
        _client.Dispose();
    }

    [Test]
    [Description("Verifies that AddRange() with SaveChanges() implicitly wraps multiple inserts in a transaction.")]
    public void TestImplicitTransactionSync()
    {
        var example = new Examples.EfCore.Transactions.Transactions(DbName);
        example.ImplicitTransactionSync();

        var db = PlanetDbContext.Create(_database);
        Expect.That(db.Planets.Any(p => p.Name == "Mercury")).ShouldMatch(true);
        Expect.That(db.Planets.Any(p => p.Name == "Venus")).ShouldMatch(true);
    }

    [Test]
    [Description("Verifies that AddRange() with SaveChangesAsync() implicitly wraps multiple inserts in a transaction.")]
    public async Task TestImplicitTransactionAsync()
    {
        var example = new Examples.EfCore.Transactions.Transactions(DbName);
        await example.ImplicitTransactionAsync();

        var db = PlanetDbContext.Create(_database);
        Expect.That(db.Planets.Any(p => p.Name == "Mercury")).ShouldMatch(true);
        Expect.That(db.Planets.Any(p => p.Name == "Venus")).ShouldMatch(true);
    }

    [Test]
    [Description("Verifies that setting AutoTransactionBehavior.Never allows SaveChanges() to run without a transaction.")]
    public void TestConfigureAutoTransactionSync()
    {
        var example = new Examples.EfCore.Transactions.Transactions(DbName);
        example.ConfigureAutoTransactionSync();

        var db = PlanetDbContext.Create(_database);
        Expect.That(db.Planets.Any(p => p.Name == "Mars")).ShouldMatch(true);
    }

    [Test]
    [Description("Verifies that setting AutoTransactionBehavior.Never allows SaveChangesAsync() to run without a transaction.")]
    public async Task TestConfigureAutoTransactionAsync()
    {
        var example = new Examples.EfCore.Transactions.Transactions(DbName);
        await example.ConfigureAutoTransactionAsync();

        var db = PlanetDbContext.Create(_database);
        Expect.That(db.Planets.Any(p => p.Name == "Mars")).ShouldMatch(true);
    }

    [Test]
    [Description("Verifies that BeginTransaction() wraps multiple SaveChanges() calls in a single explicit transaction.")]
    public void TestExplicitTransactionSync()
    {
        var example = new Examples.EfCore.Transactions.Transactions(DbName);
        example.ExplicitTransactionSync();

        var db = PlanetDbContext.Create(_database);
        Expect.That(db.Planets.Any(p => p.Name == "Mercury (Updated)")).ShouldMatch(true);
        Expect.That(db.Planets.Any(p => p.Name == "Venus")).ShouldMatch(true);
    }

    [Test]
    [Description("Verifies that BeginTransactionAsync() wraps multiple SaveChangesAsync() calls in a single explicit transaction.")]
    public async Task TestExplicitTransactionAsync()
    {
        var example = new Examples.EfCore.Transactions.Transactions(DbName);
        await example.ExplicitTransactionAsync();

        var db = PlanetDbContext.Create(_database);
        Expect.That(db.Planets.Any(p => p.Name == "Mercury (Updated)")).ShouldMatch(true);
        Expect.That(db.Planets.Any(p => p.Name == "Venus")).ShouldMatch(true);
    }

    [Test]
    [Description("Verifies that BeginTransaction() accepts TransactionOptions with a ReadConcern.")]
    public void TestTransactionOptionsSync()
    {
        var example = new Examples.EfCore.Transactions.Transactions(DbName);
        example.TransactionOptionsSync();

        var db = PlanetDbContext.Create(_database);
        Expect.That(db.Planets.Any(p => p.Name == "Mercury (Updated)")).ShouldMatch(true);
    }

    [Test]
    [Description("Verifies that BeginTransactionAsync() accepts TransactionOptions with a ReadConcern.")]
    public async Task TestTransactionOptionsAsync()
    {
        var example = new Examples.EfCore.Transactions.Transactions(DbName);
        await example.TransactionOptionsAsync();

        var db = PlanetDbContext.Create(_database);
        Expect.That(db.Planets.Any(p => p.Name == "Mercury (Updated)")).ShouldMatch(true);
    }
}
