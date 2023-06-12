val pipeline = listOf(Aggregates.match(Filters.lt("fullDocument.runtime", 15)))
val changeStream = collection.watch(pipeline)
