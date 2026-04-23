db.movies.find( 
   { year: { $lt: 1900 } }, 
   { title: 1, year: 1, plot: 1 }
)
