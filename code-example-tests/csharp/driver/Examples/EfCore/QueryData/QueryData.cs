// :replace-start: {
//   "terms": {
//     "DotNetEnv.Env.GetString(\"CONNECTION_STRING\")": "\"<connection string URI>\"",
//     "\"test_query_data\"": "\"sample_guides\""
//   }
// }
namespace Examples.EfCore.QueryData;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

// :snippet-start: db-context
public class PlanetDbContext : DbContext
{
    public DbSet<Planet> Planets { get; init; } = null!;

    public static PlanetDbContext Create(IMongoDatabase database) =>
        new(new DbContextOptionsBuilder<PlanetDbContext>()
            .UseMongoDB(database.Client, database.DatabaseNamespace.DatabaseName)
            .ConfigureWarnings(w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning)) // :remove:
            .Options);

    public PlanetDbContext(DbContextOptions options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Planet>().ToCollection("planets");
        modelBuilder.Entity<Planet>().Property<string[]>("mainAtmosphere");
    }
}
// :snippet-end:

// :snippet-start: planet
public class Planet
{
    public ObjectId _id { get; set; }
    public string name { get; set; } = null!;
    public int orderFromSun { get; set; }
    public bool hasRings { get; set; }
}
// :snippet-end:

public class QueryData
{
    private readonly PlanetDbContext _db;

    public QueryData(string dbName = "test_query_data")
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        var client = new MongoClient(connectionString);
        _db = PlanetDbContext.Create(client.GetDatabase(dbName));
    }

    public static PlanetDbContext CreateInstance()
    {
        // :snippet-start: create-instance
        var client = new MongoClient(DotNetEnv.Env.GetString("CONNECTION_STRING"));
        var db = PlanetDbContext.Create(client.GetDatabase("test_query_data"));
        // :snippet-end:
        return db;
    }

    public Planet? FindOne()
    {
        var db = _db;

        // :snippet-start: find-one
        var planet = db.Planets.FirstOrDefault(p => p.name == "Mercury");
        Console.WriteLine(planet?.name);
        // :snippet-end:
        return planet;
    }

    public List<Planet> FindMultiple()
    {
        var db = _db;

        // :snippet-start: find-many
        var planets = db.Planets.Where(p => p.hasRings);

        foreach (var p in planets)
        {
            Console.WriteLine(p.name);
        }
        // :snippet-end:
        return planets.ToList();
    }

    public List<Planet> FindByShadowProperty()
    {
        var db = _db;

        // :snippet-start: find-shadow-property
        var planets = db.Planets.Where(
            p => EF.Property<string[]>(p, "mainAtmosphere").Length > 0);

        foreach (var p in planets)
        {
            Console.WriteLine(p.name);
        }
        // :snippet-end:
        return planets.ToList();
    }

    public string OrderByExample()
    {
        var db = _db;

        // :snippet-start: order-by
        var planetList = db.Planets.OrderBy(p => p.orderFromSun);
        // :remove-start:
        var sw = new StringWriter();
        Console.SetOut(sw);
        // :remove-end:

        foreach (var p in planetList)
        {
            Console.WriteLine(p.name);
        }
        // :snippet-end:
        Console.SetOut(new StreamWriter(Console.OpenStandardOutput()) { AutoFlush = true });
        return sw.ToString().TrimEnd();
    }

    public string DoubleOrderBy()
    {
        var db = _db;

        // :snippet-start: order-by-then-by
        var planetList = db.Planets.OrderBy(o => o.hasRings).ThenBy(o => o.name);
        // :remove-start:
        var sw = new StringWriter();
        Console.SetOut(sw);
        // :remove-end:

        foreach (var p in planetList)
        {
            Console.WriteLine("Has rings: " + p.hasRings + ", Name: " + p.name);
        }
        // :snippet-end:
        Console.SetOut(new StreamWriter(Console.OpenStandardOutput()) { AutoFlush = true });
        return sw.ToString().TrimEnd();
    }

    public List<Planet> TakeExample()
    {
        var db = _db;

        // :snippet-start: take
        var planetList = db.Planets.Take(3);

        foreach (var p in planetList)
        {
            Console.WriteLine(p.name);
        }
        // :snippet-end:
        return planetList.ToList();
    }

    public List<Planet> SkipExample()
    {
        var db = _db;

        // :snippet-start: skip
        var planetList = db.Planets.OrderBy(p => p.orderFromSun).Skip(5);

        foreach (var p in planetList)
        {
            Console.WriteLine(p.name);
        }
        // :snippet-end:
        return planetList.ToList();
    }

    public List<string> CheckFieldExists()
    {
        var db = _db;

        // :snippet-start: mql-exists
        var planetNames = db.Planets
            .Where(p => Mql.Exists(p.hasRings))
            .Select(p => p.name);

        foreach (var name in planetNames)
        {
            Console.WriteLine(name);
        }
        // :snippet-end:
        return planetNames.ToList();
    }

    public List<string> CheckFieldIsMissing()
    {
        var db = _db;

        // :snippet-start: mql-is-missing
        var planetNames = db.Planets
            .Where(p => Mql.IsMissing(p.hasRings))
            .Select(p => p.name);

        foreach (var name in planetNames)
        {
            Console.WriteLine(name);
        }
        // :snippet-end:
        return planetNames.ToList();
    }

    public List<string> CheckFieldIsNullOrMissing()
    {
        var db = _db;

        // :snippet-start: mql-is-null-or-missing
        var planetNames = db.Planets
            .Where(p => Mql.IsNullOrMissing(p.hasRings))
            .Select(p => p.name);

        foreach (var name in planetNames)
        {
            Console.WriteLine(name);
        }
        // :snippet-end:
        return planetNames.ToList();
    }
}
// :replace-end:

