try {
    val resultCreateIndex = moviesCollection.createIndex(Indexes.text(Movie::plot.name))
    println("Index created: $resultCreateIndex")
} catch (e: MongoCommandException) {
    if (e.errorCodeName == "IndexOptionsConflict") {
        println("there's an existing text index with different options")
    }
}
