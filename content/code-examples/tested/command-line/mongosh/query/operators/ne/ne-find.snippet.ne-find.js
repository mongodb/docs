db.movies.find(
   { rated: { $ne: "G" }, runtime: { $gt: 1000 } },
   { _id: 0, title: 1, runtime: 1, rated: 1 }
)
