// :snippet-start: text-search-top-two
db.movies.find(
   { $text: { $search: "baseball colorado" },
     runtime: { $gt: 1000 } },
   { _id: 0, title: 1, year: 1,
     score: { $meta: "textScore" } }
).sort( { score: { $meta: "textScore" } } ).limit(2)
// :snippet-end:
