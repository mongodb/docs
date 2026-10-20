// :snippet-start: vary-initial-state
db.movies.aggregate( [
   {
      $match: {
         rated: { $in: [ "G", "PG", "PG-13", "R" ] },
         "imdb.rating": { $type: "double" }
      }
   },
   {
      $sort: { "imdb.rating": -1, title: 1 }
   },
   {
      $group: {
         _id: { rated: "$rated" },
         movies: {
            $accumulator: {
               init: function(rated, userProfileRated) {    // Set the initial state
                  return {
                     max: rated === userProfileRated ? 3 : 1, // If the group matches the user's rating,
                     movies: []                               // return 3 movies. Otherwise, return 1.
                  }
               },

               initArgs: [ "$rated", "PG-13" ],             // Argument to pass to the init function

               accumulate: function(state, movieTitle) {    // Define how to update the state
                  if (state.movies.length < state.max) {
                     state.movies.push(movieTitle);
                  }
                  return state;
               },

               accumulateArgs: [ "$title" ],                // Argument required by the accumulate function

               merge: function(state1, state2) {
                  return {
                     max: state1.max,
                     movies: state1.movies.concat(state2.movies).slice(0, state1.max)
                  }
               },

               finalize: function(state) {                  // Adjust the state to only return the field we need
                  return state.movies
               },
               lang: "js"
            }
         }
      }
   },
   { $sort: { "_id.rated": 1 } }
] )
// :snippet-end:
