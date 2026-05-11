// :snippet-start: uncorrelated-subquery
db.users.aggregate( [
   {
      $match: {
         email: { $in: [
            "mark_addy@gameofthron.es",
            "lena_headey@gameofthron.es"
         ] }
      }
   },
   {
      $lookup: {
         from: "movies",
         pipeline: [
            { $match: { runtime: { $gt: 1000 } } },
            { $project: { _id: 0, title: 1, year: 1 } }
         ],
         as: "long_movies"
      }
   },
   {
      $project: {
         _id: 0, name: 1, email: 1, long_movies: 1
      }
   }
] )
// :snippet-end:
