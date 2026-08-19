// :snippet-start: range-query
db.movies.find( { year: { $gte: 2000, $lte: 2005 } } )
// :snippet-end:
.itcount()  // :remove:
