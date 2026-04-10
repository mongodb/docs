var planet = db.Planets.FirstOrDefault(p => p.name == "Pluto");
db.Planets.Remove(planet!);

db.SaveChanges();
