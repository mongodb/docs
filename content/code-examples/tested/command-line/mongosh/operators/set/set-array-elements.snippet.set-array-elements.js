db.movies.updateOne(
   { title: "The Dark Knight" },
   { $set: { "genres.0": "Thriller" } }
)
