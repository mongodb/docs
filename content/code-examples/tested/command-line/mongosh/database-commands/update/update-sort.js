db.runCommand( {
   update: "movies",
   updates: [ {
      // Find movies from 1972
      q: { year: 1972 },

      // Add a classic_status field to the found movie
      u: { $set: { classic_status: "Most Discussed 1972 Film" } },

      // Only update one movie
      multi: false,

      // Sort movies by comment count in descending order
      sort: { num_mflix_comments: -1 }
   } ]
} )