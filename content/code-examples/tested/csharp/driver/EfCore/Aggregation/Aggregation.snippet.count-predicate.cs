var planetCountWithRings = db.Planets.Count(p => p.hasRings);

Console.WriteLine("Planet Count with Rings: " + planetCountWithRings);
