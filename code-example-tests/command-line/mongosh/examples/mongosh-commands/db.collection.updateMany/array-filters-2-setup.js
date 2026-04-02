db.movies.updateMany(
   { 
      "imdb.rating": { $exists: true },
      "tomatoes.viewer.rating": { $exists: true },
      year: { $gte: 2010, $lte: 2012 }
   },
   [
      { $set: { 
         ratingDetails: [
            { source: "imdb", score: "$imdb.rating", weight: 10 },
            { source: "tomatoes_viewer", score: "$tomatoes.viewer.rating", weight: 8 },
            { source: "tomatoes_critic", score: "$tomatoes.critic.rating", weight: 7 }
         ]
      } }
   ]
)
