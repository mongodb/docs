// :snippet-start: update-filter-atomicity
(
   // Update A
   db.movies.updateOne(
      { _id: 1, num_mflix_comments: 80 },
      {
         $set: { num_mflix_comments: 90 }
      }
   ),

   // Update B
   db.movies.updateOne(
      { _id: 1, num_mflix_comments: 80 },
      {
         $set: { num_mflix_comments: 100 }
      }
   )
)
// :snippet-end:
