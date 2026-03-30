var planets = db.Planets.Where(
    p => EF.Property<string[]>(p, "mainAtmosphere").Length > 0);

foreach (var p in planets)
{
    Console.WriteLine(p.name);
}
