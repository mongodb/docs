// :snippet-start: range-rated-query
db.movies.find( {
   year: {
      $gte: 2000, $lte: 2005
   },
   rated: "PG"
} )
// :snippet-end:
.itcount()  // :remove:
