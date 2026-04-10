var planets = db.Planets.Where(p => p.hasRings);

foreach (var p in planets)
{
    Console.WriteLine(p.name);
}
