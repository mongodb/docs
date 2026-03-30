var closestPlanet = db.Planets.Min(p => p.orderFromSun);

Console.WriteLine("Closest Planet: " + closestPlanet);
