db.movies.find(
   { year: { $gte: 2000, $lte: 2005 }, rated: "PG" }
).hint( { rated: 1, year: 1 } ).explain("executionStats")
