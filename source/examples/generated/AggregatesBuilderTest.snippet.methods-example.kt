val matchStage = match(Filters.eq("someField", "someCriteria"))
val sortByCountStage = sortByCount("\$someField")
val results = collection.aggregate(
    listOf(matchStage, sortByCountStage)).toList()
