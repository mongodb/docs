db.movies.createSearchIndex(
  "movie-index",
  { mappings: { dynamic: true } }
)