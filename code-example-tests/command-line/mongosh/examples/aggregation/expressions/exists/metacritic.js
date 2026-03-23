// :snippet-start: exists-true
db.movies.countDocuments( { metacritic: { $exists: true } } )
// :snippet-end:
