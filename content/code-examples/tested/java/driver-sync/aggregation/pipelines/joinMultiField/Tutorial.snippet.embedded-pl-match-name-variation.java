List<Bson> embeddedPipeline = new ArrayList<>();

embeddedPipeline.add(Aggregates.match(
        Filters.expr(
                Filters.and(
                        new Document("$eq", Arrays.asList("$product_name", "$$prdname")),
                        new Document("$eq", Arrays.asList("$product_variation", "$$prdvartn"))
                )
        )
));
