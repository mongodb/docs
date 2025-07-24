.Project(Builders<Person>.Projection
    .Exclude(p => p.Address)
    .Exclude(p => p.Id)
);
