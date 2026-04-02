// :snippet-start: specify-return-fields
db.movies.findOne(
   { },
   { title: 1, genres: 1, imdb: 1 }
)
// :snippet-end: