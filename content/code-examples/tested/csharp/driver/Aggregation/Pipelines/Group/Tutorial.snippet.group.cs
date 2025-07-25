.Group(
    o => o.CustomerId,
    g => new
    {
        CustomerId = g.Key,
        FirstPurchaseDate = g.First().OrderDate,
        TotalValue = g.Sum(i => i.Value),
        TotalOrders = g.Count(),
        Orders = g.Select(i => new { i.OrderDate, i.Value }).ToList()
    }
)
