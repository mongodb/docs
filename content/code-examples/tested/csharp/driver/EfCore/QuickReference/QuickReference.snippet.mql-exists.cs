var planetNames = db.Planets
    .Where(p => Mql.Exists(p.hasRings))
    .Select(p => p.name);

foreach (var name in planetNames)
{
    Console.WriteLine(name);
}
