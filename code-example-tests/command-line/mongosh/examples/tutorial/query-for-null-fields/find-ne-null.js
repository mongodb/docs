// :snippet-start: find-ne-null
db.movies.find( { metacritic: { $ne: null } } )
// :snippet-end:
.limit(5)
