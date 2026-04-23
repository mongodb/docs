db.movies.find( 
   { runtime: { $gte: 1000 } }, 
   { title: 1, runtime: 1, year: 1, plot: 1 } 
)
