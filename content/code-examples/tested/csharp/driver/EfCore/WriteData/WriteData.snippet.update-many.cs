var planets = db.Planets.Where(p => p.orderFromSun > 0);
foreach (var p in planets)
{
    p.orderFromSun++;
}

db.SaveChanges();
