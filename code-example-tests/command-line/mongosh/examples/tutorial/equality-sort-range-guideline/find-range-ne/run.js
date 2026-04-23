// :snippet-start: find-range-ne-esr
db.movies.find( 
   { type: { $ne: "movie" } }, 
   { title: 1, year: 1, type: 1 } 
)
// :snippet-end:
.limit(5)
