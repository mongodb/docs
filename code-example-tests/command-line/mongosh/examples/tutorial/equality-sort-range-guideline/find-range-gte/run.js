// :snippet-start: find-esr-range-gte
db.movies.find( 
   { runtime: { $gte: 1000 } }, 
   { title: 1, runtime: 1, year: 1, plot: 1 } 
)
// :snippet-end:
