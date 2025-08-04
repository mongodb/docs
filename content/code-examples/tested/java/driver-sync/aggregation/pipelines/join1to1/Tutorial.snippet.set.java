pipeline.add(Aggregates.set(
        new Field<>(
                "product_mapping",
                new Document("$first", "$product_mapping")
        )
));

pipeline.add(Aggregates.set(
        new Field<>("product_name", "$product_mapping.name"),
        new Field<>("product_category", "$product_mapping.category")
));
