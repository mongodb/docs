// :snippet-start: find-and-or-conditions
db.movies.find( {
     rated: "G",
     $or: [ { runtime: { $lt: 90 } }, { title: /^T/ } ]
} )
// :snippet-end:
.limit(5)
