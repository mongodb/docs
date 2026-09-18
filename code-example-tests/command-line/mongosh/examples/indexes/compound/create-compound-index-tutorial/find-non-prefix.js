// :snippet-start: find-compound-tutorial-non-prefix
db.movies.find( { metacritic: { $gt: 98 } }, { _id: 0, title: 1, metacritic: 1 } )
// :snippet-end:
