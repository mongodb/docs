.Project(Builders<Order>.Projection
    .Exclude(o => o.Id)
    .Exclude(o => o.ProductName)
    .Exclude(o => o.ProductVariation));
