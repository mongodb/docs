// :snippet-start: or-index-query
db.movies.find(
   { $or: [ { runtime: { $gt: 1000 } }, { year: { $lt: 1910 } } ] }
)
// :snippet-end:
