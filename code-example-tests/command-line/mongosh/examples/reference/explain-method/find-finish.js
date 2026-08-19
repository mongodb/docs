// :snippet-start: find-finish
db.movies.explain().find( { rated: "PG" } ).finish().queryPlanner.winningPlan
// :snippet-end:
.stage !== undefined  // :remove:
