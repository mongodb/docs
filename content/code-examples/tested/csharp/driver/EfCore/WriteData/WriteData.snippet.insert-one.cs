db.Planets.Add(new Planet()
{
    name = "Pluto",
    hasRings = false,
    orderFromSun = 9
});

db.SaveChanges();
