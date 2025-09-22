try {
    val indexOptions = IndexOptions().unique(true)
    val resultCreateIndex = theatersCollection.createIndex(
        Indexes.descending(Theater::theaterId.name), indexOptions
    )
    println("Index created: $resultCreateIndex")
} catch (e: DuplicateKeyException) {
    println("duplicate field values encountered, couldn't create index: \t${e.message}")
}
