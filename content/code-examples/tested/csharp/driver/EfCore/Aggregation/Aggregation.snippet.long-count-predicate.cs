var planetCountLongWithRings = db.Planets.LongCount(p => p.hasRings);

Console.WriteLine("Long Planet Count with Rings: " + planetCountLongWithRings);
