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
