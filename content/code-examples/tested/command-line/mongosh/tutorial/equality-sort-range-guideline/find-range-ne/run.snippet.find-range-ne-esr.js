db.movies.find( 
   { type: { $ne: "movie" } }, 
   { title: 1, year: 1, type: 1 } 
)
