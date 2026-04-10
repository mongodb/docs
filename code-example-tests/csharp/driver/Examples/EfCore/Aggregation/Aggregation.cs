namespace Examples.EfCore.Aggregation;

using Examples.EfCore.QueryData;

public class Aggregation
{
    private readonly PlanetDbContext _db;

    public Aggregation(PlanetDbContext db)
    {
        _db = db;
    }

    public int Count()
    {
        var db = _db;

        // :snippet-start: count
        var planetCount = db.Planets.Count();

        Console.WriteLine("Planet Count: " + planetCount);
        // :snippet-end:
        return planetCount;
    }

    public int CountPredicate()
    {
        var db = _db;

        // :snippet-start: count-predicate
        var planetCountWithRings = db.Planets.Count(p => p.hasRings);

        Console.WriteLine("Planet Count with Rings: " + planetCountWithRings);
        // :snippet-end:
        return planetCountWithRings;
    }

    public long LongCount()
    {
        var db = _db;

        // :snippet-start: long-count
        var planetCountLong = db.Planets.LongCount();

        Console.WriteLine("Long Planet Count: " + planetCountLong);
        // :snippet-end:
        return planetCountLong;
    }

    public long LongCountPredicate()
    {
        var db = _db;

        // :snippet-start: long-count-predicate
        var planetCountLongWithRings = db.Planets.LongCount(p => p.hasRings);

        Console.WriteLine("Long Planet Count with Rings: " + planetCountLongWithRings);
        // :snippet-end:
        return planetCountLongWithRings;
    }

    public bool Any()
    {
        var db = _db;

        // :snippet-start: any
        var results = db.Planets.Any(p => p.hasRings);

        Console.WriteLine("Planet with Rings: " + results);
        // :snippet-end:
        return results;
    }

    public int Max()
    {
        var db = _db;

        // :snippet-start: max
        var furthestPlanet = db.Planets.Max(p => p.orderFromSun);

        Console.WriteLine("Furthest Planet: " + furthestPlanet);
        // :snippet-end:
        return furthestPlanet;
    }

    public int Min()
    {
        var db = _db;

        // :snippet-start: min
        var closestPlanet = db.Planets.Min(p => p.orderFromSun);

        Console.WriteLine("Closest Planet: " + closestPlanet);
        // :snippet-end:
        return closestPlanet;
    }

    public double Sum()
    {
        var db = _db;

        // :snippet-start: sum
        var totalOrderFromSun = db.Planets.Sum(p => p.orderFromSun);
        Console.WriteLine("Total Order From Sun: " + totalOrderFromSun);
        // :snippet-end:
        return totalOrderFromSun;
    }

    public double Average()
    {
        var db = _db;

        // :snippet-start: average
        var averageOrderFromSun = db.Planets.Average(p => p.orderFromSun);

        Console.WriteLine("Average Order From Sun: " + averageOrderFromSun);
        // :snippet-end:
        return averageOrderFromSun;
    }
}

