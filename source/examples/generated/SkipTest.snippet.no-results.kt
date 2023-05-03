val filter = Filters.empty()
val emptyQuery = listOf(
    Aggregates.match(filter),
    Aggregates.sort(descending(PaintOrder::qty.name)),
    Aggregates.skip(9)
)
collection.aggregate(emptyQuery).collect { println(it) }
