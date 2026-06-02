var options = new TransactionOptions(
    readConcern: new Optional<ReadConcern>(ReadConcern.Majority)
);

await using var transaction = await dbContext.Database.BeginTransactionAsync(options);

var planet = await dbContext.Planets.FirstAsync(p => p.Name == "Mercury");
planet.Name = "Mercury (Updated)";
await dbContext.SaveChangesAsync();

await transaction.CommitAsync();
