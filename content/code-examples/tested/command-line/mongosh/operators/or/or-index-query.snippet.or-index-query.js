db.movies.find(
   { $or: [ { runtime: { $gt: 1000 } }, { year: { $lt: 1910 } } ] }
)
