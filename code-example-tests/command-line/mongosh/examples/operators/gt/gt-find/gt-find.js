// :snippet-start: gt-find
db.movies.find( 
   { runtime: { $gt: 1000 } }, 
   { _id: 0, title: 1, runtime: 1, plot: 1 } 
)
// :snippet-end:
