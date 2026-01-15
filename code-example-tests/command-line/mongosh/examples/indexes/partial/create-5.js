db.movies.createIndex(
   { title: 1, genres: 1 },
   { partialFilterExpression: { rated: "PG" } }
)