db.movies.find(
   { $text: { $search: "baseball" }, runtime: { $gt: 1000 } },
   { _id: 0, title: 1, year: 1, runtime: 1 }
)
