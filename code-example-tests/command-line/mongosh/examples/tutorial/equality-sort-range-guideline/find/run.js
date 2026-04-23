// :snippet-start: find-esr
db.movies.find( 
   { title: "Equilibrium" },
   { title: 1, year: 1, cast: 1 }
)
// :snippet-end:
