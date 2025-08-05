pipeline.add(Aggregates.lookup(
        "orders",
        Arrays.asList(
                new Variable<>("prdname", "$name"),
                new Variable<>("prdvartn", "$variation")
        ),
        embeddedPipeline,
        "orders"
));
