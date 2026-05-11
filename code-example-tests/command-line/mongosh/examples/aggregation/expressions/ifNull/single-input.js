// :snippet-start: if-null-single-input
db.movies.aggregate(
   [
      { $match: { year: { $lt: 1910 } } },
      {
         $project: {
            _id: 0,
            title: 1,
            rated: { $ifNull: [ "$rated", "Not Rated" ] }
         }
      },
      { $sort: { title: 1 } }
   ]
)
// :snippet-end:
