db.movies.find( 
   { title: { $eq: "Equilibrium" } }, 
   { title: 1, year: 1, cast: 1 }
)
