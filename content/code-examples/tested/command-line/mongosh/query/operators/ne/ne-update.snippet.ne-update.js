db.movies.updateMany(
   { "imdb.rating": { $ne: 9.3 } },
   { $set: { "highestRated": false } }
)
