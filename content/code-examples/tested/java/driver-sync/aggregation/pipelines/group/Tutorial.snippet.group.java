pipeline.add(Aggregates.group(
        "$customer_id",
        Accumulators.first("first_purchase_date", "$orderdate"),
        Accumulators.sum("total_value", "$value"),
        Accumulators.sum("total_orders", 1),
        Accumulators.push("orders",
                new Document("orderdate", "$orderdate")
                        .append("value", "$value")
        )
));
