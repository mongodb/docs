// :snippet-start: find-wildcard-awards-wins
db.movies.find( { "awards.wins": { $gt: 1 } }, { title: 1 } )
// :snippet-end: