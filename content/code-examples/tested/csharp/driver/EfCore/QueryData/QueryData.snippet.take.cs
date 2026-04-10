var planetList = db.Planets.Take(3);

foreach (var p in planetList)
{
    Console.WriteLine(p.name);
}
