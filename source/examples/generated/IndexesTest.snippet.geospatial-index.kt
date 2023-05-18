try {
    val resultCreateIndex = theatersCollection.createIndex(Indexes.geo2dsphere("location.geo"))
    println("Index created: $resultCreateIndex")
} catch (e: MongoCommandException) {
    if (e.errorCodeName == "IndexOptionsConflict")
        println("there's an existing text index with different options")
}

// MongoDB Headquarters in New York, NY.
val refPoint = Point(Position(-73.98456, 40.7612))
val filter = Filters.near("location.geo", refPoint, 1000.0, 0.0)
val resultsFlow = theatersCollection.find(filter)
resultsFlow.collect { println(it) }
