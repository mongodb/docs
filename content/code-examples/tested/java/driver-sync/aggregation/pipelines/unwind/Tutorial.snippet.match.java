pipeline.add(Aggregates.match(
        Filters.gt("products.price", 15)
));
