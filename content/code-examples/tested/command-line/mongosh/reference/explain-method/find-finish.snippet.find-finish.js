db.movies.explain().find( { rated: "PG" } ).finish().queryPlanner.winningPlan
