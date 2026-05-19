// :snippet-start: or-movies
db.movies.find(
   { $or: [ { runtime: { $gt: 1000 } }, { year: { $lt: 1910 } } ] },
   { _id: 0, title: 1, year: 1, runtime: 1 }
)
// :snippet-end:
