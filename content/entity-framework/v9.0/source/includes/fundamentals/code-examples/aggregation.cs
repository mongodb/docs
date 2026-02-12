// start-count
var planetCount = db.Planets.Count();

Console.WriteLine("Planet Count: " + planetCount);
// end-count

// start-count-predicate
var planetCountWithRings = db.Planets.Count(p => p.hasRings);

Console.WriteLine("Planet Count with Rings: " + planetCountWithRings);
// end-count-predicate

// start-long-count
var planetCountLong = db.Planets.LongCount();

Console.WriteLine("Long Planet Count: " + longCount);
// end-long-count

// start-long-count-predicate
var planetCountLongWithRings = db.Planets.LongCount(p => p.hasRings);

Console.WriteLine("Long Planet Count with Rings: " + planetCountLongWithRings);
// end-long-count-predicate

// start-any
var results = db.Planets.Any(p => p.hasRings);

foreach (var p in results)
{
    Console.WriteLine("Planet with Rings: " + p.name);
}
// end-any

// start-max
var furthestPlanet = db.Planets.Max(p => p.orderFromSun);

Console.WriteLine("Furthest Planet: " + furthestPlanet.name);
// end-max

// start-min
var closestPlanet = db.Planets.Min(p => p.OrderFromSun);

Console.WriteLine("Closest Planet: " + closestPlanet.Name);
// end-min

// start-sum
var totalMass = db.Planets.Sum(p => p.mass);
Console.WriteLine("Total Mass of Planets: " + totalMass);
// end-sum

// start-average
var averageMass = db.Planets.Average(p => p.mass);

Console.WriteLine("Average Mass of Planets: " + averageMass);
// end-average
