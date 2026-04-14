// :snippet-start: delete-by-rated-year
db.movies.deleteMany( { "rated": "G", "year": { $lt: 1950 } } )
// :snippet-end:
