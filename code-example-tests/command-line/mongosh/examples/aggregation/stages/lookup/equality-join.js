// :snippet-start: equality-join
db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $lookup: {
         from: "comments",
         localField: "_id",
         foreignField: "movie_id",
         as: "movie_comments"
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         year: 1,
         "movie_comments.name": 1,
         "movie_comments.text": 1,
         "movie_comments.date": 1
      }
   }
] )
// :snippet-end:
