db.createView( "movieComments", "movies", [
   { $match: { year: { $gte: 2014 } } },
   {
      $lookup:
         {
            from: "comments",
            localField: "_id",
            foreignField: "movie_id",
            as: "movieComments"
         }
   },
   {
      $project:
         {
            _id: 0,
            title: 1,
            year: 1,
            numComments: { $size: "$movieComments" }
         }
   }
] )
