// :snippet-start: text-search-score
db.movies.find(
   { $text: { $search: "baseball" }, runtime: { $gt: 1000 } },
   { _id: 0, title: 1, year: 1,
     score: { $meta: "textScore" } }
)
// :snippet-end:
