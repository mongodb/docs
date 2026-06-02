await using var transaction = await dbContext.Database.BeginTransactionAsync();

var planet = await dbContext.Planets.FirstAsync(p => p.Name == "Mercury");
planet.Name = "Mercury (Updated)";
await dbContext.SaveChangesAsync();

dbContext.Planets.Add(new Planet { Name = "Venus" });
await dbContext.SaveChangesAsync();

await transaction.CommitAsync();
