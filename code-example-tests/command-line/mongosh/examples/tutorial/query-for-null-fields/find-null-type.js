// :snippet-start: find-null-type
db.movies.find( { metacritic: { $type: 10 } } )
// :snippet-end:
