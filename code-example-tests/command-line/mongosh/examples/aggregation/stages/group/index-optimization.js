// :snippet-start: index-optimization
db.movies.aggregate([
   {
      $sort: { year: 1, title: 1 }
   },
   {
      $group: {
         _id: { year: "$year" },
         title: { $first: "$title" }
      }
   }
])
// :snippet-end:
