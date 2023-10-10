using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

// start-create-instance
// Replace the placeholder with your connection URI
var client = new MongoClient("<Your connection URI>");
var db = PlanetDbContext.Create(client.GetDatabase("sample_planets"));
// end-create-instance

FindOneAsync();

void FindOne()
{
    // start-find-one
    var planet = db.Planets.FirstOrDefault(p => p.name == "Mercury");
    Console.WriteLine(planet.ToBsonDocument());
    // end-find-one
}

async void FindOneAsync()
{
    // start-find-one-async
    var planet = await db.Planets.FirstOrDefaultAsync(p => p.name == "Mercury", CancellationToken.None);
    Console.WriteLine(planet);
    // end-find-one-async
}

void FindMultiple()
{
    // start-find-many
    var planets = db.Planets.Where(p => p.hasRings).ToList();

    foreach (var p in planets)
    {
        Console.WriteLine(p.ToBsonDocument());
    }
    // end-find-many
}

void InsertOne()
{
    // start-insert-one
    db.Planets.Add(new Planet() { name = "Pluto", hasRings = false, orderFromSun = 9 });
    db.SaveChanges();
    // end-insert-one
}

void InsertMany()
{
    // start-insert-many
    var planets = new[]
    {
        new Planet() { _id = ObjectId.GenerateNewId(), name = "Pluto", hasRings = false, orderFromSun = 9 },
        new Planet() { _id = ObjectId.GenerateNewId(), name = "Scadrial", hasRings = false, orderFromSun = 10 }
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
    db.Planets.UpdateRange(planets);

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
    var planetList = db.Planets.OrderBy(p => p.orderFromSun).ToList();

    foreach (var p in planetList)
    {
        Console.WriteLine(p.ToBsonDocument());
    }
    // end-order-by
}

void DoubleOrderBy()
{
    // start-order-by-then-by
    var planetList = db.Planets.OrderBy(o => o.hasRings).ThenBy(o => o.name).ToList();

    foreach (var p in planetList)
    {
        Console.WriteLine(p.ToBsonDocument());
    }
    // end-order-by-then-by
}

void TakeExample()
{
    // start-take
    var planetList = db.Planets.Take(3).ToList();

    foreach (var p in planetList)
    {
        Console.WriteLine(p.ToBsonDocument());
    }
    // end-take
}

void SkipExample()
{
    // start-skip
    var planetList = db.Planets.OrderBy(p => p.orderFromSun).Skip(5).ToList();

    foreach (var p in planetList)
    {
        Console.WriteLine(p.ToBsonDocument());
    }
    // end-skip
}

void ProjectExample()
{
    // start-project
    var planetList = db.Planets.Take(8).Select(p => new { Name = p.name, Order = p.orderFromSun });

    foreach (var p in planetList)
    {
        Console.WriteLine(p);
    }
    // end-project
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