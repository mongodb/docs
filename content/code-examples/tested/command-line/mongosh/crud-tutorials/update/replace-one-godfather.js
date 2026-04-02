db.movies.replaceOne(
   { title: "The Godfather" },
   { title: "The Godfather", plot: "Updated plot summary", year: 1972, rated: "R", runtime: 175 }
)
