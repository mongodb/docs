// :snippet-start: sort-by-year
db.movies.aggregate( [
   { $match: { year: { $in: [ 1925, 1926 ] } } },
   { $sort: { year: 1 } },
   { $project: { _id: 0, title: 1, year: 1 } }
] )
// :snippet-end:
