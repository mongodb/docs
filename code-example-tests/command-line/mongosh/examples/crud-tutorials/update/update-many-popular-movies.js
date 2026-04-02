db.movies.updateMany(
   { "num_mflix_comments": { $gt: 100 } },
   {
     $set: { popular: true },
     $currentDate: { lastupdated: true }
   }
)
