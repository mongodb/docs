var planetNames = db.Planets
    .Where(p => Mql.IsNullOrMissing(p.hasRings))
    .Select(p => p.name);

foreach (var name in planetNames)
{
    Console.WriteLine(name);
}
