// :snippet-start: create-sparse-index
db.movies.createIndex(
   { metacritic: 1 },
   { name: "metacriticSparseIndex", sparse: true }
)
// :snippet-end: