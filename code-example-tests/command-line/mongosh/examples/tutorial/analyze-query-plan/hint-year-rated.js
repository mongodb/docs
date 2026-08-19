// :snippet-start: hint-year-rated
db.movies.find(
   { year: { $gte: 2000, $lte: 2005 }, rated: "PG" }
).hint( { year: 1, rated: 1 } ).explain("executionStats")
// :snippet-end:
