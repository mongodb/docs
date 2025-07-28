val indexOne = SearchIndexModel(
    "myIndex1",
    Document("analyzer", "lucene.standard").append(
        "mappings", Document("dynamic", true)
    )
)

val indexTwo = SearchIndexModel(
    "myIndex2",
    Document("analyzer", "lucene.simple").append(
        "mappings", Document("dynamic", true)
    )
)

val resultCreateIndexes = moviesCollection
    .createSearchIndexes(listOf(indexOne, indexTwo))
