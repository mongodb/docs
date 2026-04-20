// :snippet-start: find-null-or-missing
db.movies.find( { metacritic: null } )
// :snippet-end:
.limit(5)
