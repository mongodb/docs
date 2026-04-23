db.movies.find( 
   { directors: "David Lynch" }, 
   { title: 1, year: 1 } 
).sort( { year: 1 } )
