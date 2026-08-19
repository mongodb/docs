// :snippet-start: count-queryplanner
db.movies.explain().count( { year: { $gt: 2000 } } )
// :snippet-end:
.queryPlanner !== undefined  // :remove:
