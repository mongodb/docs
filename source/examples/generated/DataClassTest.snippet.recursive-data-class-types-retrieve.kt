val collection = database.getCollection<DataClassTree>("myCollection")

val filter = Filters.eq("left.left.right.content", "high german")
val resultsFlow = collection.find(filter)
resultsFlow.collect { println(it) }
