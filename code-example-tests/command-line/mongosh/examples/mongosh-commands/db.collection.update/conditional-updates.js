db.movies.update(
   { 
      year: 2015,
      "imdb.rating": { $type: "number" },
      "tomatoes.viewer.rating": { $type: "number" }
   },
   [
      { $set: { 
         combinedScore: { 
            $round: [ 
               { $avg: [ 
               { $multiply: [ "$imdb.rating", 10 ] }, 
               { $multiply: [ "$tomatoes.viewer.rating", 10 ] } 
               ] }, 
               1 
            ] 
         }, 
         lastUpdate: "$$NOW" 
         } 
      },
      { $set: { 
         grade: { 
            $switch: {
               branches: [
               { case: { $gte: [ "$combinedScore", 80 ] }, then: "A" },
               { case: { $gte: [ "$combinedScore", 70 ] }, then: "B" },
               { case: { $gte: [ "$combinedScore", 60 ] }, then: "C" },
               { case: { $gte: [ "$combinedScore", 50 ] }, then: "D" }
               ],
               default: "F"
            } 
         } 
         } 
      }
   ],
   { multi: true }
)