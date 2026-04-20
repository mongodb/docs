// :snippet-start: find-and-conditions
db.movies.find( { rated: "G", runtime: { $lt: 90 } } )
// :snippet-end:
.limit(5)
