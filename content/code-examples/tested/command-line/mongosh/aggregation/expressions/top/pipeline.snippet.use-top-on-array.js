db.movies.aggregate([
   {
      $match: { title: "The Godfather" }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         firstCastMemberAlphabetically: {
            $top: {
               sortBy: 1,
               input: "$cast"
            }
         }
      }
   }
])
