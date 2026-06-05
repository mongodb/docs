(
   // Update A
   db.movies.updateOne(
      { _id: 1 },
      {
         $inc: { num_mflix_comments: 10 }
      }
   ),

   // Update B
   db.movies.updateOne(
      { _id: 1 },
      {
         $inc: { num_mflix_comments: 20 }
      }
   )
)
