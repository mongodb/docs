// :snippet-start: count
db.movies.aggregate( [
  { $match: { $or: [
      { runtime: { $gt: 1000 } },
      { year: { $lt: 1910 } }
  ] } },
  { $group: { _id: null, count: { $sum: 1 } } }
] )
// :snippet-end:
