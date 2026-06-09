db.movies.createSearchIndex(
    "search-index",
    { mappings: { dynamic: true }, "numPartitions": 4 }
)