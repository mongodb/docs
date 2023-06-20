bucket("\$${Screen::screenSize.name}", listOf(0, 24, 32, 50, 70),
    BucketOptions()
        .defaultBucket("monster")
        .output(
            sum("count", 1),
            push("matches", "\$${Screen::screenSize.name}")
        )
)
