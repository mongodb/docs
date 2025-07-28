Aggregates.vectorSearch(
    SearchPath.fieldPath(MovieAlt::plotEmbedding.name),
    BinaryVector.floatVector(floatArrayOf(0.0001f, 1.12345f, 2.23456f, 3.34567f, 4.45678f)),
    "mflix_movies_embedding_index",
    1.toLong(),
    exactVectorSearchOptions().filter(Filters.gte(MovieAlt::year.name, 2016))
)
