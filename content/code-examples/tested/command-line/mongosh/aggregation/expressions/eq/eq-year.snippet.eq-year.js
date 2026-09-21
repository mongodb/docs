db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $project:
        {
          _id: 0,
          title: 1,
          year: 1,
          yearEq1978: { $eq: [ "$year", 1978 ] }
        }
   }
] )
