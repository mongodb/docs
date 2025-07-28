val filter = Filters.empty()
val results = collection.find(filter)
    .sort(descending(PaintOrder::qty.name))
    .skip(5)
results.collect { println(it) }
