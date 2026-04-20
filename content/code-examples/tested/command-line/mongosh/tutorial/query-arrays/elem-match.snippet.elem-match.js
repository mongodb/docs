db.movies.find(
   { cast: { $elemMatch: { $regex: "^A", $ne: "Adam Sandler" } } }
)
