var results = db.Planets.Any(p => p.hasRings);

Console.WriteLine("Planet with Rings: " + results);
