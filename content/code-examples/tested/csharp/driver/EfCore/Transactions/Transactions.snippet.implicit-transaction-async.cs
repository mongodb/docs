dbContext.Planets.AddRange(
    new Planet { Name = "Mercury" },
    new Planet { Name = "Venus" }
);

// Both inserts succeed or both are rolled back
await dbContext.SaveChangesAsync();
