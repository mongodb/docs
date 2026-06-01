db.movies.updateOne(
   { title: "The Dark Knight" },
   { $set: { "imdb.highlight": "Critics' Choice" } }
)
