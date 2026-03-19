// :snippet-start: use-topN-on-array
db.movies.aggregate([
   {
      $match: { title: "The Godfather" }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         firstThreeCastMembersAlphabetically: {
            $topN: {
               n: 3,
               sortBy: 1,
               input: "$cast"
            }
         }
      }
   }
])
// :snippet-end:
