// :snippet-start: nin-find
db.movies.find(
   { rated: { $nin: [ "G", "PG" ] }, runtime: { $gt: 1000 } },
   { _id: 0, title: 1, year: 1, rated: 1 }
)
// :snippet-end:
