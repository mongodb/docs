db.movies.aggregate(
   [
      { $match: { year: { $lt: 1910 } } },
      {
         $project: {
            _id: 0,
            title: 1,
            rating: { $ifNull: [ "$tomatoes.critic.rating", "$tomatoes.viewer.rating", 0 ] }
         }
      },
      { $sort: { title: 1 } }
   ]
)
