// :snippet-start: delete-by-year
db.movies.deleteOne( { year: { $lt: 1910 } } )
// :snippet-end:
