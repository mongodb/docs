var pluto = db.Planets.FirstOrDefault(p => p.name == "Pluto");
var scadrial = db.Planets.FirstOrDefault(p => p.name == "Scadrial");
var planets = new[] { pluto!, scadrial! };
db.Planets.RemoveRange(planets);

db.SaveChanges();
