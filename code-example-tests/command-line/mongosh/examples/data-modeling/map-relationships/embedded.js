// :snippet-start: embedded
db.movies.insertOne( {
   title: "The Brutalist",
   year: 2024,
   runtime: 215,
   genres: [ "Drama", "History" ],
   comments: [
      {
         name: "joel_m",
         email: "joel_m@gameofthron.es",
         text: "Visually stunning!"
      }
   ],
   user: {
      name: "Joel M",
      email: "joel_m@gameofthron.es"
   }
} )
// :snippet-end:
