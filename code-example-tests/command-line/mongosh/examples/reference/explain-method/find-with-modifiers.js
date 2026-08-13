// :snippet-start: find-with-modifiers
db.movies.explain("executionStats").find(
   { year: { $gt: 2000 }, rated: "PG" }
).sort( { year: -1 } ).hint( { rated: 1, year: -1 } )
// :snippet-end:
.finish().queryPlanner !== undefined  // :remove:
