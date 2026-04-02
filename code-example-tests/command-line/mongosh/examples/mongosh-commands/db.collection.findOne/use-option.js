// :snippet-start: use-option
db.movies.findOne(
   { },
   { },
   { sort: { year: 1 } }
)
// :snippet-end: