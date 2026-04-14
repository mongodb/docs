db.movies.deleteOne(
   { metacritic: { $lte: 15 }, rated: "PG" },
   { hint: { rated: 1 } }
)
