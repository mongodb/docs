db.movies.deleteMany(
   { "metacritic": { $lte: 15 }, "rated": "PG" },
   { hint: { rated: 1 } }
)
