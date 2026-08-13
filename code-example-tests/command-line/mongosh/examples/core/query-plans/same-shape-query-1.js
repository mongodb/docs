// :snippet-start: same-shape-query-1
// Query Operation 1
db.movies.explain().find( { year: { $gt: 1990 } } )
// :snippet-end:
