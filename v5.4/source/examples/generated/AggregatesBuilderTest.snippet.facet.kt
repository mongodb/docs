Aggregates.facet(
    Facet(
        "Screen Sizes",
        Aggregates.bucketAuto(
            "\$${Screen::screenSize.name}",
            5,
            BucketAutoOptions().output(Accumulators.sum("count", 1))
        )
    ),
    Facet(
        "Manufacturer",
        Aggregates.sortByCount("\$${Screen::manufacturer.name}"),
        Aggregates.limit(5)
    )
)
