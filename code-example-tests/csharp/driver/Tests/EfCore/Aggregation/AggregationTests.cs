namespace Tests.EfCore.Aggregation;

using Examples.EfCore.Aggregation;
using Examples.EfCore.QuickReference;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

[TestFixture]
public class AggregationTests
{
    private IMongoClient _client = null!;
    private IMongoDatabase _database = null!;
    private const string DbName = "test_aggregation";

    private static readonly Planet[] SeedPlanets =
    [
        new() { _id = ObjectId.GenerateNewId(), name = "Mercury", orderFromSun = 1, hasRings = false },
        new() { _id = ObjectId.GenerateNewId(), name = "Venus",   orderFromSun = 2, hasRings = false },
        new() { _id = ObjectId.GenerateNewId(), name = "Earth",   orderFromSun = 3, hasRings = false },
        new() { _id = ObjectId.GenerateNewId(), name = "Mars",    orderFromSun = 4, hasRings = false },
        new() { _id = ObjectId.GenerateNewId(), name = "Jupiter", orderFromSun = 5, hasRings = true  },
        new() { _id = ObjectId.GenerateNewId(), name = "Saturn",  orderFromSun = 6, hasRings = true  },
        new() { _id = ObjectId.GenerateNewId(), name = "Uranus",  orderFromSun = 7, hasRings = true  },
        new() { _id = ObjectId.GenerateNewId(), name = "Neptune", orderFromSun = 8, hasRings = true  },
    ];

    [SetUp]
    public void SetUp()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        _client = new MongoClient(connectionString);
        _database = _client.GetDatabase(DbName);

        _database.GetCollection<Planet>("planets").DeleteMany(new BsonDocument());

        var db = PlanetDbContext.Create(_database);
        db.Planets.AddRange(SeedPlanets);
        db.SaveChanges();
    }

    [TearDown]
    public void TearDown()
    {
        _client.DropDatabase(DbName);
        _client.Dispose();
    }

    private Examples.EfCore.Aggregation.Aggregation CreateExample()
    {
        var db = PlanetDbContext.Create(_database);
        return new Examples.EfCore.Aggregation.Aggregation(db);
    }

    [Test]
    [Description("Counts all planets in the collection using Count().")]
    public void TestCount()
    {
        var result = CreateExample().Count();
        Expect.That(result).ShouldMatch(8);
    }

    [Test]
    [Description("Counts planets with rings using Count() with a predicate.")]
    public void TestCountPredicate()
    {
        var result = CreateExample().CountPredicate();
        Expect.That(result).ShouldMatch(4);
    }

    [Test]
    [Description("Counts all planets using LongCount() and returns a long.")]
    public void TestLongCount()
    {
        var result = CreateExample().LongCount();
        Expect.That(result).ShouldMatch(8L);
    }

    [Test]
    [Description("Counts planets with rings using LongCount() with a predicate.")]
    public void TestLongCountPredicate()
    {
        var result = CreateExample().LongCountPredicate();
        Expect.That(result).ShouldMatch(4L);
    }

    [Test]
    [Description("Checks if any planets have rings using Any().")]
    public void TestAny()
    {
        var result = CreateExample().Any();
        Expect.That(result).ShouldMatch(true);
    }

    [Test]
    [Description("Finds the maximum orderFromSun value using Max().")]
    public void TestMax()
    {
        var result = CreateExample().Max();
        Expect.That(result).ShouldMatch(8);
    }

    [Test]
    [Description("Finds the minimum orderFromSun value using Min().")]
    public void TestMin()
    {
        var result = CreateExample().Min();
        Expect.That(result).ShouldMatch(1);
    }

    [Test]
    [Description("Sums the orderFromSun values using Sum().")]
    public void TestSum()
    {
        // 1+2+3+4+5+6+7+8 = 36
        var result = CreateExample().Sum();
        Expect.That(result).ShouldMatch(36);
    }

    [Test]
    [Description("Averages the orderFromSun values using Average().")]
    public void TestAverage()
    {
        // (1+2+3+4+5+6+7+8) / 8 = 4.5
        var result = CreateExample().Average();
        Expect.That(result).ShouldMatch(4.5);
    }
}

