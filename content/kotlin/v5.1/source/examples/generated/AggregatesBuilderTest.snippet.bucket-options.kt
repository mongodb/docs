Aggregates.bucket("\$${Screen::screenSize.name}", listOf(0, 24, 32, 50, 70),
    BucketOptions()
        .defaultBucket("monster")
        .output(
            Accumulators.sum("count", 1),
            Accumulators.push("matches", "\$${Screen::screenSize.name}")
        )
)
