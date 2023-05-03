data class Results (val name: String, val count: Int)

val explanation = collection.aggregate<Results>(
    listOf(
        Aggregates.match(Filters.eq(Restaurant::categories.name, "bakery")),
        Aggregates.group("\$${Restaurant::stars.name}", Accumulators.sum("count", 1))
    )
).explain(ExplainVerbosity.EXECUTION_STATS)
println(explanation.toJson())
