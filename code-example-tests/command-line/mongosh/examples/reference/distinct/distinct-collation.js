// :snippet-start: distinct-collation
db.movieTitlesDemo.distinct( "title", {}, { collation: { locale: "fr", strength: 1 } } )
// :snippet-end:
