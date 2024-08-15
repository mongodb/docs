val searchIdxMdl = SearchIndexModel(
    "searchIdx",
    Document("analyzer", "lucene.standard").append(
        "mappings", Document("dynamic", true)
    ),
    SearchIndexType.search()
)

val vectorSearchIdxMdl = SearchIndexModel(
    "vsIdx",
    Document(
        "fields",
        listOf(
            Document("type", "vector")
                .append("path", "embeddings")
                .append("numDimensions", 1536)
                .append("similarity", "dotProduct")
        )
    ),
    SearchIndexType.vectorSearch()
)

val resultCreateIndexes = moviesCollection.createSearchIndexes(
    listOf(searchIdxMdl, vectorSearchIdxMdl)
)
