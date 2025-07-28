data class Results(@BsonId val id: Int, val count: Int)

val resultsFlow = collection.aggregate<Results>(
    listOf(
        Aggregates.match(Filters.eq(Restaurant::categories.name, "Bakery")),
        Aggregates.group(
            "\$${Restaurant::stars.name}",
            Accumulators.sum("count", 1)
        )
    )
)

resultsFlow.collect { println(it) }
