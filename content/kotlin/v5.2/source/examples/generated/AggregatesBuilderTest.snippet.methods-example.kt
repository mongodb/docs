val matchStage = Aggregates.match(Filters.eq("someField", "someCriteria"))
val sortByCountStage = Aggregates.sortByCount("\$someField")
val results = collection.aggregate(
    listOf(matchStage, sortByCountStage)).toList()
