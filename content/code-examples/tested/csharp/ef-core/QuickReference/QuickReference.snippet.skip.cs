var planetList = db.Planets.OrderBy(p => p.orderFromSun).Skip(5);

foreach (var p in planetList)
{
    Console.WriteLine(p.name);
}
