// :snippet-start: find-wildcard-index-awards-nominations
db.movies.find( { "awards.nominations": { $gt: 5 } }, { title: 1 } )
// :snippet-end: