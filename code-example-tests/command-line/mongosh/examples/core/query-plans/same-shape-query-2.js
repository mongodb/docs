// :snippet-start: same-shape-query-2
// Query Operation 2
db.movies.explain().find( { year: { $gt: 2010 } } )
// :snippet-end:
