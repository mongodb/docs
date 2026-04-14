// :snippet-start: delete-with-hint
db.movies.deleteMany(
   { "metacritic": { $lte: 15 }, "rated": "PG" },
   { hint: { rated: 1 } }
)
// :snippet-end:
