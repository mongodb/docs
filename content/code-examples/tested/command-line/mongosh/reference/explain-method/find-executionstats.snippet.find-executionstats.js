db.movies.explain("executionStats").find(
   { year: { $gt: 2000 }, rated: "PG" }
)
