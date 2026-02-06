db.runCommand( {
   update: "movies",
   updates: [
      { q: { $expr: { $eq: [ "$title", "$$movieTitle" ] } },
         u: [ { $set: { franchise: "$$franchiseName" } } ] }
   ],
   let : { movieTitle: "The Godfather", franchiseName: "The Godfather Trilogy" }
} )
