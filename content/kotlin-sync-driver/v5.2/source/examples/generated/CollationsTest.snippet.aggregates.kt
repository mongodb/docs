data class Result(@BsonId val id: String, val nameCount: Int)
val groupStage = Aggregates.group(
    "\$${FirstName::firstName.name}",
    Accumulators.sum("nameCount", 1)
)
val sortStage = Aggregates.sort(Sorts.ascending("_id"))
val resultsFlow = collection.aggregate<Result>(listOf(groupStage, sortStage))
    .collation(
        Collation.builder().locale("de")
            .collationStrength(CollationStrength.PRIMARY)
            .build()
    )
resultsFlow.collect { println(it) }
