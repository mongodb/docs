// :snippet-start: sort-no-order
db.movies.find(
   {},
   { _id: 0, title: 1, runtime: 1 }
).limit( 3 )
// :snippet-end:
