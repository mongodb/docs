dbContext.Database.AutoTransactionBehavior = AutoTransactionBehavior.Never;

// This SaveChanges() call will not use a transaction
dbContext.Planets.Add(new Planet { Name = "Mars" });
dbContext.SaveChanges();
