db.movies.find(
   { 
      directors: "David Lynch", 
      runtime: { $lt: 130 } 
   },
   { title: 1, year: 1, runtime: 1 }
).sort( { year: 1 } )
