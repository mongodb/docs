// :snippet-start: set-array-elements
db.movies.updateOne(
   { title: "The Dark Knight" },
   { $set: { "genres.0": "Thriller" } }
)
// :snippet-end:
