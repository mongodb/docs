var furthestPlanet = db.Planets.Max(p => p.orderFromSun);

Console.WriteLine("Furthest Planet: " + furthestPlanet);
