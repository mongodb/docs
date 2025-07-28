val filter = Filters.empty()
val aggregate = listOf(
    Aggregates.match(filter),
    Aggregates.sort(descending(PaintOrder::qty.name)),
    Aggregates.skip(5)
)
val findFlow = collection.aggregate(aggregate)
findFlow.collect { println(it) }
