var planetList = db.Planets.OrderBy(p => p.orderFromSun);

foreach (var p in planetList)
{
    Console.WriteLine(p.name);
}
