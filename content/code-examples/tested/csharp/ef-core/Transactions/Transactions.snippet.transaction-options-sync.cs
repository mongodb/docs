var options = new TransactionOptions(
    readConcern: new Optional<ReadConcern>(ReadConcern.Majority)
);

using var transaction = dbContext.Database.BeginTransaction(options);

var planet = dbContext.Planets.First(p => p.Name == "Mercury");
planet.Name = "Mercury (Updated)";
dbContext.SaveChanges();

transaction.Commit();
