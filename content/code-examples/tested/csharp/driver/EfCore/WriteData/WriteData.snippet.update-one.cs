var planet = db.Planets.FirstOrDefault(p => p.name == "Mercury");
planet!.name = "Mercury the first planet";

db.SaveChanges();
