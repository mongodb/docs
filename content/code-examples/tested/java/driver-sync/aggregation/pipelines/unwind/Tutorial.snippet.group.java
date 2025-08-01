pipeline.add(Aggregates.group(
        "$products.prod_id",
        Accumulators.first("product", "$products.name"),
        Accumulators.sum("total_value", "$products.price"),
        Accumulators.sum("quantity", 1)
));
