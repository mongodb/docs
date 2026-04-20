db.movies.find(
   { cast: { $regex: "^A", $ne: "Adam Sandler" } }
)
