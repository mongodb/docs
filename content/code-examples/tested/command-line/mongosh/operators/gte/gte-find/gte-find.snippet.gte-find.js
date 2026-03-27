db.movies.find( 
   { "runtime": { $gte: 720 } }, 
   { _id: 0, title: 1, runtime: 1, plot: 1 }    
)
