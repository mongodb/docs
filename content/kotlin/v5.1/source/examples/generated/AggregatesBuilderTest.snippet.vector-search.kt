Aggregates.vectorSearch(
    SearchPath.fieldPath(MovieAlt::plotEmbedding.name),
    listOf(-0.0072121937, -0.030757688, -0.012945653),
    "mflix_movies_embedding_index",
    2.toLong(),
    1.toLong(),
    vectorSearchOptions().filter(Filters.gte(MovieAlt::year.name, 2016))
)
