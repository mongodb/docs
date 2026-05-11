db.movies.aggregate([
   {
      $group: {
         _id: null,
         count: { $count: {} }
      }
   }
])
