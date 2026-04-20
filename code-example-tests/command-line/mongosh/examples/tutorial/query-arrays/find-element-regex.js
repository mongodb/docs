// :snippet-start: find-element-regex
db.movies.find( { cast: { $regex: "^A" } } )
// :snippet-end:
.limit(5)
