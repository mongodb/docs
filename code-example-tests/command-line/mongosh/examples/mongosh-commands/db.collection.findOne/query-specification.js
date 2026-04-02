// :snippet-start: query-specification
db.movies.findOne(
   {
      $or: [
            { title: /^T/ },
            { year: { $lt: 1950 } }
            ]
   }
)
// :snippet-end:
