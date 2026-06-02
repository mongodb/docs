dbContext.Database.AutoTransactionBehavior = AutoTransactionBehavior.Never;

// This SaveChangesAsync() call will not use a transaction
dbContext.Planets.Add(new Planet { Name = "Mars" });
await dbContext.SaveChangesAsync();
