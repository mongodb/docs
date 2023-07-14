collection.createIndex(Indexes.text(Order::description.name))
val metaTextScoreSort = Sorts.orderBy(
    Sorts.metaTextScore(OrderScore::score.name),
    Sorts.descending("_id")
)
val metaTextScoreProj = Projections.metaTextScore(OrderScore::score.name)
val searchTerm = "vanilla"
val searchQuery = Filters.text(searchTerm)

val results = collection.find<OrderScore>(searchQuery)
    .projection(metaTextScoreProj)
    .sort(metaTextScoreSort)

results.collect { println(it) }
