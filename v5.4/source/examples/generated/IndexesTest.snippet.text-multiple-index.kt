try {
    val resultCreateIndex = moviesCollection.createIndex(
        Indexes.compoundIndex(
            Indexes.text(Movie::title.name), Indexes.text(Movie::genres.name)
        )
    )
    println("Index created: $resultCreateIndex")
} catch (e: MongoCommandException) {
    if (e.errorCodeName == "IndexOptionsConflict") {
        println("there's an existing text index with different options")
    }
}
