db.movies.updateMany(
   { 
      "imdb.rating": { $exists: true },
      "tomatoes.viewer.rating": { $exists: true },
      "tomatoes.critic.rating": { $exists: true },
      year: { $gte: 2010, $lte: 2015 }
   },
   [
      { $set: { 
         ratings: [
            { $multiply: ["$imdb.rating", 10] },
            { $multiply: ["$tomatoes.viewer.rating", 10] },
            { $multiply: ["$tomatoes.critic.rating", 10] }
         ]
      } }
   ]
)
