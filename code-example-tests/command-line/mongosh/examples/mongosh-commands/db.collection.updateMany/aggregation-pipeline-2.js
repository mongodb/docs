db.movies.updateMany(
   { 
      year: { $gte: 2010, $lte: 2019 },
      "imdb.rating": { $exists: true },
      "tomatoes.viewer.rating": { $exists: true }
   },
   [
     { $set: { 
        combinedScore: { $trunc: [ 
           { $avg: [ "$imdb.rating", "$tomatoes.viewer.rating" ] }, 
           1 
        ] },
        scoreUpdated: "$$NOW" 
     } },
     { $set: { 
        ratingGrade: { $switch: {
           branches: [
              { case: { $gte: [ "$combinedScore", 8 ] }, then: "A" },
              { case: { $gte: [ "$combinedScore", 6 ] }, then: "B" },
              { case: { $gte: [ "$combinedScore", 4 ] }, then: "C" },
              { case: { $gte: [ "$combinedScore", 2 ] }, then: "D" }
           ],
           default: "F"
        } } 
     } }
   ]
)
