// :snippet-start: use-bottom-on-array
db.movies.aggregate([
   {
      $match: { title: "The Godfather" }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         lastCastMemberAlphabetically: {
            $bottom: {
               sortBy: 1,
               input: "$cast"
            }
         }
      }
   }
])
// :snippet-end: