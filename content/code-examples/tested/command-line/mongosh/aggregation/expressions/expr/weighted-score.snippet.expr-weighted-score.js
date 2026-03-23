db.movies.find(
   {
      "imdb.rating": { $type: "number" },
      "imdb.votes": { $type: "number" },
      $expr: {
         $gt: [
            {
               $cond: {
                  if: { $gte: ["$imdb.votes", 1000] },
                  then: { $multiply: ["$imdb.rating", 1.0] },
                  else: { $multiply: ["$imdb.rating", 0.5] }
               }
            },
            9
         ]
      }
   },
   { _id: 0, title: 1, "imdb.rating": 1, "imdb.votes": 1 }
).sort( { title: 1 } ).limit(5)
