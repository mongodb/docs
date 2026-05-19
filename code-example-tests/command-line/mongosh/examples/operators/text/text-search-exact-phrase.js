// :snippet-start: text-search-exact-phrase
db.movies.find(
   { $text: { $search: "\"ken burns\"" },
     runtime: { $gt: 1000 } },
   { _id: 0, title: 1, year: 1, runtime: 1, fullplot: 1 }
)
// :snippet-end:
