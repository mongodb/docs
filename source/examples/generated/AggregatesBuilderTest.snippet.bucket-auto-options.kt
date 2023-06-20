bucketAuto(
    "\$${Screen::price.name}", 5,
    BucketAutoOptions()
        .granularity(BucketGranularity.POWERSOF2)
        .output(sum("count", 1), avg("avgPrice", "\$${Screen::price.name}"))
        )
