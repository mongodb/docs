// :snippet-start: compound-filter
db.movies.find(
   { cast: { $regex: "^A", $ne: "Adam Sandler" } }
)
// :snippet-end:
.limit(5)
