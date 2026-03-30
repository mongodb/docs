namespace Tests.EfCore.QuickReference;

using Examples.EfCore.QuickReference;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

[TestFixture]
public class QuickReferenceTests
{
    private IMongoClient _client = null!;
    private IMongoDatabase _database = null!;
    private const string DbName = "test_quick_reference";

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

        // EF Core MongoDB provider doesn't support ExecuteDelete(); use the driver directly
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
        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
        var result = example.FindOne();

        Expect.That(result?.name).ShouldMatch("Mercury");
    }

    [Test]
    [Description("Finds multiple planets that have rings using Where().")]
    public void TestFindMultiple()
    {
        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
        var result = example.FindMultiple();

        Expect.That(result)
            .WithIgnoredFields("_id")
            .ShouldMatch(FullPath("FindMultipleOutput.txt"));
    }

    [Test]
    [Description("Queries planets by a shadow property using EF.Property().")]
    public void TestFindByShadowProperty()
    {
        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
        var result = example.FindByShadowProperty();

        Expect.That(result)
            .WithIgnoredFields("_id")
            .ShouldMatch(FullPath("FindByShadowPropertyOutput.txt"));
    }

    [Test]
    [Description("Inserts a single planet document using Add().")]
    public void TestInsertOne()
    {
        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
        example.InsertOne();

        var db = PlanetDbContext.Create(_database);
        var pluto = db.Planets.FirstOrDefault(p => p.name == "Pluto");
        Expect.That(pluto?.name).ShouldMatch("Pluto");
    }

    [Test]
    [Description("Inserts multiple planet documents using AddRange().")]
    public void TestInsertMany()
    {
        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
        example.InsertMany();

        var db = PlanetDbContext.Create(_database);
        Expect.That(db.Planets.Any(p => p.name == "Pluto")).ShouldMatch(true);
        Expect.That(db.Planets.Any(p => p.name == "Scadrial")).ShouldMatch(true);
    }

    [Test]
    [Description("Updates a single planet's name using property assignment and SaveChanges().")]
    public void TestUpdateOne()
    {
        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
        example.UpdateOne();

        var db = PlanetDbContext.Create(_database);
        var updated = db.Planets.FirstOrDefault(p => p.name == "Mercury the first planet");
        Expect.That(updated?.name).ShouldMatch("Mercury the first planet");
    }

    [Test]
    [Description("Updates multiple planets' orderFromSun values using a loop and SaveChanges().")]
    public void TestUpdateMany()
    {
        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
        example.UpdateMany();

        var db = PlanetDbContext.Create(_database);
        // Mercury was 1, should now be 2
        var mercury = db.Planets.FirstOrDefault(p => p.name == "Mercury");
        Expect.That(mercury?.orderFromSun).ShouldMatch(2);
    }

    [Test]
    [Description("Deletes a single planet using Remove() and SaveChanges().")]
    public void TestDeleteOne()
    {
        // Insert Pluto first so DeleteOne has something to remove
        var db = PlanetDbContext.Create(_database);
        db.Planets.Add(new Planet { name = "Pluto", hasRings = false, orderFromSun = 9 });
        db.SaveChanges();

        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
        example.DeleteOne();

        var db2 = PlanetDbContext.Create(_database);
        Expect.That(db2.Planets.Any(p => p.name == "Pluto")).ShouldMatch(false);
    }

    [Test]
    [Description("Deletes multiple planets using RemoveRange() and SaveChanges().")]
    public void TestDeleteMany()
    {
        // Insert both so DeleteMany has something to remove
        var db = PlanetDbContext.Create(_database);
        db.Planets.AddRange(
            new Planet { name = "Pluto", hasRings = false, orderFromSun = 9 },
            new Planet { name = "Scadrial", hasRings = false, orderFromSun = 10 }
        );
        db.SaveChanges();

        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
        example.DeleteMany();

        var db2 = PlanetDbContext.Create(_database);
        Expect.That(db2.Planets.Any(p => p.name == "Pluto")).ShouldMatch(false);
        Expect.That(db2.Planets.Any(p => p.name == "Scadrial")).ShouldMatch(false);
    }

    [Test]
    [Description("Sorts planets by orderFromSun using OrderBy().")]
    public void TestOrderBy()
    {
        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
        var result = example.OrderByExample();

        Expect.That(result)
            .WithOrderedSort()
            .WithIgnoredFields("_id")
            .ShouldMatch(FullPath("OrderByOutput.txt"));
    }

    [Test]
    [Description("Sorts planets by hasRings then by name using OrderBy().ThenBy().")]
    public void TestDoubleOrderBy()
    {
        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
        var result = example.DoubleOrderBy();

        Expect.That(result)
            .WithOrderedSort()
            .WithIgnoredFields("_id")
            .ShouldMatch(FullPath("DoubleOrderByOutput.txt"));
    }

    [Test]
    [Description("Limits results to three planets using Take().")]
    public void TestTake()
    {
        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
        var result = example.TakeExample();

        Expect.That(result.Count).ShouldMatch(3);
    }

    [Test]
    [Description("Skips the first five planets using Skip().")]
    public void TestSkip()
    {
        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
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
        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
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
        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
        var result = example.CheckFieldIsMissing();

        Expect.That(result).ShouldMatch(new[] { "Planet X" });
    }

    [Test]
    [Description("Filters planets where the hasRings field is null or missing.")]
    public void TestCheckFieldIsNullOrMissing()
    {
        InsertFieldExistenceDocuments();
        var example = new Examples.EfCore.QuickReference.QuickReference(DbName);
        var result = example.CheckFieldIsNullOrMissing();

        Expect.That(result).ShouldMatch(new[] { "Planet X", "Planet Null" });
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/EfCore/QuickReference/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}

