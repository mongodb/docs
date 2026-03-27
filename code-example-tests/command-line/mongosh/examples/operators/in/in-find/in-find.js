// :snippet-start: in-find
db.movies.find(
   { rated: { $in: ["G", "TV-G"] } },
   { _id: 0, title: 1 }
)
// :snippet-end:
