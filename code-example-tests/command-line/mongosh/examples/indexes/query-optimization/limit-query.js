// :snippet-start: limit-query
db.movies.find(
   {},
   { title: 1, year: 1 }
).sort( { year: -1 } ).limit(10)
// :snippet-end:
