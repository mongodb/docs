db.movies.updateMany(
   { "imdb.rating": { $lt: 3, $type: "number" }, ratingBoosted: { $ne: true } },
   { $inc: { "imdb.rating": 0.5 }, $set: { ratingBoosted: true } }
)