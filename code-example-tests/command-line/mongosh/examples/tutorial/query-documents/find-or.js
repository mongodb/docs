// :snippet-start: find-or-conditions
db.movies.find( { $or: [ { rated: "G" }, { runtime: { $lt: 90 } } ] } )
// :snippet-end:
.limit(5)
