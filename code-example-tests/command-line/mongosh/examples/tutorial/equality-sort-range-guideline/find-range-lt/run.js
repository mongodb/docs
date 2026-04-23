// :snippet-start: find-range-lt-esr
db.movies.find( 
   { year: { $lt: 1900 } }, 
   { title: 1, year: 1, plot: 1 }
)
// :snippet-end:
