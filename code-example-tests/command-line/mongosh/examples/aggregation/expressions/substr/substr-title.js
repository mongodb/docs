// :snippet-start: substr-title
db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $project:
        {
          _id: 0,
          title: 1,
          titleStart: { $substr: [ "$title", 0, 3 ] },
          titleRest: { $substr: [ "$title", 3, -1 ] }
        }
   }
] )
// :snippet-end:
