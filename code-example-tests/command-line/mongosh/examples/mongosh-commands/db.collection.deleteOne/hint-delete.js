// :snippet-start: hint-delete
db.movies.deleteOne(
   { metacritic: { $lte: 15 }, rated: "PG" },
   { hint: { rated: 1 } }
)
// :snippet-end:
