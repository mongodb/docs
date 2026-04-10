namespace Tests.EfCore.WriteData;

using Examples.EfCore.QueryData;
using Examples.EfCore.WriteData;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

[TestFixture]
public class WriteDataTests
{
    private IMongoClient _client = null!;
    private IMongoDatabase _database = null!;
    private const string DbName = "test_write_data";

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
        db.SaveChanges();
    }

    [TearDown]
    public void TearDown()
    {
        _client.DropDatabase(DbName);
        _client.Dispose();
    }

    [Test]
    [Description("Inserts a single planet document using Add().")]
    public void TestInsertOne()
    {
        var example = new WriteData(DbName);
        example.InsertOne();

        var db = PlanetDbContext.Create(_database);
        var pluto = db.Planets.FirstOrDefault(p => p.name == "Pluto");
        Expect.That(pluto?.name).ShouldMatch("Pluto");
    }

    [Test]
    [Description("Inserts multiple planet documents using AddRange().")]
    public void TestInsertMany()
    {
        var example = new WriteData(DbName);
        example.InsertMany();

        var db = PlanetDbContext.Create(_database);
        Expect.That(db.Planets.Any(p => p.name == "Pluto")).ShouldMatch(true);
        Expect.That(db.Planets.Any(p => p.name == "Scadrial")).ShouldMatch(true);
    }

    [Test]
    [Description("Updates a single planet's name using property assignment and SaveChanges().")]
    public void TestUpdateOne()
    {
        var example = new WriteData(DbName);
        example.UpdateOne();

        var db = PlanetDbContext.Create(_database);
        var updated = db.Planets.FirstOrDefault(p => p.name == "Mercury the first planet");
        Expect.That(updated?.name).ShouldMatch("Mercury the first planet");
    }

    [Test]
    [Description("Updates multiple planets' orderFromSun values using a loop and SaveChanges().")]
    public void TestUpdateMany()
    {
        var example = new WriteData(DbName);
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
        var db = PlanetDbContext.Create(_database);
        db.Planets.Add(new Planet { name = "Pluto", hasRings = false, orderFromSun = 9 });
        db.SaveChanges();

        var example = new WriteData(DbName);
        example.DeleteOne();

        var db2 = PlanetDbContext.Create(_database);
        Expect.That(db2.Planets.Any(p => p.name == "Pluto")).ShouldMatch(false);
    }

    [Test]
    [Description("Deletes multiple planets using RemoveRange() and SaveChanges().")]
    public void TestDeleteMany()
    {
        var db = PlanetDbContext.Create(_database);
        db.Planets.AddRange(
            new Planet { name = "Pluto", hasRings = false, orderFromSun = 9 },
            new Planet { name = "Scadrial", hasRings = false, orderFromSun = 10 }
        );
        db.SaveChanges();

        var example = new WriteData(DbName);
        example.DeleteMany();

        var db2 = PlanetDbContext.Create(_database);
        Expect.That(db2.Planets.Any(p => p.name == "Pluto")).ShouldMatch(false);
        Expect.That(db2.Planets.Any(p => p.name == "Scadrial")).ShouldMatch(false);
    }
}
