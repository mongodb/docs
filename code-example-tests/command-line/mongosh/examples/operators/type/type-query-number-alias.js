// :snippet-start: type-query-number-alias
db.movies.find(
   { "imdb.rating": { $type: "number" }, runtime: { $gt: 1000 } },
   { _id: 0, title: 1, runtime: 1, "imdb.rating": 1 }
)
// :snippet-end:
