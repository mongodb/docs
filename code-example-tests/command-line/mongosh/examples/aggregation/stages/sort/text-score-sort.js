// :snippet-start: text-score-sort
db.movies.aggregate(
   [
     { $match: { $text: { $search: "pirate" } } },
     { $sort: { score: { $meta: "textScore" }, year: -1 } },
     { $limit: 5 }
   ]
)
// :snippet-end:
