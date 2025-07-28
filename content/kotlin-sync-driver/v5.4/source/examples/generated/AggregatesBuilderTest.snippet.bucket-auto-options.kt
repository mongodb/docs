Aggregates.bucketAuto(
    "\$${Screen::price.name}", 5,
    BucketAutoOptions()
        .granularity(BucketGranularity.POWERSOF2)
        .output(Accumulators.sum("count", 1), Accumulators.avg("avgPrice", "\$${Screen::price.name}"))
        )
