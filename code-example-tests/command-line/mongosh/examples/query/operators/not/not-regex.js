// :snippet-start: not-regex
db.movies.find(
   { title: { $not: /^T/ }, runtime: { $gt: 1000 } },
   { _id: 0, title: 1, runtime: 1 }
)
// :snippet-end:
