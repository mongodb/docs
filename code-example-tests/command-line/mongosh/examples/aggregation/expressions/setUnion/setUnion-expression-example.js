// :snippet-start: expression-example
db.movies.aggregate( [
   {
      $match: { title: { $in: [ "Annie Hall", "Reservoir Dogs" ] } }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         cast: 1,
         directors: 1,
         keyContributors: { $setUnion: [ "$cast", "$directors" ] }
      }
   },
   {
      $sort: { title: 1 }
   }
] )
// :snippet-end:
