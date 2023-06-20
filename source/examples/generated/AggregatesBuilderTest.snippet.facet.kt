facet(
    Facet(
        "Screen Sizes",
        bucketAuto(
            "\$${Screen::screenSize.name}",
            5,
            BucketAutoOptions().output(sum("count", 1))
        )
    ),
    Facet(
        "Manufacturer",
        sortByCount("\$${Screen::manufacturer.name}"),
        limit(5)
    )
)
