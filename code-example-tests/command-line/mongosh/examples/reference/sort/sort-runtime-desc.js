// :snippet-start: sort-runtime-desc
db.movies.find(
   {},
   { _id: 0, title: 1, runtime: 1 }
).sort( { runtime: -1 } ).limit( 5 )
// :snippet-end:
