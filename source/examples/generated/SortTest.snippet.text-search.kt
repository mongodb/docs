collection.createIndex(Indexes.text(FoodOrderScore::food.name))
val metaTextScoreSort = Sorts.orderBy(
    Sorts.metaTextScore(FoodOrderScore::score.name),
    Sorts.descending("_id")
)
val metaTextScoreProj = Projections.metaTextScore(FoodOrderScore::score.name)
val searchTerm = "maple donut"
val searchQuery = Filters.text(searchTerm)

val results = collection.find<FoodOrderScore>(searchQuery)
    .projection(metaTextScoreProj)
    .sort(metaTextScoreSort)

results.collect { println(it) }
