using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

// start-create-instance
// Replace the placeholder with your connection URI
var client = new MongoClient("<Your connection URI>");
var db = PlanetDbContext.Create(client.GetDatabase("sample_planets"));
db.Database.EnsureCreated();
// end-create-instance

void FindOne()
{
    // start-find-one
    var planet = db.Planets.FirstOrDefault(p => p.name == "Mercury");
    Console.WriteLine(planet.name);
    // end-find-one
}

void FindMultiple()
{
    // start-find-many
    var planets = db.Planets.Where(p => p.hasRings);

    foreach (var p in planets)
    {
        Console.WriteLine(p.name);
    }
    // end-find-many
}

void InsertOne()
{
    // start-insert-one
    db.Planets.Add(new Planet()
    {
        name = "Pluto",
        hasRings = false,
        orderFromSun = 9
    });

    db.SaveChanges();
    // end-insert-one
}

void InsertMany()
{
    // start-insert-many
    var planets = new[]
    {
        new Planet()
        {
            _id = ObjectId.GenerateNewId(),
            name = "Pluto",
            hasRings = false,
            orderFromSun = 9
        },
        new Planet()
        {
            _id = ObjectId.GenerateNewId(),
            name = "Scadrial",
            hasRings = false,
            orderFromSun = 10
        }
    };

    db.Planets.AddRange(planets);
    db.SaveChanges();
    // end-insert-many
}

void UpdateOne()
{
    // start-update-one
    var planet = db.Planets.FirstOrDefault(p => p.name == "Mercury");
    planet.name = "Mercury the first planet";

    db.SaveChanges();
    // end-update-one
}

void UpdateMany()
{
    // start-update-many
    var planets = db.Planets.Where(p => p.orderFromSun > 0);
    foreach (var p in planets)
    {
        p.orderFromSun++;
    }

    db.SaveChanges();
    // end-update-many
}

void DeleteOne()
{
    // start-delete-one
    var planet = db.Planets.FirstOrDefault(p => p.name == "Pluto");
    db.Planets.Remove(planet);

    db.SaveChanges();
    // end-delete-one
}

void DeleteMany()
{
    // start-delete-many
    var pluto = db.Planets.FirstOrDefault(p => p.name == "Pluto");
    var scadrial = db.Planets.FirstOrDefault(p => p.name == "Scadrial");
    var planets = new[] { pluto, scadrial };
    db.Planets.RemoveRange(planets);

    db.SaveChanges();
    // end-delete-many
}

void OrderByExample()
{
    // start-order-by
    var planetList = db.Planets.OrderBy(p => p.orderFromSun);

    foreach (var p in planetList)
    {
        Console.WriteLine(p.name);
    }
    // end-order-by
}

void DoubleOrderBy()
{
    // start-order-by-then-by
    var planetList = db.Planets.OrderBy(o => o.hasRings).ThenBy(o => o.name);

    foreach (var p in planetList)
    {
        Console.WriteLine("Has rings: " + p.hasRings + ", Name: " + p.name);
    }
    // end-order-by-then-by
}

void TakeExample()
{
    // start-take
    var planetList = db.Planets.Take(3);

    foreach (var p in planetList)
    {
        Console.WriteLine(p.name);
    }
    // end-take
}

void SkipExample()
{
    // start-skip
    var planetList = db.Planets.OrderBy(p => p.orderFromSun).Skip(5);

    foreach (var p in planetList)
    {
        Console.WriteLine(p.name);
    }
    // end-skip
}

// start-db-context
internal class PlanetDbContext : DbContext
{
    public DbSet<Planet> Planets { get; init; }

    public static PlanetDbContext Create(IMongoDatabase database) =>
        new(new DbContextOptionsBuilder<PlanetDbContext>()
            .UseMongoDB(database.Client, database.DatabaseNamespace.DatabaseName)
            .Options);

    public PlanetDbContext(DbContextOptions options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Planet>().ToCollection("planets");
    }
}
// end-db-context
internal class Planet
{
    public ObjectId _id { get; set; }
    public string name { get; set; }
    public int orderFromSun { get; set; }
    public bool hasRings { get; set; }
}