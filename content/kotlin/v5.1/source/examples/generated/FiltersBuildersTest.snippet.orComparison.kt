val orComparison = Filters.or(
    Filters.gt(PaintOrder::qty.name, 8),
    Filters.eq(PaintOrder::color.name, "pink")
)
val resultsFlow = collection.find(orComparison)
resultsFlow.collect { println(it) }
