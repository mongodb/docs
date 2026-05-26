using var transaction = dbContext.Database.BeginTransaction();

var planet = dbContext.Planets.First(p => p.Name == "Mercury");
planet.Name = "Mercury (Updated)";
dbContext.SaveChanges();

dbContext.Planets.Add(new Planet { Name = "Venus" });
dbContext.SaveChanges();

transaction.Commit();
