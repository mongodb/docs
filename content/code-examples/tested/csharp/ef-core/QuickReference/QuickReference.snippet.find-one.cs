var planet = db.Planets.FirstOrDefault(p => p.name == "Mercury");
Console.WriteLine(planet?.name);
