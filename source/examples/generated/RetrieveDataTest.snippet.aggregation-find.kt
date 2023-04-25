data class AggregationResult(@BsonId val id: String, val qty: Int)

val filter = Filters.empty()
val pipeline = listOf(
    Aggregates.match(filter),
    Aggregates.group(
        "\$color",
        Accumulators.sum("qty", "\$qty")
    ),
    Aggregates.sort(Sorts.descending("qty"))
)
collection.aggregate<AggregationResult>(pipeline)
    .toList().forEach { println(it) }
