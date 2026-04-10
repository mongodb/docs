// :replace-start: {
//   "terms": {
//     "DotNetEnv.Env.GetString(\"CONNECTION_STRING\")": "\"<connection string URI>\"",
//     "\"test_write_data\"": "\"sample_guides\""
//   }
// }
namespace Examples.EfCore.WriteData;

using Examples.EfCore.QueryData;
using MongoDB.Bson;
using MongoDB.Driver;

public class WriteData
{
    private readonly PlanetDbContext _db;

    public WriteData(string dbName = "test_write_data")
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        var client = new MongoClient(connectionString);
        _db = PlanetDbContext.Create(client.GetDatabase(dbName));
    }

    public void InsertOne()
    {
        var db = _db;

        // :snippet-start: insert-one
        db.Planets.Add(new Planet()
        {
            name = "Pluto",
            hasRings = false,
            orderFromSun = 9
        });

        db.SaveChanges();
        // :snippet-end:
    }

    public void InsertMany()
    {
        var db = _db;

        // :snippet-start: insert-many
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
        // :snippet-end:
    }

    public void UpdateOne()
    {
        var db = _db;

        // :snippet-start: update-one
        var planet = db.Planets.FirstOrDefault(p => p.name == "Mercury");
        planet!.name = "Mercury the first planet";

        db.SaveChanges();
        // :snippet-end:
    }

    public void UpdateMany()
    {
        var db = _db;

        // :snippet-start: update-many
        var planets = db.Planets.Where(p => p.orderFromSun > 0);
        foreach (var p in planets)
        {
            p.orderFromSun++;
        }

        db.SaveChanges();
        // :snippet-end:
    }

    public void DeleteOne()
    {
        var db = _db;

        // :snippet-start: delete-one
        var planet = db.Planets.FirstOrDefault(p => p.name == "Pluto");
        db.Planets.Remove(planet!);

        db.SaveChanges();
        // :snippet-end:
    }

    public void DeleteMany()
    {
        var db = _db;

        // :snippet-start: delete-many
        var pluto = db.Planets.FirstOrDefault(p => p.name == "Pluto");
        var scadrial = db.Planets.FirstOrDefault(p => p.name == "Scadrial");
        var planets = new[] { pluto!, scadrial! };
        db.Planets.RemoveRange(planets);

        db.SaveChanges();
        // :snippet-end:
    }
}
// :replace-end:

