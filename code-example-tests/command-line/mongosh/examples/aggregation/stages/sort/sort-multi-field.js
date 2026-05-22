// :snippet-start: sort-multi-field
db.movies.aggregate(
   [
     { $sort: { year: -1, title: 1 } },
     { $limit: 5 }
   ]
)
// :snippet-end:
