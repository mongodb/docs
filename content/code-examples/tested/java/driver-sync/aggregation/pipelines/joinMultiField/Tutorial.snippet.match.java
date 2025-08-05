pipeline.add(Aggregates.match(
        Filters.ne("orders", new ArrayList<>())
));
