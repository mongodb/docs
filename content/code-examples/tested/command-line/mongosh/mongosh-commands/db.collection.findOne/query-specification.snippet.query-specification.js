db.movies.findOne(
   {
      $or: [
            { title: /^T/ },
            { year: { $lt: 1950 } }
            ]
   }
)
