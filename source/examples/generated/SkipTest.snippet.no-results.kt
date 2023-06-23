val filter = Filters.empty()
val emptyQuery = listOf(
    Aggregates.match(filter),
    Aggregates.sort(descending(PaintOrder::qty.name)),
    Aggregates.skip(9)
)
val findFlow = collection.aggregate(emptyQuery)
findFlow.collect { println(it) }
