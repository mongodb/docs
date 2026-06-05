// :snippet-start: update-overwrite-risk
(
   // Update A
   db.movies.updateOne(
      { _id: 1 },
      {
         $set: { num_mflix_comments: 90 }
      }
   ),

   // Update B
   db.movies.updateOne(
      { _id: 1 },
      {
         $set: { num_mflix_comments: 100 }
      }
   )
)
// :snippet-end:
