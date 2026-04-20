// :snippet-start: elem-match
db.movies.find(
   { cast: { $elemMatch: { $regex: "^A", $ne: "Adam Sandler" } } }
)
// :snippet-end:
.limit(5)
