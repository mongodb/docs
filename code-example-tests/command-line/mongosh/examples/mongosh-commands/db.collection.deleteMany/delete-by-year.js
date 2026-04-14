// :snippet-start: delete-by-year
db.movies.deleteMany( { "year": { $lt: 1910 } } )
// :snippet-end:
