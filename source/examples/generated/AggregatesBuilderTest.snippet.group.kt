Aggregates.group("\$${Order::customerId.name}",
    sum("totalQuantity", "\$${Order::ordered.name}"),
    avg("averageQuantity", "\$${Order::ordered.name}")
)
