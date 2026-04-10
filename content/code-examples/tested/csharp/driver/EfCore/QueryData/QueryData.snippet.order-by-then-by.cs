var planetList = db.Planets.OrderBy(o => o.hasRings).ThenBy(o => o.name);

foreach (var p in planetList)
{
    Console.WriteLine("Has rings: " + p.hasRings + ", Name: " + p.name);
}
