db.movies.createIndex(
   { metacritic: 1 },
   { name: "metacriticSparseIndex", sparse: true }
)
