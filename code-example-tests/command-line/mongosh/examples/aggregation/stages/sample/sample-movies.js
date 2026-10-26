// :snippet-start: sample-movies
db.movies.aggregate(
   [
      { $sample: { size: 3 } },
      { $project: { _id: 0, title: 1, year: 1, genres: 1 } }
   ]
)
// :snippet-end:
