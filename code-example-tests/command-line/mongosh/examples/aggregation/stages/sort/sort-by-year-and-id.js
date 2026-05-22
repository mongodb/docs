// :snippet-start: sort-by-year-and-id
db.movies.aggregate( [
   { $match: { year: { $in: [ 1925, 1926 ] } } },
   { $sort: { year: 1, _id: 1 } }
] )
// :snippet-end:
