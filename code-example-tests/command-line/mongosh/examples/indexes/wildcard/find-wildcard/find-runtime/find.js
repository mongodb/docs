// :snippet-start: find-wildcard-runtime
db.movies.find( { runtime: { $gt: 300 } }, { title: 1 } )
// :snippet-end: