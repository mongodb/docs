Aggregates.group("\$${Order::customerId.name}",
    Accumulators.sum("totalQuantity", "\$${Order::ordered.name}"),
    Accumulators.avg("averageQuantity", "\$${Order::ordered.name}")
)
