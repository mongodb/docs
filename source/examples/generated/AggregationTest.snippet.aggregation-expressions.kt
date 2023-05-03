data class Results(val name: String, val firstCategory: String)

val resultsFlow = collection.aggregate<Results>(
    listOf(
        Aggregates.project(
            Projections.fields(
                Projections.excludeId(),
                Projections.include("name"),
                Projections.computed(
                    "firstCategory",
                    Document("\$arrayElemAt", listOf("\$categories", 0))
                )
            )
        )
    )
)
resultsFlow.collect { println(it) }
