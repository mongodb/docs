// :snippet-start: esr-index
db.movies.createIndex(
   { rated: 1, _id: 1, "imdb.rating": 1, title: 1, released: 1 }
)
// :snippet-end:
