// :snippet-start: create-comparison-operator-index
db.movies.createIndex(
   { year: 1 },
   { name: "year_gt_2000_partial", partialFilterExpression: { year: { $gt: 2000 } } }
)
// :snippet-end: