// :snippet-start: array-lookup
db.movies.aggregate( [
   {
      $match: {
         title: {
            $in: [ "Roger & Me", "The Sum of Us",
               "Centennial" ]
         }
      }
   },
   {
      $lookup: {
         from: "users",
         localField: "cast",
         foreignField: "name",
         as: "cast_users"
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         year: 1,
         cast: 1,
         "cast_users.name": 1,
         "cast_users.email": 1
      }
   },
   { $sort: { year: 1 } }
] )
// :snippet-end:
