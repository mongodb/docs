pipeline.add(Aggregates.lookup(
        "products",
        "product_id",
        "id",
        "product_mapping"
));
