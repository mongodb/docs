db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $project: {
         _id: 0,
         title: 1,
         titleRated: { $concat: [ "$title", " - ", "$rated" ] }
      }
   },
   { $sort: { title: 1 } }
] )
