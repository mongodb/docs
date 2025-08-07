.Group(
    id: o => o.Products.ProductId,
    group: g => new
    {
        ProductId = g.Key,
        Product = g.First().Products.Name,
        TotalValue = g.Sum(o => o.Products.Price),
        Quantity = g.Count(),
    }
);
