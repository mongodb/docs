var results = orders.Aggregate()
    .Unwind<Order, OrderUnwound>(o => o.Products)
