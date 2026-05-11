// :snippet-start: count-documents
db.movies.aggregate([
   {
      $group: {
         _id: null,
         count: { $count: {} }
      }
   }
])
// :snippet-end:
