// :snippet-start: distinct-embedded-field
db.movies.distinct( "imdb.rating", { title: { $regex: /^Toy Story/ } } )
// :snippet-end:
