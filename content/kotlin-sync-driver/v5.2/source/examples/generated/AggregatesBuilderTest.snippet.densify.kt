Aggregates.densify(
    "ts",
    DensifyRange.partitionRangeWithStep(15, MongoTimeUnit.MINUTE),
    DensifyOptions.densifyOptions().partitionByFields("Position.coordinates")
)
