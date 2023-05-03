val filter = Filters.empty()
val results = collection.aggregate(listOf(
    Aggregates.match(filter),
    Aggregates.skip(2))
)
