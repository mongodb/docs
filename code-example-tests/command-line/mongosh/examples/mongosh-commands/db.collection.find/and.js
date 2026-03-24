// :snippet-start: and-example
db.movies.find( 
   { $and: [ { year: { $gte: 1960 } }, { year: { $lte: 1970 } }, { directors: "Martin Scorsese" } ] }, 
   { title: 1, directors: 1, year: 1 })
// :snippet-end: