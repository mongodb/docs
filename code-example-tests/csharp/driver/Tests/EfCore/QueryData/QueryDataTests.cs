namespace Tests.EfCore.QueryData;

using Examples.EfCore.QueryData;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

[TestFixture]
public class QueryDataTests
{
    private IMongoClient _client = null!;
    private IMongoDatabase _database = null!;
    private const string DbName = "test_query_data";

    // We seed test data rather than using the Atlas sample dataset because these tests
    // perform write operations that would corrupt shared sample data.
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
        db.Entry(SeedPlanets[2]).Property<string[]>("mainAtmosphere").CurrentValue = ["Nitrogen", "Oxygen"];
        db.Entry(SeedPlanets[5]).Property<string[]>("mainAtmosphere").CurrentValue = ["Hydrogen", "Helium"];
        db.SaveChanges();
    }

    [TearDown]
    public void TearDown()
    {
        _client.DropDatabase(DbName);
        _client.Dispose();
    }

    private void InsertFieldExistenceDocuments()
    {
        _database.GetCollection<BsonDocument>("planets").InsertMany(
        [
            new BsonDocument
            {
                { "_id", ObjectId.GenerateNewId() },
                { "name", "Planet X" },
                { "orderFromSun", 9 }
            },
            new BsonDocument
            {
                { "_id", ObjectId.GenerateNewId() },
                { "name", "Planet Null" },
                { "orderFromSun", 10 },
                { "hasRings", BsonNull.Value }
            }
        ]);
    }

    [Test]
    [Description("Finds a single planet using FirstOrDefault().")]
    public void TestFindOne()
    {
        var example = new QueryData(DbName);
        var result = example.FindOne();

        Expect.That(result?.name).ShouldMatch("Mercury");
    }

    [Test]
    [Description("Finds multiple planets that have rings using Where().")]
    public void TestFindMultiple()
    {
        var example = new QueryData(DbName);
        var result = example.FindMultiple();

        Expect.That(result)
            .WithIgnoredFields("_id")
            .ShouldMatch(FullPath("FindMultipleOutput.txt"));
    }

    [Test]
    [Description("Queries planets by a shadow property using EF.Property().")]
    public void TestFindByShadowProperty()
    {
        var example = new QueryData(DbName);
        var result = example.FindByShadowProperty();

        Expect.That(result)
            .WithIgnoredFields("_id")
            .ShouldMatch(FullPath("FindByShadowPropertyOutput.txt"));
    }

    [Test]
    [Description("Sorts planets by orderFromSun using OrderBy().")]
    public void TestOrderBy()
    {
        var example = new QueryData(DbName);
        var result = example.OrderByExample();
        var expected = File.ReadAllText(FullPath("OrderByOutput.txt")).TrimEnd();

        Expect.That(result).ShouldMatch(expected);
    }

    [Test]
    [Description("Sorts planets by hasRings then by name using OrderBy().ThenBy().")]
    public void TestDoubleOrderBy()
    {
        var example = new QueryData(DbName);
        var result = example.DoubleOrderBy();
        var expected = File.ReadAllText(FullPath("DoubleOrderByOutput.txt")).TrimEnd();

        Expect.That(result).ShouldMatch(expected);
    }

    [Test]
    [Description("Limits results to three planets using Take().")]
    public void TestTake()
    {
        var example = new QueryData(DbName);
        var result = example.TakeExample();

        Expect.That(result.Count).ShouldMatch(3);
    }

    [Test]
    [Description("Skips the first five planets using Skip().")]
    public void TestSkip()
    {
        var example = new QueryData(DbName);
        var result = example.SkipExample();

        Expect.That(result)
            .WithOrderedSort()
            .WithIgnoredFields("_id")
            .ShouldMatch(FullPath("SkipOutput.txt"));
    }

    [Test]
    [Description("Filters planets where the hasRings field exists using EF.Property().")]
    public void TestCheckFieldExists()
    {
        InsertFieldExistenceDocuments();
        var example = new QueryData(DbName);
        var result = example.CheckFieldExists();

        Expect.That(result)
            .WithUnorderedSort()
            .ShouldMatch(new[] { "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Planet Null" });
    }

    [Test]
    [Description("Filters planets where the hasRings field is missing.")]
    public void TestCheckFieldIsMissing()
    {
        InsertFieldExistenceDocuments();
        var example = new QueryData(DbName);
        var result = example.CheckFieldIsMissing();

        Expect.That(result).ShouldMatch(new[] { "Planet X" });
    }

    [Test]
    [Description("Filters planets where the hasRings field is null or missing.")]
    public void TestCheckFieldIsNullOrMissing()
    {
        InsertFieldExistenceDocuments();
        var example = new QueryData(DbName);
        var result = example.CheckFieldIsNullOrMissing();

        Expect.That(result).ShouldMatch(new[] { "Planet X", "Planet Null" });
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/EfCore/QueryData/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
