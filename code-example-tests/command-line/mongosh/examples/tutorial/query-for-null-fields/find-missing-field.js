// :snippet-start: find-missing-field
db.movies.find( { metacritic: { $exists: false } } )
// :snippet-end:
.limit(5)
