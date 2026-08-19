// :snippet-start: find-executionstats
db.movies.explain("executionStats").find(
   { year: { $gt: 2000 }, rated: "PG" }
)
// :snippet-end:
.finish().queryPlanner !== undefined  // :remove:
