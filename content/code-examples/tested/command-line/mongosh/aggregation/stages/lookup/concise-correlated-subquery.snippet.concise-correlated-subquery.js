db.movies.aggregate( [
   {
      $match: {
         title: { $in: [
            "I Don't Kiss",
            "Lucky Luke",
            "Mississippi Masala"
         ] }
      }
   },
   {
      $lookup: {
         from: "comments",
         localField: "_id",
         foreignField: "movie_id",
         let: { movie_year: "$year" },
         pipeline: [
            {
               $match: {
                  $expr: {
                     $gt: [
                        { $year: "$date" }, "$$movie_year"
                     ]
                  }
               }
            },
            { $project: { _id: 0, name: 1, date: 1 } }
         ],
         as: "post_release_comments"
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         year: 1,
         post_release_comments: 1
      }
   }
] )
