// :snippet-start: distinct-array-field
db.movies.distinct( "genres", { rated: "G", year: { $gt: 2010 } } )
// :snippet-end:
