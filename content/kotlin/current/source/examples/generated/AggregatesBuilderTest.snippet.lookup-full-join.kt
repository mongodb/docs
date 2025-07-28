val variables = listOf(
    Variable("order_item", "\$item"),
    Variable("order_qty", "\$ordered")
)
val pipeline = listOf(
    Aggregates.match(
        Filters.expr(
            Document("\$and", listOf(
                Document("\$eq", listOf("$\$order_item", "\$${Inventory::stockItem.name}")),
                Document("\$gte", listOf("\$${Inventory::inStock.name}", "$\$order_qty"))
            ))
        )
    ),
    Aggregates.project(
        Projections.fields(
            Projections.exclude(Order::customerId.name, Inventory::stockItem.name),
            Projections.excludeId()
        )
    )
)
val innerJoinLookup =
    Aggregates.lookup("warehouses", variables, pipeline, "stockData")
