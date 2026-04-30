db.movies.find(
   { title: { $not: { $regex: "^T" } }, runtime: { $gt: 1000 } },
   { _id: 0, title: 1, runtime: 1 }
)
