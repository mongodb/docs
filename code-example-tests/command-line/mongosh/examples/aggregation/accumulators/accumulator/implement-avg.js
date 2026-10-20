// :snippet-start: implement-avg
db.movies.aggregate( [
   {
      $match: {
         rated: { $in: [ "G", "PG", "PG-13", "R" ] },
         "imdb.rating": { $type: "double" }
      }
   },
   {
      $group: {
         _id: "$rated",
         avgRating: {
            $accumulator: {
               init: function() {                          // Set the initial state
                  return { count: 0, sum: 0 }
               },

               accumulate: function(state, rating) {       // Define how to update the state
                  return {
                     count: state.count + 1,
                     sum: state.sum + rating
                  }
               },

               accumulateArgs: [ "$imdb.rating" ],         // Argument required by the accumulate function

               merge: function(state1, state2) {           // When the operator performs a merge,
                  return {                                 // add the fields from the two states
                     count: state1.count + state2.count,
                     sum: state1.sum + state2.sum
                  }
               },

               finalize: function(state) {                 // After collecting the results from all documents,
                  return (state.sum / state.count)         // calculate the average
               },
               lang: "js"
            }
         }
      }
   },
   { $sort: { _id: 1 } }
] )
// :snippet-end:
