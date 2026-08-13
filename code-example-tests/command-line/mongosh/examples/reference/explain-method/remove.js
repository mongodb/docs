// :snippet-start: remove
db.movies.explain().remove( { rated: "PG" }, { justOne: true } )
// :snippet-end:
.queryPlanner !== undefined  // :remove:
